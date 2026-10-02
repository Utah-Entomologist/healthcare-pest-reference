/**
 * Model Pest Control Policy — content and state fill-ins.
 *
 * One source for the /tools/pest-control-policy/ page, its print/PDF view, and the Word files
 * built at `astro build` (src/pages/downloads/[name].docx.ts). Same profile and fill-in rules as
 * the Model Scope of Work (src/data/scopeOfWork.js): only what this reference has verified is
 * filled in; everything else stays a [BRACKET] for the agency.
 *
 * The language is original to this reference. It is not adapted from any copyrighted policy manual.
 */
import { sowSlots } from './scopeOfWork.js';
import { stateNameOf } from '../lib/applicability.js';

export const POLICY_TITLE = 'Model Pest Control Policy for Jails, Prisons, and Detention Facilities';

export const POLICY_HOW_TO_USE =
  "This is model language for an agency's written pest control policy or procedure. Text in [BRACKETS] is for the agency to complete or choose. " +
  'Delete provisions that do not fit the facility. Each provision is keyed to the authorities that ask for it; the Pest Compliance Map shows which authorities reach a given facility. ' +
  "If the agency's policy manual already has a pest control policy (Lexipol's custody manual has one, Policy 805), use this model to review it, and keep one policy, not two. " +
  'Keep the service agreement consistent with the policy the agency adopts; the Model Scope of Work is contract language for that. ' +
  'Adapt it with your counsel. It is not legal advice.';

export const POLICY_SECTIONS = [
  { h: '1. Purpose', p: [
    '1.1 This policy sets out how [AGENCY] prevents, finds, and corrects insect, rodent, and other pest activity at [FACILITY NAME] (the Facility), how pest reports are received and closed, and the records that show it was done.'
  ] },
  { h: '2. Policy', p: [
    '2.1 It is the policy of [AGENCY] that the Facility be kept free of conditions that attract or shelter pests, that pest activity be found and corrected promptly, and that each step be documented.',
    '2.2 This policy is written to meet the pest control requirements of the authorities that apply to the Facility, which are: {{authorities}}.',
    '{{stateStandardNote}}',
    '{{lexipolNote}}'
  ] },
  { h: '3. Responsibility', p: [
    '3.1 The [JAIL ADMINISTRATOR / FACILITY COMMANDER] or designee is responsible for this policy, for the pest control service agreement, and for the records this policy requires.',
    '3.2 The [HEALTH AUTHORITY / RESPONSIBLE PHYSICIAN / MEDICAL DIRECTOR] sets the protocol for persons, clothing, bedding, and property found infested (Section 7).',
    '3.3 The [FOOD SERVICE MANAGER] carries out Section 6 in food service areas.'
  ] },
  { h: '4. Pest control service', p: [
    '4.1 Pest control at the Facility is performed by [A LICENSED COMMERCIAL PEST CONTROL BUSINESS UNDER A WRITTEN SERVICE AGREEMENT / FACILITY STAFF WHO HOLD EVERY PESTICIDE APPLICATOR LICENSE THE WORK REQUIRES].',
    '4.2 The provider inspects all areas of the Facility, and treats as required, at least [MONTHLY], and responds to a pest report within [TIME]. (Benchmarks: ICE PBNDS 2011 Standard 1.2 §V.A.4, USMS FPBDS F.2.4, and BOP Program Statement 1614.01 §47.a each set monthly inspections; Virginia 6VAC15-40-1150 sets service at least quarterly.)',
    '4.3 The service agreement matches this policy: the same frequency, the same provider qualifications, and the records Section 9 requires. A current copy of the agreement is kept with this policy.',
    '4.4 Only pesticides registered for the intended use are applied, and only according to their labels.'
  ] },
  { h: '5. Pest reports and conducive conditions', p: [
    "5.1 Staff record pest activity, and conditions that attract or shelter pests (food kept in cells, standing water, gaps around pipes and doors, damaged screens and door sweeps), on the Facility's [WEEKLY] sanitation inspection.",
    "5.2 Every pest report, whether from an incarcerated person's grievance, request, or sick call, a staff observation, a health or jail inspection, or the provider's service report, is logged the day it is received with the date, location, and pest, and is opened as a work order.",
    '5.3 A logged report is closed only after the response is recorded, a follow-up check is made, and the person who reported it receives an answer that matches the work record.',
    '{{grievanceNote}}',
    '5.4 Conducive conditions are entered as maintenance work orders and tracked to completion.'
  ] },
  { h: '6. Food service areas', p: [
    '6.1 Incoming food and supplies are checked for pests on receipt, and food service areas are inspected for evidence of pests [DAILY / WEEKLY]. Pest activity found is reported under Section 5. (FDA Food Code §6-501.111(A) and (B).)',
    '6.2 No insect control device is installed over a food preparation area, and devices that electrocute or stun flying insects retain them. (FDA Food Code §6-202.13.)'
  ] },
  { h: '7. Infested persons, clothing, and property', p: [
    "7.1 A person found infested with lice, mites, bed bugs, or other pests is treated under the health authority's protocol as soon as the infestation is identified, in an area separate from general housing.",
    "7.2 Clothing, bedding, and property of an infested person are handled under the health authority's protocol and the provider's direction (for example, hot laundering and high-heat drying, sealed bagging, or treatment), so that pests are not carried to clean supplies or other housing areas.",
    '7.3 Each treatment is documented: the date, the person or area treated, the pest, and the treatment used.'
  ] },
  { h: '8. Pesticide storage and use by staff', p: [
    '8.1 Pesticides kept at the Facility are stored in labeled original containers, in a locked area separate from food, food service supplies, and kitchenware, and out of the reach of incarcerated people.',
    '8.2 Facility staff apply pesticides only as {{state}} law allows, holding any applicator license it requires.'
  ] },
  { h: '9. Records', p: [
    "9.1 The Facility keeps, for at least [RETENTION PERIOD]: this policy and the current service agreement; the provider's service reports (date, areas inspected, findings, products and amounts applied, and recommendations); the pest report log and work orders; treatment records under Section 7; and sanitation inspection records.",
    '9.2 Records are kept so that, for any pest report, the Facility can show when it learned of the report, what it did, who did it, whether it worked, and what it told the person who reported it.'
  ] },
  { h: '10. Review', p: [
    '10.1 This policy is reviewed at least [ANNUALLY], when the service agreement is awarded or renewed, and after any finding by an inspecting or accrediting agency.'
  ] }
];

