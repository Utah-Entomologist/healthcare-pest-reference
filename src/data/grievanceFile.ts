/**
 * The Vermin Grievance File: eight questions and the grievance-to-work-order loop.
 *
 * Source for both /tools/vermin-grievance-file/ and /tools/grievance-loop/.
 * Every string in CASE_QUOTES is verbatim from the file named in `source`,
 * held in ~/corrections-pest-reference-sources and checked by verify_tools.py.
 */

export interface CaseQuote {
  id: string;
  text: string;
  cite: string;
  source: string;
}

export const CASE_QUOTES: Record<string, CaseQuote> = {
  farmerKnows: {
    id: 'farmerKnows',
    text: 'knows of and disregards an excessive risk to inmate health or safety',
    cite: 'Farmer v. Brennan, 511 U.S. 825, 837 (1994)',
    source: 'Farmer_v_Brennan_511US825.txt'
  },
  farmerReasonable: {
    id: 'farmerReasonable',
    text: 'may be found free from liability if they responded reasonably to the risk, even if the harm ultimately was not averted',
    cite: 'Farmer v. Brennan, 511 U.S. 825, 844 (1994)',
    source: 'Farmer_v_Brennan_511US825.txt'
  },
  antonelliSprayed: {
    id: 'antonelliSprayed',
    text: 'sprayed twice by a pest control service was inconsistent with deliberate indifference',
    cite: 'Antonelli v. Sheahan, 81 F.3d 1422 (7th Cir. 1996)',
    source: 'Antonelli_v_Sheahan_81F3d1422.txt'
  },
  antonelliInsufficient: {
    id: 'antonelliInsufficient',
    text: 'Two pest-control sprayings in sixteen months, however, may have been seriously insufficient to deal with the condition that Mr. Antonelli alleges',
    cite: 'Antonelli v. Sheahan, 81 F.3d 1422 (7th Cir. 1996)',
    source: 'Antonelli_v_Sheahan_81F3d1422.txt'
  },
  antonelliSystemic: {
    id: 'antonelliSystemic',
    text: 'can be expected to know of or participate in creating systemic, as opposed to localized, situations',
    cite: 'Antonelli v. Sheahan, 81 F.3d 1422 (7th Cir. 1996)',
    source: 'Antonelli_v_Sheahan_81F3d1422.txt'
  },
  antonelliEither: {
    id: 'antonelliEither',
    text: 'whether considered under the Due Process Clause or the Eighth Amendment, should not have been dismissed at this stage',
    cite: 'Antonelli v. Sheahan, 81 F.3d 1422 (7th Cir. 1996)',
    source: 'Antonelli_v_Sheahan_81F3d1422.txt'
  },
  antonelliJail: {
    id: 'antonelliJail',
    text: 'while an inmate at the Cook County Jail',
    cite: 'Antonelli v. Sheahan, 81 F.3d 1422 (7th Cir. 1996)',
    source: 'Antonelli_v_Sheahan_81F3d1422.txt'
  },
  darnellShould: {
    id: 'darnellShould',
    text: 'knew, or should have known, that the condition posed an excessive risk to health or safety',
    cite: 'Darnell v. Pineiro, 849 F.3d 17, 35 (2d Cir. 2017)',
    source: 'Darnell_v_Pineiro_849F3d17.txt'
  },
  darnellNegligent: {
    id: 'darnellNegligent',
    text: 'A detainee must prove that an official acted intentionally or recklessly, and not merely negligently',
    cite: 'Darnell v. Pineiro, 849 F.3d 17, 36 (2d Cir. 2017)',
    source: 'Darnell_v_Pineiro_849F3d17.txt'
  },
  darnellVermin: {
    id: 'darnellVermin',
    text: 'infested with rats, mice, cockroaches, flies, and other insects and vermin',
    cite: 'Darnell v. Pineiro, 849 F.3d 17, 24 (2d Cir. 2017)',
    source: 'Darnell_v_Pineiro_849F3d17.txt'
  },
  edwardsVermin: {
    id: 'edwardsVermin',
    text: 'compelled to live in a prison cell coated in black mold and overrun by vermin are enough to establish an objective deprivation that posed a serious health risk',
    cite: 'Edwards v. Arocho, No. 22-585-pr, slip op. at 26 (2d Cir. Dec. 30, 2024)',
    source: 'Edwards_v_Arocho_2dCir_2024-12-30.txt'
  },
  edwardsRounds: {
    id: 'edwardsRounds',
    text: 'officers making their rounds',
    cite: 'Edwards v. Arocho, No. 22-585-pr, slip op. at 28 (2d Cir. Dec. 30, 2024)',
    source: 'Edwards_v_Arocho_2dCir_2024-12-30.txt'
  },
  dojFulton: {
    id: 'dojFulton',
    text: 'people incarcerated in the Fulton County Jail suffered harms from pest infestation',
    cite: 'U.S. Department of Justice, press release, November 14, 2024',
    source: 'DOJ_Fulton_2024-11-14_press_excerpt.txt'
  }
};

