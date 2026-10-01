/**
 * Model Scope of Work — content and state fill-ins.
 *
 * One source for three outputs: the /tools/scope-of-work/ page, its print/PDF view, and the
 * Word files built at `astro build` (src/pages/downloads/[name].docx.ts).
 *
 * Paragraph text carries {{slot}} tokens. sowSlots() resolves them for a facility profile:
 * with no state chosen it returns the national version (neutral [BRACKETS]); with a state it
 * fills only what this reference has verified for that state — the authorities the Pest
 * Compliance Map applies to the profile, and the state standard's own frequency and provider
 * reading from the 30-state comparison. Utah keeps its verified R68-7 / GRAMA specifics.
 * Nothing here invents a state rule: anything not verified stays a bracket for the agency.
 */
import { activeFor, stateNameOf, UTAH_KEYS } from '../lib/applicability.js';

export const SOW_TITLE = 'Model Scope of Work: Pest Management for Jails, Prisons, and Detention Facilities';

export const SOW_HOW_TO_USE =
  'This is model language for the scope of work in a pest management contract for a jail, prison, or detention facility. ' +
  'Text in [BRACKETS] is for the agency to complete or choose. Delete provisions that do not fit the facility. ' +
  'Each requirement is keyed to the authorities that ask for it; the Pest Compliance Map shows which authorities reach a given facility. ' +
  'Adapt it with your procurement officer and counsel. It is not legal advice.';