export const POLICY_NATIONAL_SLOTS = {
  authorities: "[SELECT FROM THE PEST COMPLIANCE MAP, for example: the pest provision of the state's jail standards or accreditation standards; FDA Food Code §6-501.111 as the state adopts it; 29 CFR 1910.141(a)(5) where OSHA reaches the Facility; ICE PBNDS 2011 Standards 1.2 and 4.1; USMS FPBDS Version 12 Standard F.2.4]",
  state: '[STATE]',
  stateStandardNote: '',
  lexipolNote: '',
  grievanceNote: ''
};

/**
 * Resolve the slots for a profile (same `data` as sowSlots: { AUTHORITIES, ctx, STANDARD_ROWS }).
 * The state drafting note quotes the state's standard as the 30-state comparison does.
 */
export function policySlots(a, data) {
  if (!a || !a.state || a.state === 'OTHER') return { ...POLICY_NATIONAL_SLOTS };
  const sow = sowSlots(a, data);
  const name = stateNameOf(a.state, data.ctx.STATE_NAMES);
  const row = data.STANDARD_ROWS.find((r) => r.state === name);
  const slots = { ...POLICY_NATIONAL_SLOTS, authorities: sow.authorities, state: name };
  if (row && a.op !== 'bop') {
    slots.stateStandardNote = `[DRAFTING NOTE, delete before adopting: ${name}'s jail standard, ${row.instrument}, reads: "${row.quote}" On frequency and provider: ${row.frequency}]`;
  }
  if (a.state === 'NY' && a.op !== 'bop') {
    slots.grievanceNote = '[DRAFTING NOTE, delete before adopting: In New York, 9 NYCRR Part 7032 sets the grievance clock. A grievance is filed within five days of the occurrence (7032.4(d)), and the grievance coordinator issues a written determination within five business days of receipt (7032.4(i)). Where the follow-up check under 5.3 cannot be made within that time, the determination can state what was done and when the follow-up check is scheduled, and the report stays open until the check is recorded. A grievance found to have merit requires relief "for all others similarly situated" (7032.4(l)). Part 7032 does not apply to facilities in cities of one million or more (7032.12).]';
  }
  if (a.lexipol && a.op !== 'bop') {
    slots.lexipolNote = "[DRAFTING NOTE, delete before adopting: The Agency's policy manual is Lexipol's custody manual, whose Policy 805 already covers pest control services (a licensed pest control professional inspecting at least monthly), infested inmates, and storage of pest control compounds. Use this model to review Policy 805 against the Agency's practice. Policy 805 itself does not address pest reports and grievances, food service, records, or review; check whether other policies in the manual do before adding them. Keep one pest control policy, not two.]";
  }
  return slots;
}

export function policyDocxName(stateName) {
  return stateName ? 'Model_Pest_Control_Policy_' + stateName.replace(/ /g, '_') : 'Model_Pest_Control_Policy_Correctional_Facilities';
}
