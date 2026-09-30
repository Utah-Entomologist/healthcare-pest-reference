/**
 * Build the ready-made Pest Compliance Map checklists in public/downloads.
 *
 * Each PDF is the map page itself, printed by headless Chrome with a profile set in the URL,
 * so a PDF can never say anything the map does not. Run after `npm run build`, then build again
 * so dist/ carries the new PDFs:
 *
 *   npm run build && node scripts/build-checklists.mjs && npm run build
 *
 * CHROME=/path/to/chrome overrides the browser. Profiles: every state on the map as a county jail
 * (food prepared on site, no ICE detainees, no USMS prisoners), plus Salt Lake County jail and
 * Utah state prison.
 */
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'public', 'downloads');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const src = fs.readFileSync(path.join(root, 'src/data/complianceMap.ts'), 'utf8');
const states = [...src.matchAll(/\{ code: '([A-Z]{2})', name: '([^']+)' \}/g)].map((m) => ({ code: m[1], name: m[2] }));
if (states.length < 30) throw new Error(`Expected the STATES list, found ${states.length}`);

const profiles = states.map((s) => ({
  file: `Pest_Compliance_Checklist_County_Jail_${s.name.replace(/ /g, '_')}.pdf`,
  q: { state: s.code, op: 'county', ice: 'none', kitchen: '1', usms: '0', udc: s.code === 'UT' ? '1' : '0', slco: '0' }
}));
profiles.push({ file: 'Pest_Compliance_Checklist_Salt_Lake_County_Jail.pdf', q: { state: 'UT', op: 'county', ice: 'none', kitchen: '1', usms: '0', udc: '1', slco: '1' } });
profiles.push({ file: 'Pest_Compliance_Checklist_Utah_State_Prison.pdf', q: { state: 'UT', op: 'state', ice: 'none', kitchen: '1', usms: '0', udc: '1', slco: '0' } });

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(dist, p);
  if (!f.startsWith(dist) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cpr-chrome-'));

let made = 0;
// Headless Chrome on macOS can stay alive after writing the PDF, so wait for the file to settle, then stop it.
async function printPdf(url, target) {
  fs.rmSync(target, { force: true });
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profileDir}`,
    '--no-pdf-header-footer', '--timeout=6000', `--print-to-pdf=${target}`, url], { stdio: 'ignore', detached: true });
  let last = -1;
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const size = fs.existsSync(target) ? fs.statSync(target).size : -1;
    if (size > 0 && size === last) break;
    last = size;
  }
  try { process.kill(-proc.pid, 'SIGTERM'); } catch {}
  await new Promise((r) => setTimeout(r, 500));
}
for (const p of profiles) {
  const url = `http://127.0.0.1:${port}/tools/compliance-map/?${new URLSearchParams(p.q)}`;
  const target = path.join(out, p.file);
  await printPdf(url, target);
  const size = fs.existsSync(target) ? fs.statSync(target).size : 0;
  if (size < 5000) throw new Error(`${p.file} looks empty (${size} bytes)`);
  fs.chmodSync(target, 0o644);
  made++;
  console.log(`${p.file}  ${(size / 1024).toFixed(0)} KB`);
}
server.close();
fs.rmSync(profileDir, { recursive: true, force: true });
console.log(`${made} checklists written to public/downloads`);