export const SOW_SECTIONS = [
  { h: '1. Purpose', p: [
    '1.1 The Contractor shall provide integrated pest management services that control and eliminate insects, rodents, and other pests at [FACILITY NAME AND ADDRESS] (the Facility), and shall produce the records that the authorities governing the Facility require.',
    '1.2 The services cover all buildings, grounds, and accessory structures of the Facility, including intake and booking, housing units, medical and infirmary areas, food service (receiving, dry storage, cold storage, preparation, dish, and refuse areas), laundry, commissary and warehouse, staff areas, mechanical spaces, and the exterior perimeter [within THREE FEET of structures / to the fence line].'
  ] },
  { h: '2. Governing requirements', p: [
    "2.1 The Contractor's services and records shall meet the pest control requirements of the authorities that apply to the Facility, which are: {{authorities}}.",
    '2.2 Where two authorities set different frequencies or record requirements, the Contractor shall meet the more demanding one.'
  ] },
  { h: '3. Contractor qualifications', p: [
    '3.1 The Contractor shall hold a current commercial pesticide business license in {{state}}. {{licenseNote}}',
    '3.2 Every person applying pesticides at the Facility shall hold a current commercial applicator license in each category the work requires. {{categoriesNote}}',
    "3.3 [OPTIONAL] The Contractor's program for the Facility shall be designed, and reviewed at least annually, by a Board Certified Entomologist (BCE) or by an entomologist with [EQUIVALENT QUALIFICATION ACCEPTABLE TO THE AGENCY].",
    "3.4 Contractor personnel shall pass the Facility's background check and shall follow the Facility's escort, tool control, key control, and contraband procedures.",
    "3.5 Insurance: [LIMITS AND ENDORSEMENTS SET BY THE AGENCY'S RISK MANAGER]."
  ] },
  { h: '4. Service frequency', p: [
    '4.1 Scheduled service throughout the Facility at least [MONTHLY]. (Benchmarks: ICE PBNDS 2011 Standard 1.2 §V.A.4, USMS FPBDS F.2.4, and BOP Program Statement 1614.01 §47.a each set monthly inspections; Virginia 6VAC15-40-1150 sets service at least quarterly.)',
    '{{stateStandardNote}}',
    '4.2 Food service areas: scheduled service [WEEKLY / TWICE MONTHLY / MONTHLY].',
    '4.3 Callbacks: on-site response within [24] hours of a request, and within [4] hours for [RODENT ACTIVITY IN FOOD AREAS / SUSPECTED BED BUGS IN HOUSING / OTHER].',
    '4.4 During an active infestation, the Contractor shall increase service frequency in the affected area at no additional charge until activity is resolved, and shall document each added visit.'
  ] },
  { h: '5. Scope of each service visit', p: [
    '5.1 Inspect every area in the service rotation for evidence of insects, rodents, and other pests, including incoming shipments when present at receiving.',
    '5.2 Check and service every monitoring device on the device map (Section 6).',
    '5.3 Identify conducive conditions (harborage, sanitation, moisture, and exclusion gaps), and report each with its location, a photograph where Facility security permits, and the recommended correction.',
    '5.4 Apply treatments only where inspection or monitoring warrants, using the least hazardous effective method, and only in accordance with the product label.',
    '5.5 Identify pests to species where identification changes the treatment.'
  ] },
  { h: '6. Monitoring devices and security', p: [
    '6.1 The Contractor shall maintain a numbered device map for the Facility, updated whenever a device is added, moved, or removed, and shall provide it to [FACILITY CONTACT].',
    '6.2 Devices in areas accessible to incarcerated people shall be tamper-resistant and secured, of a type approved by Facility security.',
    '6.3 The Contractor shall reconcile the device count at each visit and report any missing or damaged device to [SECURITY / TOOL CONTROL] the same day.',
    '6.4 Insect control devices that electrocute or stun flying insects shall retain them, and no insect control device shall be installed over a food preparation area. (FDA Food Code §6-202.13.)'
  ] },
  { h: '7. Records', p: [
    "7.1 Application records. For every pesticide application, the Contractor shall record, within [24] hours, each element required by {{recordsRule}}, including the product brand name, EPA registration number, and mix rate; the amount applied; the target site and pest; the date and time; and the applicator's name and license number.",
    '7.2 Findings report. After each visit, the Contractor shall deliver to [FACILITY CONTACT] within [TWO BUSINESS DAYS] a report stating: pest activity by location and device; species identified; conducive conditions found, with the party responsible for correcting each; the status of conditions reported on earlier visits; and every treatment made.',
    '7.3 Immediate notice. The Contractor shall notify [FACILITY CONTACT] the same day of any infestation, any rodent activity in food service, and any suspected bed bugs or lice, so that the Facility can meet its own notice obligations. (For example, ICE NDS 2019 Standard 1.1 §II.E requires the facility to notify ICE/ERO immediately of an insect or rodent infestation.)',
    '7.4 The Contractor shall provide the label and Safety Data Sheet for every product used before first use, and whenever a product changes.',
    '7.5 Retention. The Contractor shall retain its records for at least {{retention}}, and shall deliver copies to the Facility.',
    '7.6 On request, and before any scheduled inspection by {{inspectors}}, the Contractor shall provide its records for the period requested, organized by the authority each record satisfies.'
  ] },
  { h: '8. Pesticide management', p: [
    '8.1 Only products registered by the EPA [and by {{stateUpper}}] shall be used, and only in accordance with their labels.',
    '8.2 Restricted use pesticides shall be applied only by licensed applicators and only with the prior written approval of [FACILITY CONTACT].',
    '8.3 The Contractor shall submit its product list for approval before first use and whenever it changes.',
    '8.4 No pesticide shall be stored at the Facility except in [LOCKED STORAGE DESIGNATED BY THE FACILITY].'
  ] },
  { h: '9. Exclusion and structural work', p: [
    '9.1 Exclusion needs (gaps, door sweeps, screens, penetrations, air curtain function) shall be identified and reported at each visit.',
    '9.2 Exclusion work shall be performed [WITHIN THE MONTHLY RATE UP TO [X] HOURS PER MONTH / UNDER A SEPARATE WRITTEN QUOTE APPROVED IN ADVANCE].'
  ] },
  { h: '10. Program review', p: [
    '10.1 Quarterly, the Contractor shall review with [FACILITY CONTACT] activity trends by area, open conducive conditions, callbacks, and device reconciliation.',
    '10.2 [OPTIONAL] Annually, the program shall be reviewed as provided in Section 3.3, with a written report.'
  ] },
  { h: '11. Contract terms', p: [
    '11.1 Pricing is a fixed monthly rate. No initial, setup, or prepayment charges.',
    "11.2 The agreement shall not renew automatically [or: renews only by written amendment]. The Agency may terminate on [30] days' written notice without penalty.",
    '11.3 The monthly rate is fixed for [36 MONTHS], and any later adjustment is limited to [INDEX OR PERCENTAGE].',
    "11.4 Disputes are resolved under [THE AGENCY'S STANDARD TERMS]. The agreement contains no mandatory arbitration clause, and late charges apply only as [THE AGENCY'S STANDARD TERMS] allow.",
    '11.5 Records produced under this agreement belong to the Agency and are subject to {{publicRecords}}.'
  ] }
];

