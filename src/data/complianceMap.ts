/**
 * Healthcare Pest Compliance Map — data.
 *
 * Every `quote` is verbatim from the page it links to on this reference, and those
 * pages' quotations were verified against their primary sources (five-batch program,
 * September 2026). Checked by ~/corrections-pest-reference-sources/verify_hpr_map.py.
 * `requirement`, `evidence`, and `owner` are plain-language restatements; `owner`
 * names a person or body only where the text names one. Nothing here is a compliance
 * determination.
 */

export type Cadence =
  | 'delivery' | 'application' | 'daily' | 'weekly' | 'monthly' | 'quarterly'
  | 'annual' | 'detection' | 'ongoing' | 'routine' | 'policy' | 'contract' | 'survey';

export const CADENCE_LABELS: Record<Cadence, string> = {
  delivery: 'Each delivery',
  application: 'Each pesticide application',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annual: 'Annually',
  detection: 'When pests are found or a citation issues',
  ongoing: 'Ongoing condition',
  routine: 'Routinely (no frequency set)',
  policy: 'Written plan or policy',
  contract: 'In the pest control contract',
  survey: 'At every survey'
};

export const CADENCE_ORDER: Cadence[] = [
  'policy', 'contract', 'delivery', 'application', 'daily', 'weekly', 'monthly',
  'quarterly', 'annual', 'survey', 'detection', 'routine', 'ongoing'
];

export interface Authority {
  key: string;
  name: string;
  path: string;
  group: 'CMS' | 'Federal' | 'Accreditors' | 'Utah' | 'Guidance';
}

export const AUTHORITIES: Authority[] = [
  { key: 'f925', name: 'CMS F925, 42 CFR §483.90(i)(4) (nursing homes)', path: '/deficiencies/f925/', group: 'CMS' },
  { key: 'f925poc', name: 'Plan of Correction for an F925 citation', path: '/deficiencies/f925-plan-of-correction/', group: 'CMS' },
  { key: 'a0701', name: 'CMS A-0701, §482.41(a) Buildings (hospitals)', path: '/deficiencies/a-0701-buildings/', group: 'CMS' },
  { key: 'a0750', name: 'CMS A-0750, §482.42(a)(3) Sanitary Environment (hospitals)', path: '/deficiencies/a-0750-sanitary-environment/', group: 'CMS' },
  { key: 'p485', name: '42 CFR §485.725(e) Pest Control (outpatient therapy organizations)', path: '/authorities/485-725e-pest-control/', group: 'CMS' },
  { key: 'vha', name: 'VHA Directive 1850.02 (VA medical facilities)', path: '/authorities/vha-directive-1850-02/', group: 'Federal' },
  { key: 'fda', name: 'FDA Food Code 2022', path: '/authorities/fda-food-code-2022/', group: 'Federal' },
  { key: 'hazcom', name: 'OSHA Hazard Communication', path: '/authorities/osha-hazard-communication/', group: 'Federal' },
  { key: 'tjc', name: 'The Joint Commission 2026 Physical Environment', path: '/authorities/joint-commission-2026-pe-chapter/', group: 'Accreditors' },
  { key: 'dnv', name: 'DNV NIAHO', path: '/authorities/dnv-gl-niaho-standards/', group: 'Accreditors' },
  { key: 'r432', name: 'Utah R432-100 General Hospital Standards', path: '/authorities/utah-r432-100-hospital-licensure/', group: 'Utah' },
  { key: 'r687', name: 'Utah R68-7 Pesticide Control', path: '/authorities/utah-r68-7-pesticide-applicator/', group: 'Utah' },
  { key: 'hicpac', name: 'CDC/HICPAC Environmental Infection Control Guidelines', path: '/authorities/cdc-hicpac-environmental-guidelines/', group: 'Guidance' },
  { key: 'epa', name: 'EPA IPM in Health Care Facilities (2021)', path: '/authorities/epa-ipm-toolkit-2021/', group: 'Guidance' }
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
}

const NOT_NAMED = 'Not named in the text';

