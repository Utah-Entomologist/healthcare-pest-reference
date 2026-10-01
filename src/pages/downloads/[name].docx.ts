/**
 * Word files built at `astro build` from the same sources as their pages:
 *  - Model Scope of Work (src/data/scopeOfWork.js), /tools/scope-of-work/
 *  - Model Pest Control Policy (src/data/pestPolicy.js), /tools/pest-control-policy/
 * Each comes as one national version plus one per state on the reference (county jail, food
 * prepared on site, no ICE detainees, no USMS prisoners — the same default profile as the
 * checklist PDFs). Bracketed fill-ins are highlighted so the agency can find every one.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Footer, AlignmentType } from 'docx';
import { AUTHORITIES, STATES, OSHA_PUBLIC } from '../../data/complianceMap';
import { STATE_STANDARD_ROWS } from '../../data/stateStandards.js';
import { contextFrom } from '../../lib/applicability.js';
import { SOW_TITLE, SOW_HOW_TO_USE, SOW_SECTIONS, sowSlots, fill, profileLabel, defaultProfile, sowDocxName } from '../../data/scopeOfWork.js';
import { POLICY_TITLE, POLICY_HOW_TO_USE, POLICY_SECTIONS, policySlots, policyDocxName } from '../../data/pestPolicy.js';
import { SITE_URL } from '../../lib/site';

type Kind = 'sow' | 'policy';

const DOCS = {
  sow: { title: SOW_TITLE, howTo: SOW_HOW_TO_USE, sections: SOW_SECTIONS, slots: sowSlots, name: sowDocxName, page: '/tools/scope-of-work/', label: 'Model Scope of Work', description: 'Model scope of work for correctional pest management, from the Corrections Pest Reference.' },
  policy: { title: POLICY_TITLE, howTo: POLICY_HOW_TO_USE, sections: POLICY_SECTIONS, slots: policySlots, name: policyDocxName, page: '/tools/pest-control-policy/', label: 'Model Pest Control Policy', description: 'Model pest control policy for jails, prisons, and detention facilities, from the Corrections Pest Reference.' }
};

export const getStaticPaths: GetStaticPaths = () =>
  (Object.keys(DOCS) as Kind[]).flatMap((kind) => [
    { params: { name: DOCS[kind].name('') }, props: { kind, code: '' } },
    ...STATES.map((s) => ({ params: { name: DOCS[kind].name(s.name) }, props: { kind, code: s.code } }))
  ]);

/** Split text into plain and [bracketed] runs, honoring nested brackets. */
function runs(text: string): TextRun[] {
  const out: TextRun[] = [];
  let buf = '';
  let depth = 0;
  const flush = (hi: boolean) => {
    if (!buf) return;
    out.push(new TextRun(hi ? { text: buf, highlight: 'yellow' } : { text: buf }));
    buf = '';
  };
  for (const ch of text) {
    if (ch === '[') { if (depth === 0) flush(false); depth++; buf += ch; continue; }
    if (ch === ']' && depth > 0) { buf += ch; depth--; if (depth === 0) flush(true); continue; }
    buf += ch;
  }
  flush(depth > 0);
  return out;
}

export const GET: APIRoute = async ({ props }) => {
  const { kind, code } = props as { kind: Kind; code: string };
  const D = DOCS[kind];
  const ctx = contextFrom(AUTHORITIES, STATES, OSHA_PUBLIC);
  const profile = code ? defaultProfile(code) : null;
  const slots = D.slots(profile, { AUTHORITIES, ctx, STANDARD_ROWS: STATE_STANDARD_ROWS });
  const site = SITE_URL.replace('https://', '');

  const children: Paragraph[] = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(D.title)] }),
    new Paragraph({ children: [new TextRun({ text: 'Filled in for: ', bold: true }), new TextRun(profileLabel(profile, ctx.STATE_NAMES))] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('How to use this document')] }),
    new Paragraph({ spacing: { after: 160 }, children: runs(D.howTo + ` (Pest Compliance Map: ${site}/tools/compliance-map/)`) })
  ];
  for (const sec of D.sections) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(sec.h)] }));
    for (const p of sec.p) {
      const text = fill(p, slots);
      if (!text.trim()) continue;
      children.push(new Paragraph({ spacing: { after: 120 }, children: runs(text) }));
    }
  }

  const doc = new Document({
    creator: 'Trenton S. Frazer, M.S., BCE #B3413',
    title: D.title,
    description: D.description,
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${D.label}, Corrections Pest Reference (${site}${D.page}). Model language, not legal advice.`, size: 16, color: '666666' })] })] })
      },
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  return new Response(new Uint8Array(buf), {
    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  });
};