const OPS = { county: 'County jail', state: 'State prison', bop: 'Federal Bureau of Prisons institution', private: 'Privately operated facility' };

/** The national version: every slot is a neutral bracket. */
export const NATIONAL_SLOTS = {
  authorities: "[SELECT FROM THE PEST COMPLIANCE MAP, for example: the pest provision of the state's jail standards; FDA Food Code §6-501.111 as the state adopts it; 29 CFR 1910.141(a)(5) where OSHA reaches the Facility; ICE PBNDS 2011 Standards 1.2 and 4.1; USMS FPBDS Version 12 Standard F.2.4]",
  state: '[STATE]',
  stateUpper: 'the STATE',
  licenseNote: '(Issued by [THE STATE AGENCY THAT LICENSES COMMERCIAL PEST CONTROL BUSINESSES].)',
  categoriesNote: '(Confirm the license categories the state requires for structural and institutional pest control, and for outdoor vertebrate and wood-destroying organism work where it is in scope.)',
  stateStandardNote: '',
  recordsRule: "[THE STATE'S PESTICIDE APPLICATION RECORDKEEPING RULE]",
  retention: "[THE PERIOD SET BY THE STATE'S PESTICIDE RECORDKEEPING RULE / THREE YEARS, per BOP 1614.01 §47 where it applies]",
  inspectors: '[THE STATE JAIL STANDARDS INSPECTOR / ICE / USMS / THE HEALTH DEPARTMENT / AN ACCREDITOR]',
  publicRecords: '[APPLICABLE STATE PUBLIC RECORDS LAW]'
};

/** Short human description of a profile, e.g. "Florida · County jail · food prepared on site". */
export function profileLabel(a, STATE_NAMES) {
  if (!a || !a.state) return 'National version (no state chosen)';
  const p = [stateNameOf(a.state, STATE_NAMES), OPS[a.op]];
  if (a.state === 'UT' && (a.op === 'county' || a.op === 'private')) p.push(a.udc ? 'houses state inmates' : 'no state inmates');
  if (a.state === 'UT' && a.slco) p.push('Salt Lake County');
  p.push(a.ice === 'none' ? 'no ICE detainees' : a.ice === 'pbnds' ? 'ICE (PBNDS 2011)' : a.ice === 'nds' ? 'ICE (NDS 2019)' : 'ICE (standards unconfirmed)');
  if (a.usms) p.push('USMS prisoners');
  p.push(a.kitchen ? 'food prepared on site' : 'no food prepared on site');
  return p.join(' · ');
}

/**
 * Resolve the slots for a profile.
 * data: { AUTHORITIES, ctx, STANDARD_ROWS } — AUTHORITIES and ctx from the compliance map data,
 * STANDARD_ROWS from src/data/stateStandards.js.
 */