export const CASE_LINKS = {
  farmer: 'https://tile.loc.gov/storage-services/service/ll/usrep/usrep511/usrep511825/usrep511825.pdf',
  antonelli: 'https://law.resource.org/pub/us/case/reporter/F3/081/81.F3d.1422.94-3383.html',
  doj: 'https://www.justice.gov/archives/opa/pr/justice-department-finds-conditions-fulton-county-jail-georgia-violate-constitution-and',
  darnell: 'https://www.govinfo.gov/content/pkg/USCOURTS-ca2-15-02870/pdf/USCOURTS-ca2-15-02870-0.pdf',
  edwards: 'https://www.govinfo.gov/content/pkg/USCOURTS-ca2-22-00585/pdf/USCOURTS-ca2-22-00585-0.pdf'
} as const;

export interface GrievanceQuestion {
  n: number;
  /** Which half of the test the answer goes to. */
  half: 'Knowledge' | 'Response' | 'Exposure' | 'Answer';
  question: string;
  record: string;
  /** Optional link to an authority page that sets record contents. */
  authority?: { label: string; href: string };
}

export const QUESTIONS: GrievanceQuestion[] = [
  {
    n: 1,
    half: 'Knowledge',
    question: 'When did the jail first learn of the complaint, and where is that recorded (grievance, kite, sick call, officer log)?',
    record: 'The grievance, kite, sick-call slip, or officer log entry, showing the date and time it was received.'
  },
  {
    n: 2,
    half: 'Knowledge',
    question: 'Who received it, and what did they do with it, on what date?',
    record: 'The routing on the grievance (received by, sent to, date), and the log entry or message that shows it reached facilities staff or the pest control provider.'
  },
  {
    n: 3,
    half: 'Response',
    question: 'What did the jail do in response, and when? Is there a work order?',
    record: 'A work order or service request with its own number and date, tied to the grievance number and the location.'
  },
  {
    n: 4,
    half: 'Response',
    question: 'Who performed the response, staff or vendor, and what were they licensed and contracted to do?',
    record: 'The staff assignment or the vendor service record; the applicator’s license number; the pest control contract and scope in force on that date.'
  },
  {
    n: 5,
    half: 'Response',
    question: 'What did they find, and what did they apply or install: product, EPA registration number, location, quantity?',
    record: 'The service record for that visit: findings, the areas treated, each product with its EPA registration number and amount, and any traps, monitors, or exclusion work installed. Each state’s pesticide rules set what an application record must contain and how soon it must be made.',
    authority: { label: 'Compliance Map', href: '/tools/compliance-map/' }
  },
  {
    n: 6,
    half: 'Exposure',
    question: 'Was the affected person moved, and is that documented?',
    record: 'The housing or movement log, classification note, or medical note that shows the move, or the note that says why there was none.'
  },
  {
    n: 7,
    half: 'Response',
    question: 'When did the jail check whether the response worked, and what did it find?',
    record: 'A dated follow-up inspection or return-visit record with a result: resolved, still active, or re-treated.'
  },
  {
    n: 8,
    half: 'Answer',
    question: 'What did the jail tell the grievant, when, and does the grievance response match the work record?',
    record: 'The written grievance response with its date, and the work order and service record it relies on. The dates should run in order: complaint, work order, response, follow-up, answer.'
  }
];

export interface LoopStep {
  step: string;
  what: string;
  record: string;
  questions: number[];
}

export const LOOP: LoopStep[] = [
  { step: 'Receive', what: 'A pest complaint arrives by grievance, kite, sick call, officer observation, or inspection.', record: 'Grievance or log entry, dated, with the location and the pest reported', questions: [1, 2] },
  { step: 'Work order', what: 'The complaint becomes a work order the same day, with a number that points back to the grievance.', record: 'Work order number, date, location, pest', questions: [3] },
  { step: 'Respond', what: 'Staff or the pest control provider responds at that location, and the affected person is moved if needed.', record: 'Service record: who, license, findings, products and EPA registration numbers, amounts, devices; movement log', questions: [4, 5, 6] },
  { step: 'Verify', what: 'Someone goes back and checks whether it worked.', record: 'Dated follow-up with a result', questions: [7] },
  { step: 'Close', what: 'The grievance is answered after the work, and the answer matches the record.', record: 'Grievance response, dated, citing the work order', questions: [8] }
];

export const BREAKS: string[] = [
  'The complaint never becomes a work order.',
  'The service visit records no location, so it cannot be matched to the complaint.',
  'The treatment has no follow-up check.',
  'The grievance closes with no date, or with no record of what was done.',
  'The grievance is answered before the work was done.'
];