export const ROWS: Row[] = [
  // ---- F925 (nursing homes) ----
  { id: 'f925-program', auth: 'f925', cite: '§483.90(i)(4)',
    requirement: 'Maintain an effective pest control program so the facility is free of pests and rodents.',
    quote: 'Maintain an effective pest control program so that the facility is free of pests and rodents.',
    evidence: 'The written pest control program; service records showing it operates', cadence: ['policy', 'ongoing'], frequency: 'Ongoing', owner: 'The facility' },
  { id: 'f925-define', auth: 'f925', cite: 'Guidance §483.90(i)(4)',
    requirement: 'The program must eradicate and contain common household pests, including bed bugs, lice, roaches, ants, mosquitoes, flies, mice, and rats.',
    quote: 'An "effective pest control program" is defined as measures to eradicate and contain common household pests (e.g., bed bugs, lice, roaches, ants, mosquitoes, flies, mice, and rats).',
    evidence: 'Program scope naming each pest group; containment and eradication records', cadence: ['policy'], frequency: 'Program scope', owner: 'The facility' },
  { id: 'f925-survey', auth: 'f925', cite: 'Procedures §483.90(i)(4)',
    requirement: 'Surveyors look for signs of vermin throughout the facility; evidence of infestation in a particular space indicates noncompliance.',
    quote: 'As part of the overall review of the facility, look for signs of vermin. Evidence of pest infestation in a particular space is an indicator of noncompliance.',
    evidence: 'Facility-wide inspection records by area; corrective actions closed before survey', cadence: ['survey'], frequency: 'At every survey', owner: 'Surveyor (inspects)' },
  { id: 'f925-probe', auth: 'f925', cite: 'Probes §483.90(i)(4)',
    requirement: 'Surveyors ask staff, residents, and representatives whether they have seen pests.',
    quote: 'Ask staff, residents and their representatives if they have observed any pests/vermin?',
    evidence: 'Pest sighting log with the response to each report; staff reporting procedure', cadence: ['survey', 'detection'], frequency: 'At every survey; each sighting', owner: 'Surveyor (asks)' },
  { id: 'f812-storage', auth: 'f925', cite: 'F812 Procedures (routes to F925)', kitchen: true,
    requirement: 'Surveyors look for pests, rodents, and droppings in food storage areas.',
    quote: 'Look for evidence of pests, rodents and droppings and other sources of contamination in food storage areas;',
    evidence: 'Food storage inspection records; receiving checks', cadence: ['survey', 'routine'], frequency: 'At every survey', owner: 'Surveyor (inspects)' },
  { id: 'f812-route', auth: 'f925', cite: 'F812 Potential tags: F925', kitchen: true,
    requirement: 'Kitchen pest evidence (larvae, roaches, ants, flies, mice) in storage, preparation, or service areas is investigated under F925.',
    quote: 'Determine whether there is evidence of insect larvae, roaches, ants, flies, mice, etc. in food storage, preparation and service areas.',
    evidence: 'Kitchen pest findings and corrective actions', cadence: ['survey'], frequency: 'At every survey', owner: 'Surveyor (inspects)' },
  { id: 'f812-chem', auth: 'f925', cite: 'F812 Guidance, chemical contamination', kitchen: true,
    requirement: 'Chemical products, including insecticides, are clearly marked and stored separately from food.',
    quote: 'Chemical products and supplies, must be clearly marked as such and stored separately from food items.',
    evidence: 'Chemical storage location and labels', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'f814-garbage', auth: 'f925', cite: 'F814 Probes', kitchen: true,
    requirement: 'Garbage storage is kept sanitary to prevent pest harborage and feeding.',
    quote: 'Is the garbage storage area maintained in a sanitary condition to prevent the harborage and feeding of pests?',
    evidence: 'Refuse area inspection and cleaning records', cadence: ['survey', 'ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },

  // ---- F925 plan of correction ----
  { id: 'ltc-poc-10', auth: 'f925poc', cite: 'Appendix PP, plan of correction',
    requirement: 'After a citation, a written plan of correction is due to the survey agency within 10 calendar days.',
    quote: 'Inform the facility that a written plan of correction must be submitted to the survey agency within 10 calendar days following receipt of the written statement of deficiencies.',
    evidence: 'The submitted plan of correction and its date', cadence: ['detection'], frequency: 'Within 10 calendar days of a citation', owner: 'The facility' },
  { id: 'ltc-poc-monitor', auth: 'f925poc', cite: 'Appendix PP, plan of correction elements',
    requirement: 'The plan must say how the facility will monitor its performance so the correction is sustained.',
    quote: 'Indicate how the facility plans to monitor its performance to make sure that solutions are sustained; and',
    evidence: 'Monitoring records after the correction date', cadence: ['detection', 'routine'], frequency: 'After a citation, until sustained', owner: 'The facility' },

  // ---- Hospitals (CMS) ----
  { id: 'a0701-plant', auth: 'a0701', cite: '§482.41(a)',
    requirement: 'The physical plant and hospital environment are maintained so patient safety and well-being are assured.',
    quote: 'The condition of the physical plant and the overall hospital environment must be developed and maintained in such a manner that the safety and well-being of patients are assured.',
    evidence: 'Maintenance and exclusion work orders; pest findings closed out', cadence: ['ongoing'], frequency: 'Ongoing', owner: 'The hospital' },
  { id: 'a0701-survey', auth: 'a0701', cite: 'Survey Procedures §482.41(a)',
    requirement: 'Surveyors review routine and preventive maintenance schedules and whether repairs are completed.',
    quote: "Review the hospital's routine and preventive maintenance schedules to determine that ongoing maintenance inspections are performed and that necessary repairs are completed.",
    evidence: 'Preventive maintenance schedule including pest exclusion; completed repair records', cadence: ['survey'], frequency: 'At every survey', owner: 'Surveyor (reviews)' },
  { id: 'a0701-poc', auth: 'a0701', cite: 'Plan of correction',
    requirement: 'After a citation, a written plan of correction is due to the survey agency within 10 calendar days.',
    quote: 'Inform the facility that a written plan of correction must be submitted to the survey agency within 10 calendar days following receipt of the written statement of deficiencies.',
    evidence: 'The submitted plan of correction and its date', cadence: ['detection'], frequency: 'Within 10 calendar days of a citation', owner: 'The hospital' },
  { id: 'a0750-sanitary', auth: 'a0750', cite: '§482.42(a)(3) Interpretive Guidelines',
    requirement: 'The hospital provides and maintains a clean and sanitary environment to avoid sources and transmission of infection.',
    quote: 'The hospital must provide and maintain a clean and sanitary environment to avoid sources and transmission of infections and communicable diseases.',
    evidence: 'Infection prevention environmental rounds including pest findings', cadence: ['ongoing'], frequency: 'Ongoing', owner: 'The hospital' },
  { id: 'a0750-survey', auth: 'a0750', cite: 'Survey Procedures §482.42(a)(3)',
    requirement: 'Surveyors observe the sanitary condition of care environments, including food service, mechanical rooms, surgical areas, and storage.',
    quote: 'Observe the hospital for the sanitary condition of their environments of care, noting the cleanliness of patient rooms, floors, horizontal surfaces, patient equipment, air inlets, mechanical rooms, food service activities',
    evidence: 'Area-by-area inspection records', cadence: ['survey'], frequency: 'At every survey', owner: 'Surveyor (observes)' },

  // ---- §485.725(e) ----
  { id: 'p485-e', auth: 'p485', cite: '§485.725(e)',
    requirement: 'Premises are kept free from insects and rodents through operation of a pest-control program.',
    quote: "The organization's premises are maintained free from insects and rodents through operation of a pest-control program.",
    evidence: 'The pest-control program and its service records', cadence: ['policy', 'ongoing'], frequency: 'Ongoing', owner: 'The organization' },

  // ---- VHA Directive 1850.02 ----
  { id: 'vha-ipmop', auth: 'vha', cite: 'IPMOP requirement',
    requirement: 'Every VA medical facility has an Integrated Pest Management Operations Plan, whether served in-house, by contract, or both.',
    quote: 'An IPMOP is required at all VA medical facilities, regardless of whether the VA medical facility is serviced by a VA medical facility PMP, a pest management contract or both.',
    evidence: 'The IPMOP document', cadence: ['policy'], frequency: 'Written plan', owner: 'VA medical facility' },
  { id: 'vha-pmo', auth: 'vha', cite: 'Responsibilities',
    requirement: 'A Pest Management Officer is designated in writing to oversee the IPMOP, in-house and contract operations.',
    quote: 'Designating in writing a VA medical facility PMO to oversee all aspects of the IPMOP, including in-house and contract operations.',
    evidence: 'The written PMO designation', cadence: ['policy'], frequency: 'Standing designation', owner: 'VA medical facility leadership' },
  { id: 'vha-annual', auth: 'vha', cite: 'IPMOP review',
    requirement: 'The IPMOP is reviewed annually by the Pest Management Officer.',
    quote: 'The IPMOP must be reviewed annually by the VA medical facility PMO.',
    evidence: 'Dated annual IPMOP review', cadence: ['annual'], frequency: 'Annually', owner: 'Pest Management Officer' },
  { id: 'vha-48h', auth: 'vha', cite: 'Responsibilities',
    requirement: 'Pest sightings are addressed within 48 hours, with the corrective action reported back and logged.',
    quote: 'Ensuring that pest management issues such as pest sightings are addressed within 48 hours',
    evidence: 'IPMOP pest management log with sighting, response time, and corrective action', cadence: ['detection'], frequency: 'Within 48 hours of each sighting', owner: 'Pest Management Officer' },
  { id: 'vha-quarterly', auth: 'vha', cite: 'Responsibilities',
    requirement: 'All pest management documentation and records are reviewed at least quarterly, with trends tracked.',
    quote: 'Reviewing all pest management activity documentation and records at least quarterly and tracking trends',
    evidence: 'Quarterly review record with trend summary', cadence: ['quarterly'], frequency: 'At least quarterly', owner: 'Pest Management Officer' },
  { id: 'vha-approval', auth: 'vha', cite: 'Responsibilities',
    requirement: 'Every pesticide application in patient care or restricted areas (OR, SPS) has prior PMO approval.',
    quote: 'Providing prior approval on the application of all pesticides by VA medical facility PMPs or contractors in any patient care or restricted areas',
    evidence: 'Prior-approval record for each application in those areas', cadence: ['application'], frequency: 'Before each such application', owner: 'Pest Management Officer' },
  { id: 'vha-contract-records', auth: 'vha', cite: 'Contract scope of work',
    requirement: 'The contract requires recordkeeping of inspection reports, sightings, applications, and follow-up.',
    quote: 'Maintaining required recordkeeping, including but not limited to inspection reports, pest sightings, pesticide application and follow-up activities.',
    evidence: 'Contractor inspection reports, sighting responses, application records, follow-ups', cadence: ['contract'], frequency: 'In the contract; each visit', owner: 'Contractor' },
  { id: 'vha-coverage', auth: 'vha', cite: 'Contract scope of work',
    requirement: 'The contract provides 24/7 coverage, including outpatient sites not covered by leases.',
    quote: "Ensuring 24/7 coverage of the VA medical facility's pest management activities",
    evidence: 'Contract coverage clause; after-hours response records', cadence: ['contract'], frequency: 'In the contract', owner: 'Contractor' },
  { id: 'vha-24d', auth: 'vha', cite: 'Contract scope of work',
    requirement: 'The statement of work discloses the VHA ban on 2,4-D.',
    quote: 'Ensuring that the contract statement of work discloses the VHA ban on the use of the selective herbicide 2,4-Dichlorophenoxyacetic Acid (2,4-D).',
    evidence: 'The clause in the statement of work', cadence: ['contract'], frequency: 'In the contract', owner: NOT_NAMED },

  // ---- FDA Food Code ----
  { id: 'fda-free', auth: 'fda', cite: '§6-501.111', kitchen: true,
    requirement: 'Keep the food establishment premises free of insects, rodents, and other pests.',
    quote: 'The PREMISES shall be maintained free of insects, rodents, and other pests.',
    evidence: 'Inspection findings with corrective actions', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
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
    requirement: 'Insect control devices are not installed over food preparation areas.',
    quote: '(1) The devices are not located over a FOOD preparation area; and',
    evidence: 'Device map showing placement', cadence: ['ongoing'], frequency: 'At installation, then ongoing', owner: NOT_NAMED },

  // ---- OSHA HazCom ----
  { id: 'hazcom-sds', auth: 'hazcom', cite: '29 CFR 1910.1200(g)(8)',
    requirement: 'Safety data sheets for every stored or used pesticide are readily accessible to employees during each shift.',
    quote: 'shall ensure that they are readily accessible during each work shift to employees when they are in their work area(s)',
    evidence: 'SDS binder or electronic access covering every pesticide on site', cadence: ['ongoing'], frequency: 'Every shift', owner: 'The employer' },

  // ---- Utah ----
  { id: 'r432-program', auth: 'r432', cite: 'R432-100 maintenance',
    requirement: 'The licensee conducts a pest-control program so the hospital is free from any vermin or rodent.',
    quote: 'The licensee shall ensure a pest-control program is conducted to ensure the hospital is free from any vermin or rodent.',
    evidence: 'The pest-control program and service records', cadence: ['policy', 'ongoing'], frequency: 'Ongoing', owner: 'The licensee' },
  { id: 'r687-records', auth: 'r687', cite: 'R68-7-11(11)',
    requirement: 'Every commercial application recorded within 24 hours with the nine required elements; kept at least two years.',
    quote: 'These records shall be recorded within 24 hours after the pesticide application is made.',
    evidence: 'Service tickets carrying all nine elements', cadence: ['application'], frequency: 'Each application; retain 2 years', owner: 'Commercial applicator' },
  { id: 'r687-category', auth: 'r687', cite: 'R68-7-7(7)',
    requirement: 'Contracted applicators hold Category 7, whose definition names medical institutions.',
    quote: 'dwelling, educational institution, or medical institution',
    evidence: 'License verification in the contractor file', cadence: ['contract'], frequency: 'At award and each renewal', owner: 'Commercial applicator (holds the license)' },
  { id: 'r687-airblast', auth: 'r687', cite: 'R68-7-19(8)',
    requirement: 'No aircraft or air-blast application to property next to occupied hospitals or nursing homes where contamination may result.',
    quote: 'No pesticides shall be applied by aircraft or air blast sprayers to property abutting or adjacent to schools in session, hospitals, nursing homes',
    evidence: 'Exterior and grounds application records', cadence: ['application'], frequency: 'Each exterior application', owner: NOT_NAMED },

  // ---- Guidance ----
  { id: 'hicpac-strategy', auth: 'hicpac', cite: 'Recommendation (pest control)',
    requirement: 'Pest-control strategies emphasize kitchens, cafeterias, laundries, central sterile supply, operating rooms, loading docks, and construction.',
    quote: 'Develop pest-control strategies, with emphasis on kitchens, cafeterias, laundries, central sterile supply areas, operating rooms, loading docks, construction activities, and other areas prone to infestations.',
    evidence: 'Written strategy naming those areas; service scope covering them', cadence: ['policy'], frequency: 'Written strategy', owner: NOT_NAMED },
  { id: 'hicpac-screens', auth: 'hicpac', cite: 'Recommendation (pest control)',
    requirement: 'Screens on every window that opens to the outside, kept in good repair.',
    quote: 'Install screens on all windows that open to the outside; keep screens in good repair.',
    evidence: 'Screen inventory and repair records', cadence: ['ongoing'], frequency: 'Ongoing', owner: NOT_NAMED },
  { id: 'hicpac-specialist', auth: 'hicpac', cite: 'Recommendation (pest control)',
    requirement: 'Routine pest control service is contracted to a credentialed pest-control specialist who tailors it to a health-care facility.',
    quote: 'Contract for routine pest control service by a credentialed pest-control specialist who will tailor the application to the needs of a health-care facility.',
    evidence: 'The contract; the specialist\'s credential', cadence: ['contract'], frequency: 'In the contract', owner: NOT_NAMED },
  { id: 'epa-inspect', auth: 'epa', cite: 'IPM toolkit, service contracts',
    requirement: 'Service contracts include periodic inspections; pesticides are applied only when pests are present and not controllable by other means.',
    quote: 'Service contracts should include periodic inspections, but pesticides should not be applied unless the pests are actually present and cannot be controlled by other means.',
    evidence: 'Contract inspection clause; application records tied to findings', cadence: ['contract'], frequency: 'In the contract', owner: NOT_NAMED }
];