export function sowSlots(a, data) {
  if (!a || !a.state || a.state === 'OTHER') return { ...NATIONAL_SLOTS };
  const { AUTHORITIES, ctx, STANDARD_ROWS } = data;
  const name = stateNameOf(a.state, ctx.STATE_NAMES);
  const UT = a.state === 'UT';
  // GRAMA is a records law, not a pest requirement; 11.5 carries it.
  const active = activeFor(a, AUTHORITIES.map((x) => x.key).filter((k) => k !== 'grama'), ctx);
  const names = Object.fromEntries(AUTHORITIES.map((x) => [x.key, x.name]));
  const applies = Object.keys(active).filter((k) => active[k].s === 'applies').map((k) => names[k]);
  const checks = Object.keys(active).filter((k) => active[k].s === 'check').map((k) => names[k]);
  let authorities;
  if (applies.length && checks.length) {
    authorities = applies.join('; ') + '; and, where they reach the Facility, [CONFIRM: ' + checks.join('; ') + ']';
  } else if (applies.length) {
    authorities = applies.join('; ');
  } else if (checks.length) {
    authorities = '[CONFIRM WHICH OF THESE REACH THE FACILITY: ' + checks.join('; ') + ']';
  } else {
    authorities = '[NO AUTHORITY ON THIS REFERENCE REACHES THIS PROFILE; LIST THE AUTHORITIES THAT APPLY]';
  }
  const row = STANDARD_ROWS.find((r) => r.state === name);
  const stateStandardNote = row && a.op !== 'bop'
    ? `[DRAFTING NOTE, delete before issuing: ${name}'s jail standard, ${row.instrument}, on frequency and provider: ${row.frequency}]`
    : '';
  const slots = {
    ...NATIONAL_SLOTS,
    authorities,
    state: name,
    stateUpper: name,
    licenseNote: '(Issued by [THE ' + name.toUpperCase() + ' AGENCY THAT LICENSES COMMERCIAL PEST CONTROL BUSINESSES].)',
    categoriesNote: '(Confirm the license categories ' + name + ' requires for structural and institutional pest control, and for outdoor vertebrate and wood-destroying organism work where it is in scope.)',
    stateStandardNote,
    recordsRule: '[THE ' + name.toUpperCase() + ' PESTICIDE APPLICATION RECORDKEEPING RULE]',
    retention: '[THE PERIOD SET BY THE ' + name.toUpperCase() + ' PESTICIDE RECORDKEEPING RULE / THREE YEARS, per BOP 1614.01 §47 where it applies]',
    publicRecords: '[APPLICABLE ' + name.toUpperCase() + ' PUBLIC RECORDS LAW]'
  };
  if (UT && a.op !== 'bop') {
    // Utah's pesticide, records, and inspection rules are verified on this reference.
    slots.licenseNote = '(In Utah, issued by the Utah Department of Agriculture and Food under R68-7.)';
    slots.categoriesNote = '(In Utah: Category 7, Structural and Health Related Pest Control, whose definition names prisons; Category 12, Vertebrate Animal Pest Control, for outdoor vertebrate work beyond three feet of structures; Category 15, Wood Destroying Organisms, where that work is in scope.)';
    slots.recordsRule = '[Utah Admin. Code R68-7-11(11)]';
    slots.retention = '[TWO YEARS, per R68-7-11(11)(c) / THREE YEARS, per BOP 1614.01 §47]';
    slots.inspectors = '[UDC / ICE / USMS / THE HEALTH DEPARTMENT / AN ACCREDITOR]';
    slots.publicRecords = '[APPLICABLE PUBLIC RECORDS LAW; IN UTAH, UTAH CODE 63G-2-301]';
  }
  return slots;
}

/** Split a paragraph into static text and slot tokens: [{ text } | { slot }]. */
export function tokenize(p) {
  const out = [];
  const re = /\{\{(\w+)\}\}/g;
  let last = 0, m;
  while ((m = re.exec(p))) {
    if (m.index > last) out.push({ text: p.slice(last, m.index) });
    out.push({ slot: m[1] });
    last = re.lastIndex;
  }
  if (last < p.length) out.push({ text: p.slice(last) });
  return out;
}

/** Fill a paragraph's slots. */
export function fill(p, slots) {
  return p.replace(/\{\{(\w+)\}\}/g, (_, k) => slots[k] ?? '').replace(/\s+$/, '');
}

/** The default profile used for each state's ready-made Word file (matches the checklist PDFs). */
export function defaultProfile(code) {
  return { state: code, op: 'county', ice: 'none', kitchen: true, usms: false, udc: code === 'UT', slco: false };
}

export function sowDocxName(stateName) {
  return stateName ? 'Model_Scope_of_Work_' + stateName.replace(/ /g, '_') : 'Model_Scope_of_Work_Correctional_Pest_Management';
}

export { UTAH_KEYS };
