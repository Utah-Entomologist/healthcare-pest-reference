/**
 * Corrections Pest Compliance Map — data.
 *
 * Every `quote` is verbatim from the authority's primary source and is checked by
 * ~/corrections-pest-reference-sources/verify_map.py against the raw capture.
 * `requirement`, `evidence`, and `owner` are plain-language restatements; `owner`
 * names a person or body only where the quoted text names one.
 * Nothing here is a compliance determination.
 */

export type Cadence =
  | 'delivery' | 'application' | 'daily' | 'weekly' | 'monthly' | 'quarterly'
  | 'annual' | 'detection' | 'ongoing' | 'routine' | 'policy' | 'contract' | 'request';

export const CADENCE_LABELS: Record<Cadence, string> = {
  delivery: 'Each delivery',
  application: 'Each pesticide application',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annual: 'Annually',
  detection: 'When pests are found',
  ongoing: 'Ongoing condition',
  routine: 'Routinely (no frequency set)',
  policy: 'Written plan or policy',
  contract: 'At contract award and renewal',
  request: 'On request'
};

export const CADENCE_ORDER: Cadence[] = [
  'policy', 'contract', 'delivery', 'application', 'daily', 'weekly', 'monthly',
  'quarterly', 'annual', 'detection', 'routine', 'ongoing', 'request'
];

export interface Authority {
  key: string;
  name: string;
  slug: string;
  group: 'Federal' | 'Federal detention and corrections' | 'Utah' | 'Other states';
}

export const AUTHORITIES: Authority[] = [
  { key: 'osha', name: 'OSHA 29 CFR 1910.141', slug: 'osha-1910-141-sanitation', group: 'Federal' },
  { key: 'fda', name: 'FDA Food Code 2022', slug: 'fda-food-code-2022', group: 'Federal' },
  { key: 'bop1614', name: 'BOP P1614.01 Occupational Safety', slug: 'bop-p1614-01-occupational-safety', group: 'Federal detention and corrections' },
  { key: 'bop4700', name: 'BOP P4700.08 Food Service Manual', slug: 'bop-p4700-08-food-service-manual', group: 'Federal detention and corrections' },
  { key: 'pbnds12', name: 'ICE PBNDS 2011 Standard 1.2', slug: 'ice-pbnds-2011-environmental-health-safety', group: 'Federal detention and corrections' },
  { key: 'pbnds41', name: 'ICE PBNDS 2011 Standard 4.1', slug: 'ice-pbnds-2011-food-service', group: 'Federal detention and corrections' },
  { key: 'nds11', name: 'ICE NDS 2019 Standard 1.1', slug: 'ice-nds-2019-environmental-health-safety', group: 'Federal detention and corrections' },
  { key: 'nds41', name: 'ICE NDS 2019 Standard 4.1', slug: 'ice-nds-2019-food-service', group: 'Federal detention and corrections' },
  { key: 'usms', name: 'USMS FPBDS Version 12', slug: 'usms-fpbds-v12', group: 'Federal detention and corrections' },
  { key: 'udc', name: 'Utah Correctional Standards (FY27 Secure)', slug: 'utah-udc-correctional-standards', group: 'Utah' },
  { key: 'r392', name: 'Utah R392-100 Food Service Sanitation', slug: 'utah-r392-100-food-service-sanitation', group: 'Utah' },
  { key: 'r687', name: 'Utah R68-7 Pesticide Control', slug: 'utah-r68-7-pesticide-applicator', group: 'Utah' },
  { key: 'slco', name: 'Salt Lake County Health Regulation #34', slug: 'slco-health-regulation-34-correctional-institutions', group: 'Utah' },
  { key: 'grama', name: 'Utah Code 63G-2-301 (GRAMA)', slug: 'utah-grama-correctional-facility-records', group: 'Utah' },
  { key: 'ohio', name: 'Ohio Adm.Code 5120:1-8-05', slug: 'ohio-5120-1-8-05-jail-sanitation', group: 'Other states' },
  { key: 'va', name: 'Virginia 6VAC15-40-1150', slug: 'virginia-6vac15-40-1150-vermin-pest-control', group: 'Other states' }
];

