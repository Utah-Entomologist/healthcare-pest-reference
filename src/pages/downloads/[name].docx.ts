/**
 * Model Scope of Work as Word files, built at `astro build` from the same source as the page:
 * one national version plus one per state on the reference (county jail, food prepared on site,
 * no ICE detainees, no USMS prisoners — the same default profile as the checklist PDFs).
 * Bracketed fill-ins are highlighted so the agency can find every one.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Footer, AlignmentType } from 'docx';
import { AUTHORITIES, STATES, OSHA_PUBLIC } from '../../data/complianceMap';
import { STATE_STANDARD_ROWS } from '../../data/stateStandards.js';
import { contextFrom } from '../../lib/applicability.js';
import { SOW_TITLE, SOW_HOW_TO_USE, SOW_SECTIONS, sowSlots, fill, profileLabel, defaultProfile, sowDocxName } from '../../data/scopeOfWork.js';
import { SITE_URL } from '../../lib/site';

export const getStaticPaths: GetStaticPaths = () => [
  { params: { name: sowDocxName('') }, props: { code: '' } },
  ...STATES.map((s) => ({ params: { name: sowDocxName(s.name) }, props: { code: s.code } }))
];

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
  const code = (props as { code: string }).code;
  const ctx = contextFrom(AUTHORITIES, STATES, OSHA_PUBLIC);
  const profile = code ? defaultProfile(code) : null;
  const slots = sowSlots(profile, { AUTHORITIES, ctx, STANDARD_ROWS: STATE_STANDARD_ROWS });
  const site = SITE_URL.replace('https://', '');

  const children: Paragraph[] = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(SOW_TITLE)] }),
    new Paragraph({ children: [new TextRun({ text: 'Filled in for: ', bold: true }), new TextRun(profileLabel(profile, ctx.STATE_NAMES))] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('How to use this document')] }),
    new Paragraph({ spacing: { after: 160 }, children: runs(SOW_HOW_TO_USE + ` (Pest Compliance Map: ${site}/tools/compliance-map/)`) })
  ];
  for (const sec of SOW_SECTIONS) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(sec.h)] }));
    for (const p of sec.p) {
      const text = fill(p, slots);
      if (!text.trim()) continue;
      children.push(new Paragraph({ spacing: { after: 120 }, children: runs(text) }));
    }
  }

  const doc = new Document({
    creator: 'Trenton S. Frazer, M.S., BCE #B3413',
    title: SOW_TITLE,
    description: 'Model scope of work for correctional pest management, from the Corrections Pest Reference.',
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Model Scope of Work, Corrections Pest Reference (${site}/tools/scope-of-work/). Model language, not legal advice.`, size: 16, color: '666666' })] })] })
      },
      children
    }]
  });
  const buf = await Packer.toBuffer(doc);
  return new Response(new Uint8Array(buf), {
    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  });
};