export interface Row {
  id: string;
  auth: string;
  cite: string;
  requirement: string;
  quote: string;
  evidence: string;
  cadence: Cadence[];
  frequency: string;
  owner: string;
  kitchen?: boolean;
  should?: boolean;
}

const NOT_NAMED = 'Not named in the text';

export const ROWS: Row[] = [
  // ---- OSHA 29 CFR 1910.141 ----
  { id: 'osha-exclude', auth: 'osha', cite: '1910.141(a)(5)',
    requirement: 'Build, equip, and maintain every enclosed workplace to keep vermin out and deny them harborage, so far as reasonably practicable.',
    quote: 'so constructed, equipped, and maintained, so far as reasonably practicable, as to prevent the entrance or harborage of rodents, insects, and other vermin',
    evidence: 'Exclusion and structural repair work orders; harborage findings closed out', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'osha-program', auth: 'osha', cite: '1910.141(a)(5)',
    requirement: 'Once vermin are detected, institute a continuing and effective extermination program.',
    quote: 'A continuing and effective extermination program shall be instituted where their presence is detected.',
    evidence: 'Detection record (date, location); program start date; continuing service records; follow-up findings showing effect', cadence: ['detection'], frequency: 'On detection, then continuing', owner: NOT_NAMED },

  // ---- FDA Food Code 2022 ----
  { id: 'fda-free', auth: 'fda', cite: '§6-501.111', kitchen: true,
    requirement: 'Keep the food establishment premises free of insects, rodents, and other pests.',
    quote: 'The PREMISES shall be maintained free of insects, rodents, and other pests.',
    evidence: 'Inspection findings showing no activity, or activity with corrective action', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'fda-receiving', auth: 'fda', cite: '§6-501.111(A)', kitchen: true,
    requirement: 'Routinely inspect incoming shipments of food and supplies.',
    quote: '(A) Routinely inspecting incoming shipments of FOOD and supplies;',
    evidence: 'Receiving logs noting pest checks', cadence: ['delivery'], frequency: 'Routinely; each delivery in practice', owner: NOT_NAMED },
  { id: 'fda-premises', auth: 'fda', cite: '§6-501.111(B)', kitchen: true,
    requirement: 'Routinely inspect the premises for evidence of pests.',
    quote: '(B) Routinely inspecting the PREMISES for evidence of pests;',
    evidence: 'Dated premises inspection logs or monitoring device checks', cadence: ['routine'], frequency: 'Routinely (frequency not set)', owner: NOT_NAMED },
  { id: 'fda-control', auth: 'fda', cite: '§6-501.111(C) (Priority Foundation)', kitchen: true,
    requirement: 'If pests are found, use control methods such as trapping devices or other means of pest control.',
    quote: '(C) Using methods, if pests are found, such as trapping devices or other means of pest control',
    evidence: 'Treatment records: date, method, product, applicator', cadence: ['detection'], frequency: 'When pests are found', owner: NOT_NAMED },
  { id: 'fda-harborage', auth: 'fda', cite: '§6-501.111(D)', kitchen: true,
    requirement: 'Eliminate harborage conditions.',
    quote: '(D) Eliminating harborage conditions.',
    evidence: 'Harborage findings with repair or sanitation work orders', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'fda-ilt', auth: 'fda', cite: '§6-202.13', kitchen: true,
    requirement: 'Insect electrocution or stun devices retain the insects and are not installed over food preparation areas.',
    quote: 'The devices are not located over a FOOD preparation area',
    evidence: 'Device map showing placement; maintenance records', cadence: ['ongoing'], frequency: 'At installation, then ongoing', owner: NOT_NAMED },

  // ---- BOP P1614.01 ----
  { id: 'bop1614-plan', auth: 'bop1614', cite: '§§1.c, 47',
    requirement: 'Keep a written pest control plan that includes pest inspections and pesticide application logs.',
    quote: 'Each institution must develop a written plan for pest control measures.',
    evidence: 'The written pest control plan', cadence: ['policy'], frequency: 'Written plan', owner: 'Each institution' },
  { id: 'bop1614-monthly', auth: 'bop1614', cite: '§47.a',
    requirement: 'Inspect throughout the institution monthly for insects, rodents, or vermin; document it; keep records three years.',
    quote: 'Monthly inspections must be conducted throughout the institution to determine the presence of insects, rodents, or vermin.',
    evidence: 'Monthly inspection records kept in the OSH Department for at least three years', cadence: ['monthly'], frequency: 'Monthly; retain 3 years', owner: 'Occupational Safety and Health Department (keeps the records)' },
  { id: 'bop1614-logs', auth: 'bop1614', cite: '§47.b',
    requirement: 'Log every pesticide application, staff or contractor: date, area, pesticide type, applicator signature. Keep three years.',
    quote: 'A log must be maintained to document any pesticide application, whether applied by in-house personnel or contractors.',
    evidence: 'Pesticide application log', cadence: ['application'], frequency: 'Each application; retain 3 years', owner: 'Occupational Safety and Health Department (keeps the logs)' },
  { id: 'bop1614-rup', auth: 'bop1614', cite: '§47',
    requirement: 'Restricted-use products only by a licensed contractor; SDS on file for every pesticide used.',
    quote: 'must not be used at Bureau facilities unless applied by a licensed contractor',
    evidence: 'Contractor license; SDS file', cadence: ['application'], frequency: 'Each restricted-use application', owner: 'Licensed contractor' },
  { id: 'bop1614-weekly', auth: 'bop1614', cite: '§6.a',
    requirement: 'Institution Duty Officer inspects all areas weekly on form BP-A0506 (fire/safety and sanitation).',
    quote: 'The Institution Duty Officer must inspect all areas of the institution weekly',
    evidence: 'Completed BP-A0506 forms', cadence: ['weekly'], frequency: 'Weekly', owner: 'Institution Duty Officer' },
  { id: 'bop1614-committee', auth: 'bop1614', cite: '§5.a',
    requirement: 'Institution Safety Committee meets quarterly and reviews pest control.',
    quote: 'The committee must meet quarterly.',
    evidence: 'Committee minutes showing pest control reviewed', cadence: ['quarterly'], frequency: 'Quarterly', owner: 'Institution Safety Committee' },

  // ---- BOP P4700.08 ----
  { id: 'bop4700-18a', auth: 'bop4700', cite: 'Ch. 11 §18(a)', kitchen: true,
    requirement: 'Inspect incoming shipments and the department for pests, and report findings to the Safety Department; control if found; eliminate harborage.',
    quote: 'Routinely inspecting the department for evidence of pests and reporting findings to the Safety Department.',
    evidence: 'Food Service pest inspections and the findings reported to Safety', cadence: ['routine'], frequency: 'Routinely (frequency not set)', owner: 'Findings go to the Safety Department' },
  { id: 'bop4700-18c', auth: 'bop4700', cite: 'Ch. 11 §18(c)', kitchen: true,
    requirement: 'Protect outer openings: gaps sealed, windows closed or screened, solid self-closing doors, air curtains where delivery doors stay open.',
    quote: 'If the doors are kept open for deliveries, the openings are protected by air curtains to control flying insects.',
    evidence: 'Exclusion work orders; door and air-curtain condition', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'bop4700-17', auth: 'bop4700', cite: 'Ch. 11 §17(a), (c)', kitchen: true,
    requirement: 'Refuse receptacles insect- and rodent-resistant and cleaned as often as needed to avoid attracting pests.',
    quote: 'cleaned as often as necessary to prevent them from developing soil buildup or attracting insects and rodents',
    evidence: 'Receptacle condition and cleaning records', cadence: ['ongoing'], frequency: 'As often as necessary', owner: NOT_NAMED },

  // ---- ICE PBNDS 2011 Standard 1.2 ----
  { id: 'pbnds12-outcome', auth: 'pbnds12', cite: 'II.12',
    requirement: 'Pests and vermin are controlled and eliminated (expected outcome).',
    quote: 'Pests and vermin shall be controlled and eliminated.',
    evidence: 'Inspection findings and corrective actions', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'pbnds12-contract', auth: 'pbnds12', cite: 'V.A.4',
    requirement: 'Contract licensed pest-control professionals for monthly inspections to identify and eradicate rodents, insects, and other vermin.',
    quote: 'The facility administrator shall contract with licensed pest-control professionals to perform monthly inspections to identify and eradicate rodents, insects and other vermin.',
    evidence: 'The contract; provider license; monthly inspection reports', cadence: ['contract', 'monthly'], frequency: 'Monthly, under contract', owner: 'Facility administrator' },
  { id: 'pbnds12-callbacks', auth: 'pbnds12', cite: 'V.A.4',
    requirement: 'The contract includes a preventive spraying program for indigenous insects and callback services as necessary.',
    quote: 'The contract shall include a preventive spraying program for indigenous insects and a provision for callback services as necessary.',
    evidence: 'Contract scope; callback records', cadence: ['contract'], frequency: 'In the contract; callbacks as needed', owner: 'Facility administrator' },
  { id: 'pbnds12-doors', auth: 'pbnds12', cite: 'V.A.4', should: true,
    requirement: 'Tight-fitting exterior doors with door sweeps (written as "should").',
    quote: 'Doors to the outside should be tight fitting and door sweeps should be installed to prevent the entry of vermin from outside.',
    evidence: 'Door and sweep condition records; work orders', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'pbnds12-custody', auth: 'pbnds12', cite: 'V.B.10(g)',
    requirement: 'Maintenance supervisor purchases, stores in a locked area, and dispenses all pesticides; EPA-unapproved pesticides prohibited.',
    quote: 'The maintenance supervisor is responsible for purchasing, storing (in a locked area) and dispensing all pesticides used in the facility.',
    evidence: 'Pesticide purchasing, locked-storage, and dispensing log', cadence: ['ongoing'], frequency: 'Ongoing', owner: 'Maintenance supervisor' },
  { id: 'pbnds12-herbicide', auth: 'pbnds12', cite: 'V.B.10(h)',
    requirement: 'Staff responsible for herbicides hold a current state license as a certified private applicator.',
    quote: 'must hold a current state license as a certified private applicator',
    evidence: 'Current applicator license on file', cadence: ['contract'], frequency: 'Current at all times', owner: 'Maintenance supervisor or other responsible staff' },

  // ---- ICE PBNDS 2011 Standard 4.1 ----
  { id: 'pbnds41-fsa', auth: 'pbnds41', cite: 'V.J.10', kitchen: true,
    requirement: 'The Food Service Administrator is responsible for food service pest control, including contracting an outside exterminator as necessary.',
    quote: 'The FSA is responsible for pest control in the food service department, including contracting the services of an outside exterminator as necessary.',
    evidence: 'Designated FSA; exterminator contract if used', cadence: ['ongoing'], frequency: 'Ongoing', owner: 'Food Service Administrator' },
  { id: 'pbnds41-aircurtain', auth: 'pbnds41', cite: 'V.J.10', kitchen: true,
    requirement: 'Air curtains or comparable devices on outside doors where food is prepared, stored, or served.',
    quote: 'air curtains or comparable devices shall be used on outside doors where food is prepared, stored or served',
    evidence: 'Air curtain inventory and function checks', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'pbnds41-premises', auth: 'pbnds41', cite: 'V.J.5(k)', kitchen: true,
    requirement: 'Maintain premises so insects and rodents cannot feed or nest; protect outside openings.',
    quote: 'The premises shall be maintained in a condition that prevents the feeding or nesting of insects and rodents.',
    evidence: 'Sanitation and exclusion findings with work orders', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'pbnds41-refuse', auth: 'pbnds41', cite: 'V.J.5(j)', kitchen: true,
    requirement: 'Refuse containers covered, insect- and rodent-proof, and frequently cleaned.',
    quote: 'Garbage/refuse containers shall have sufficient capacity for the volume and shall be kept covered, insect- and rodent-proof and frequently cleaned.',
    evidence: 'Container condition and cleaning records', cadence: ['ongoing'], frequency: 'Frequently', owner: NOT_NAMED },
  { id: 'pbnds41-receiving', auth: 'pbnds41', cite: 'V.K.3(a)', kitchen: true,
    requirement: 'Inspect every incoming shipment for pest infestation, including the middle of the pallet.',
    quote: 'Inspect the incoming shipment for damage, contamination and pest infestation.',
    evidence: 'Receiving logs noting pest checks', cadence: ['delivery'], frequency: 'Each delivery', owner: NOT_NAMED },
  { id: 'pbnds41-shelving', auth: 'pbnds41', cite: 'V.K.3(d)', kitchen: true,
    requirement: 'Store food at least six inches off the floor and away from walls for pest control.',
    quote: 'Store all food item products at least six inches from the floor and sufficiently far from walls to facilitate pest-control measures.',
    evidence: 'Storage layout; inspection notes', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'pbnds41-drystore', auth: 'pbnds41', cite: 'V.K.7(b)–(c)', kitchen: true,
    requirement: 'Seal dry storeroom wall, ceiling, and floor openings; keep the room free from rodents and vermin.',
    quote: 'sealing or otherwise making impenetrable all wall, ceiling and floor openings to prevent entry of dirt, water, pests, etc.;',
    evidence: 'Dry storeroom inspections; sealing work orders', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },

  // ---- ICE NDS 2019 Standard 1.1 ----
  { id: 'nds11-conditions', auth: 'nds11', cite: 'II.E',
    requirement: 'Control and eliminate pests and vermin and the conditions that give them food, shelter, breeding sites, or harborage.',
    quote: 'Conditions which provide food, shelter, a medium for breeding, or harborage will be controlled and eliminated.',
    evidence: 'Inspection findings; conducive-condition work orders', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'nds11-notify', auth: 'nds11', cite: 'II.E',
    requirement: 'Notify ICE/ERO immediately in the event of insect or rodent infestation.',
    quote: 'The facility shall immediately notify ICE/ERO in the event of insect or rodent infestation.',
    evidence: 'Dated notification to ICE/ERO', cadence: ['detection'], frequency: 'Immediately on infestation', owner: 'The facility' },
  { id: 'nds11-lice', auth: 'nds11', cite: 'II.H.1.e',
    requirement: 'A detainee infested with head lice is not served in barber operations and is reported to the medical authority.',
    quote: 'No person will be served when infested with head lice but will be reported to the medical authority for appropriate care and treatment.',
    evidence: 'Barber log; medical referral', cadence: ['detection'], frequency: 'Each case', owner: 'Barber operations; medical authority' },

  // ---- ICE NDS 2019 Standard 4.1 ----
  { id: 'nds41-facility', auth: 'nds41', cite: 'II.I.8', kitchen: true,
    requirement: 'The facility is responsible for pest control in the food service department.',
    quote: 'The facility is responsible for pest control in the food service department.',
    evidence: 'Food service pest control service records', cadence: ['ongoing'], frequency: 'Ongoing', owner: 'The facility' },
  { id: 'nds41-foodcode', auth: 'nds41', cite: 'II.E.2', kitchen: true,
    requirement: 'Prepare and serve food in compliance with the most recent FDA food code and/or applicable local standards.',
    quote: 'Food shall be prepared and served in compliance with the most recent version of the FDA food code and/or applicable local standards.',
    evidence: 'Food Code inspection results', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'nds41-receiving', auth: 'nds41', cite: 'II.J.2(a)', kitchen: true,
    requirement: 'Inspect every incoming shipment for pest infestation.',
    quote: 'Inspect the incoming shipment for damage, contamination, and pest infestation.',
    evidence: 'Receiving logs noting pest checks', cadence: ['delivery'], frequency: 'Each delivery', owner: NOT_NAMED },
  { id: 'nds41-refuse', auth: 'nds41', cite: 'II.I.5(j)', kitchen: true,
    requirement: 'Refuse containers covered, cleaned frequently, and insect and rodent proof.',
    quote: 'The garbage/refuse containers shall have sufficient capacity for the volume, and shall be kept covered, cleaned frequently, and insect and rodent proof.',
    evidence: 'Container condition and cleaning records', cadence: ['ongoing'], frequency: 'Frequently', owner: NOT_NAMED },

  // ---- USMS FPBDS Version 12 ----
  { id: 'usms-f24', auth: 'usms', cite: 'F.2.4',
    requirement: 'Control vermin and pests through monthly inspections and treatment by a qualified pest control technician.',
    quote: 'Vermin and pests are controlled through monthly inspections and treatment by a qualified pest control technician.',
    evidence: 'Monthly inspection and treatment records; technician qualification', cadence: ['monthly'], frequency: 'Monthly', owner: 'Qualified pest control technician' },
  { id: 'usms-f22', auth: 'usms', cite: 'F.2.2',
    requirement: 'Weekly sanitation inspection of all areas; monthly safety/sanitation specialist inspection; annual health inspection, with independent proof past deficiencies were corrected.',
    quote: 'F.2.2.a Weekly Sanitation inspection of all facility areas by a qualified department staff member;',
    evidence: 'Weekly, monthly, and annual inspection records; independent correction documentation', cadence: ['weekly', 'monthly', 'annual'], frequency: 'Weekly, monthly, annually', owner: 'Qualified staff; safety/sanitation specialist; health officials' },
  { id: 'usms-f23', auth: 'usms', cite: 'F.2.3',
    requirement: 'Report non-compliance found in sanitation inspections and implement corrective action.',
    quote: 'Areas of non-compliance identified during sanitation inspections are reported and corrective action measures are implemented.',
    evidence: 'Deficiency reports with corrective actions', cadence: ['detection'], frequency: 'Each finding', owner: NOT_NAMED },
  { id: 'usms-d12', auth: 'usms', cite: 'D.1.2', kitchen: true,
    requirement: 'Food Service Administrator or designee inspects all food service areas daily.',
    quote: 'The Food Service Administrator or designee conducts daily inspections of all food service areas',
    evidence: 'Daily food service inspection records', cadence: ['daily'], frequency: 'Daily', owner: 'Food Service Administrator or designee' },
  { id: 'usms-d13', auth: 'usms', cite: 'D.1.3', kitchen: true,
    requirement: 'An independent, outside source reviews food service against governmental health and safety codes; corrective action documented.',
    quote: "The facility's food service operation is reviewed by an independent, outside source",
    evidence: 'Independent review report; corrective actions', cadence: ['routine'], frequency: 'Frequency not stated', owner: 'Independent, outside source' },

  // ---- Utah Correctional Standards (UDC) ----
  { id: 'udc-e03', auth: 'udc', cite: 'E-03',
    requirement: 'Documented facility inspections at least weekly, with pest/vermin control among the areas of interest.',
    quote: 'documented facility inspections to be conducted at a minimum of weekly',
    evidence: 'Weekly inspection records noting pest/vermin findings', cadence: ['policy', 'weekly'], frequency: 'Weekly, under a written policy', owner: 'The facility' },
  { id: 'udc-e03b', auth: 'udc', cite: 'E-03(B)',
    requirement: 'Remove inmates from areas where pests or vermin create a risk of illness.',
    quote: 'Pest/Vermin control: facility shall remove inmates from areas if there is a risk of illness.',
    evidence: 'Record of any relocation and the finding behind it', cadence: ['detection'], frequency: 'When risk exists', owner: 'The facility' },
  { id: 'udc-g04', auth: 'udc', cite: 'G-04', kitchen: true,
    requirement: 'Weekly health, safety, and sanitation inspections of food service; records and corrective actions kept at the facility.',
    quote: 'weekly health, safety, and sanitation inspections by the correctional facility administrator or designee and food service manager',
    evidence: 'Weekly food service inspection records and corrective actions', cadence: ['weekly'], frequency: 'Weekly', owner: 'Administrator or designee and food service manager' },
  { id: 'udc-g05', auth: 'udc', cite: 'G-05', kitchen: true,
    requirement: 'The health inspector having jurisdiction inspects the food service area at least once a year; the facility keeps the records and actions taken.',
    quote: 'shall conduct an inspection of the food service area of the facility at least once a year',
    evidence: 'Annual health inspection report; actions taken', cadence: ['annual'], frequency: 'At least annually', owner: 'Health inspector (inspects); facility (keeps records)' },
  { id: 'udc-i01f', auth: 'udc', cite: 'I-01(F)',
    requirement: 'Written policy and procedures to control vermin in inmates\' personal clothing; infested clothing cleaned, disinfected, or stored closed.',
    quote: 'Infested clothing shall be cleaned, disinfected, or stored in a closed container',
    evidence: 'The written policy; laundry records of infested items', cadence: ['policy', 'detection'], frequency: 'Written policy; each case', owner: 'Facility administrator' },
  { id: 'udc-monthly', auth: 'udc', cite: 'Introduction',
    requirement: 'The Department of Corrections inspects facilities monthly for compliance with the standards.',
    quote: 'Regularly scheduled inspections of facilities will be conducted monthly.',
    evidence: 'Proof of compliance ready for the UDC inspector', cadence: ['monthly'], frequency: 'Monthly (UDC)', owner: 'Utah Department of Corrections' },

  // ---- Utah R392-100 ----
  { id: 'r392-foodcode', auth: 'r392', cite: 'R392-100-4(1)(b)', kitchen: true,
    requirement: 'Utah adopts the 2022 FDA Food Code, including §6-501.111, for food service; jails and prisons are not on the exemption list.',
    quote: 'the 2022 version of the U.S. Food and Drug Administration Food Code (Food Code), Chapters 1 through 8',
    evidence: 'Local health department inspection reports for the kitchen', cadence: ['ongoing'], frequency: 'Ongoing; per health department inspection', owner: NOT_NAMED },

  // ---- Utah R68-7 ----
  { id: 'r687-license', auth: 'r687', cite: 'R68-7-7(7), R68-7-9',
    requirement: 'Contracted providers hold a Utah commercial applicator license in the categories the work needs; Category 7 names prisons.',
    quote: 'food-processing facility; prison; manufacturing facility',
    evidence: 'License verification in the contractor file (categories 7, 12, 15 as the work requires)', cadence: ['contract'], frequency: 'At award and each renewal', owner: 'Commercial applicator (holds the license)' },
  { id: 'r687-records', auth: 'r687', cite: 'R68-7-11(11)',
    requirement: 'Every commercial application recorded within 24 hours with the nine required elements; kept at least two years.',
    quote: 'These records shall be recorded within 24 hours after the pesticide application is made.',
    evidence: 'Service tickets carrying all nine elements', cadence: ['application'], frequency: 'Each application; retain 2 years', owner: 'Commercial applicator' },
  { id: 'r687-rup', auth: 'r687', cite: 'R68-7-12(1)(a)',
    requirement: 'Staff applying restricted use pesticides for a government entity need a non-commercial applicator license.',
    quote: 'A non-commercial pesticide applicator license is required for applying restricted use pesticides for a city, county, state, or federal government entity',
    evidence: 'Staff applicator licenses', cadence: ['application'], frequency: 'Before any restricted use application', owner: 'The applicator' },

  // ---- Salt Lake County Health Regulation #34 ----
  { id: 'slco-measures', auth: 'slco', cite: '4.4.8(i)',
    requirement: 'Effective measures against rodents, flies, cockroaches, bedbugs, lice, and other insects; premises free from harborage.',
    quote: 'Effective measures to minimize the presence of rodents, flies, cockroaches, bedbugs, lice, and other insects on the premises shall be utilized.',
    evidence: 'Service records; harborage findings closed out', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'slco-openings', auth: 'slco', cite: '4.4.8(ii)',
    requirement: 'Every exterior opening has an effective, tight-fitting barrier kept in good repair.',
    quote: 'All exterior openings shall have an effective barrier to prevent insect and rodent entry.',
    evidence: 'Exclusion work orders; door and screen condition', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'slco-label', auth: 'slco', cite: '4.4.8(iii), 4.5.5(iii)',
    requirement: 'Apply pesticides only by label directions; store them in a dedicated room or cabinet.',
    quote: "All pesticides shall be applied according to manufacturer's labeled directions.",
    evidence: 'Labels and application records; storage location', cadence: ['application'], frequency: 'Each application', owner: NOT_NAMED },
  { id: 'slco-waste', auth: 'slco', cite: '4.4.7',
    requirement: 'Insect- and rodent-resistant waste containers, cleaned to minimize attraction.',
    quote: 'Containers shall be cleaned at a frequency to minimize insect and rodent attraction.',
    evidence: 'Container condition and cleaning records', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'slco-annual', auth: 'slco', cite: '6.1, 6.4',
    requirement: 'The health department inspects at least annually and records findings on an inspection report form.',
    quote: 'An inspection of a correctional institution shall be performed at least annually by the Director.',
    evidence: 'Annual health department inspection report', cadence: ['annual'], frequency: 'At least annually', owner: 'Health department Director' },

  // ---- Utah GRAMA ----
  { id: 'grama-public', auth: 'grama', cite: '63G-2-301(3)(d), (3)(u)',
    requirement: 'Contracts, contractor service records, correctional standards, and inspection results are normally public records.',
    quote: "records that disclose the results of an audit or other inspection assessing a correctional facility's compliance",
    evidence: 'Records organized so a request can be answered', cadence: ['request'], frequency: 'On request', owner: 'The governmental entity' },

  // ---- Ohio ----
  { id: 'ohio-weekly', auth: 'ohio', cite: '5120:1-8-05(B)',
    requirement: 'Weekly sanitation inspections by a designated staff person.',
    quote: 'Weekly sanitation inspections will be completed by a designated staff person to ensure compliance with housekeeping responsibilities.',
    evidence: 'Weekly sanitation inspection records', cadence: ['weekly'], frequency: 'Weekly', owner: 'Designated staff person' },
  { id: 'ohio-monthly', auth: 'ohio', cite: '5120:1-8-05(C)',
    requirement: 'Monthly sanitation, vermin, and safety inspections of all areas by a designated trained staff person.',
    quote: 'Monthly sanitation, vermin and safety inspections of all areas will be conducted by a designated trained staff person.',
    evidence: 'Monthly inspection records; inspector training', cadence: ['monthly'], frequency: 'Monthly', owner: 'Designated trained staff person' },
  { id: 'ohio-annual', auth: 'ohio', cite: '5120:1-8-05(E)',
    requirement: 'Annual inspection by local or state health authorities with a written report and a written corrective plan.',
    quote: 'The jail will be inspected annually by local or state health authorities and a written report will be provided.',
    evidence: 'Annual health inspection report; corrective plan', cadence: ['annual'], frequency: 'Annually', owner: 'Local or state health authorities' },

  // ---- Virginia ----
  { id: 'va-quarterly', auth: 'va', cite: '6VAC15-40-1150',
    requirement: 'Control vermin and pests; service at least quarterly by a licensed pest control business or VDACS-certified personnel.',
    quote: 'The facility shall control vermin and pests and shall be serviced at least quarterly by a licensed pest control business or personnel certified by the Virginia Department of Agriculture and Consumer Services.',
    evidence: 'Quarterly service records; provider license or certification', cadence: ['quarterly'], frequency: 'At least quarterly', owner: 'Licensed pest control business or certified personnel' }
];
