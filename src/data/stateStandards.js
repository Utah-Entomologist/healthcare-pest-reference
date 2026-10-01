// Moved from src/pages/state-jail-standards.astro so the Model Scope of Work can quote the same rows.
/**
 * Thirty-state comparison of the pest provisions in state jail standards.
 * Every quotation below is copied from the linked authority page, which
 * carries the source URL and verification date. Change the authority page
 * first, then this table.
 */
export const STATE_STANDARD_ROWS = [
  {
    state: 'Arkansas',
    instrument: '12 CAR §50-506 (Criminal Detention Facilities Review Coordinator)',
    force: 'Minimum standards promulgated under Ark. Code § 12-26-103 for local and regional detention facilities.',
    quote: 'A lice-infested detainee shall be deloused by methods which have been recommended by the Department of Health.',
    frequency: 'None for the facility. Intake lice and pest check and delousing only; no section of Part 50 requires pest control service.',
    slug: 'arkansas-12-car-50-506-lice-pests-intake'
  },
  {
    state: 'California',
    instrument: '15 CCR §1212 and §1264 (Board of State and Community Corrections)',
    force: 'Regulation for local detention facilities, Types I–IV (Penal Code § 6030).',
    quote: 'The responsible physician shall develop a written plan for the control and treatment of incarcerated persons who are found to be vermin-infested.',
    frequency: 'None for the facility. §1212 covers infested persons; kitchens must keep premises free of vermin under the Retail Food Code (§1245(a)).',
    slug: 'california-15-ccr-1212-vermin-control'
  },
  {
    state: 'Colorado',
    instrument: 'Standards for Colorado Jails, Topic O, Standard 1(6)(a)',
    force: 'Every county jail must comply beginning July 1, 2026 (Section 2-3-1901.5, C.R.S.).',
    quote: 'Jails shall have a policy to mitigate and respond to pest and vermin control issues.',
    frequency: 'None in the standard. The best-practice note recommends inspections at least quarterly by a local pest control business or a certified pest controller.',
    slug: 'colorado-jail-standards-topic-o-pest-vermin'
  },
  {
    state: 'Florida',
    instrument: 'Florida Model Jail Standards 14.12 (effective Jan. 1, 2025)',
    force: 'Every county and municipal detention facility must adopt the model standards (Fla. Stat. § 951.23(4)(b)); inspected twice a year.',
    quote: 'Detention facilities shall be kept free of all insects and rodents. A program to control vermin (e.g., pest control) in all areas of the detention facility will be maintained on a scheduled basis.',
    frequency: 'A scheduled program (no fixed frequency). Commercial licensed pest control companies where the jail has no certified operators.',
    slug: 'florida-model-jail-standards-14-12-insect-rodent'
  },
  {
    state: 'Idaho',
    instrument: 'Idaho Sheriffs’ Association, Idaho Jail Standards (April 2024), 10.03',
    force: 'Association standard, designated recommended (R); the association inspects county jails annually.',
    quote: 'The facility has a plan for the control of vermin and pests which includes monthly inspections.',
    frequency: 'Monthly inspections. Any fumigation by a licensed pest control professional.',
    slug: 'idaho-jail-standards-10-03'
  },
  {
    state: 'Illinois',
    instrument: '20 Ill. Adm. Code 701.120(g) (Department of Corrections)',
    force: 'Department rule; minimum standards for county jails (730 ILCS 5/3-15-2).',
    quote: 'A continuous and effective program of insect and rodent control and extermination shall be established and documented.',
    frequency: 'No numeric frequency. Continuous and documented; body pests controlled immediately; 16-mesh screening.',
    slug: 'illinois-20-iac-701-120-pest-vermin-control'
  },
  {
    state: 'Indiana',
    instrument: '210 IAC 3-1-9(d) (Department of Correction)',
    force: 'Department minimum standards for county jails (IC 11-12-4-1); annual state inspection.',
    quote: 'Each jail shall be inspected weekly for evidence of insects and rodents. Licensed extermination services shall be obtained to spray or treat facilities as often as necessary to eliminate insects and rodents.',
    frequency: 'Weekly inspection for evidence; licensed extermination services as often as necessary to eliminate.',
    slug: 'indiana-210-iac-3-1-9-insects-rodents'
  },
  {
    state: 'Iowa',
    instrument: '201 IAC 50.14(1)(a)(2) (Department of Corrections)',
    force: 'Department rule for all jails under Iowa Code ch. 356 and 356A; no jail may operate without substantially meeting it.',
    quote: 'The jail shall be maintained in a pest-free condition.',
    frequency: 'None named. An outcome standard; anyone spraying must be state-certified; no direct exposure of prisoners or staff.',
    slug: 'iowa-201-iac-50-14-pest-free'
  },
  {
    state: 'Kentucky',
    instrument: '501 KAR 3:080, Section 1(1) (Department of Corrections)',
    force: 'Regulation establishing minimum standards for full-service jails (KRS 441.055).',
    quote: 'The jailer or jail administrator shall provide for the control of vermin and pests.',
    frequency: 'None named. A written preventative maintenance plan with inspection schedules is required separately.',
    slug: 'kentucky-501-kar-3-080-vermin-pests'
  },
  {
    state: 'Maryland',
    instrument: 'COMAR 12.14.03.05A(3)(b) (Commission on Correctional Standards)',
    force: 'Minimum mandatory standards for all State and local correctional facilities (Corr. Servs. § 8-103).',
    quote: 'Quarterly vermin and pest control services;',
    frequency: 'Quarterly services. No provider in the regulation; the Commission\'s audit worksheet looks for a licensed exterminator\'s contract.',
    slug: 'maryland-comar-12-14-03-05-vermin-pest-control'
  },
  {
    state: 'Massachusetts',
    instrument: '103 CMR 974.06 (Department of Correction); 105 CMR 451.361 (Public Health)',
    force: 'Required standard for all county correctional facilities (103 CMR 900.08).',
    quote: 'When they exist, such pests shall be exterminated in a manner which is not hazardous to the health of inmates or employees, by a person with appropriate licensing.',
    frequency: 'No frequency. Extermination when pests exist, by a licensed person, under written policy.',
    slug: 'massachusetts-103-cmr-974-06-insect-rodent-control'
  },
  {
    state: 'Michigan',
    instrument: 'Mich. Admin. Code R 791.727 (Department of Corrections)',
    force: 'Department rule for jails and lockups under the county sheriff (MCL 791.262).',
    quote: 'A facility shall establish and maintain a written plan for the control of vermin and pests that includes, at a minimum, monthly inspections by a trained person designated by the facility administrator.',
    frequency: 'Monthly inspections, by a trained person the administrator designates. No licensed provider named.',
    slug: 'michigan-r-791-727-vermin-pest-control-plan'
  },
  {
    state: 'Minnesota',
    instrument: 'Minn. R. 2911.7500 (Department of Corrections)',
    force: 'Department rule; minimum standards for correctional facilities, including jails (Minn. Stat. § 241.021).',
    quote: 'The facility shall have a written plan for the control and elimination of vermin and pests.',
    frequency: 'None named. A written plan only.',
    slug: 'minnesota-rule-2911-7500-vermin-pests'
  },
  {
    state: 'Montana',
    instrument: 'Montana Jail Standards – 2016, 10.01',
    force: 'Adopting body and legal force not verified for this reference.',
    quote: 'Vermin and pests are controlled.',
    frequency: 'None named.',
    slug: 'montana-jail-standards-10-01'
  },
  {
    state: 'Nevada',
    instrument: 'NAC 211.430 (State Board of Health)',
    force: 'Regulation for every local correctional institution, including a jail.',
    quote: 'The operator of each local correctional institution must take effective measures to eliminate rodents, flies, cockroaches and other vermin.',
    frequency: 'None named. Exclusion is specified, down to screening no larger than 16 mesh; health authority findings must be written up (NAC 211.130).',
    slug: 'nevada-nac-211-430-vermin-control'
  },
  {
    state: 'New Jersey',
    instrument: 'N.J.A.C. 10A:31-11.5 (Department of Corrections)',
    force: 'Department rule for all adult county correctional facilities (N.J.A.C. 10A:31-1.2).',
    quote: 'Licensed pest control professionals shall be used at least once per month to clean or fumigate the facility.',
    frequency: 'At least monthly, by licensed pest control professionals. Integrated pest management required.',
    slug: 'new-jersey-njac-10a-31-11-5-vermin-pests'
  },
  {
    state: 'New Mexico',
    instrument: 'Adult Detention Professional Standards (4th ed., Jan. 2024), SS-06',
    force: 'Association accreditation standard (New Mexico Association of Counties).',
    quote: 'A written control plan addresses vermin and pest control.',
    frequency: 'Monthly inspection by a licensed exterminator, an extermination schedule, and documented inspection reports and treatment.',
    slug: 'new-mexico-nmac-adps-ss-06'
  },
  {
    state: 'New York',
    instrument: '9 NYCRR 7015.2(e) (State Commission of Correction)',
    force: 'Commission minimum standards for local correctional facilities (Correction Law § 45).',
    quote: 'Each local correctional facility shall develop and implement procedures designed to eliminate insect and rodent infestation.',
    frequency: 'None named. Pesticides used per the manufacturer\'s recommendations and applicable law; food in cells may be limited.',
    slug: 'new-york-9-nycrr-7015-2-insect-rodent'
  },
  {
    state: 'North Carolina',
    instrument: '15A NCAC 18A .1515, adopted by 10A NCAC 14J .0701',
    force: 'Public health rule incorporated into the jail standards that apply to all jails (10A NCAC 14J .0102).',
    quote: 'Effective measures shall be taken to keep flies, rodents, and other vermin out of the local confinement facility and to prevent their breeding or presence on the premises.',
    frequency: 'None named. Registered pesticides only; 16-mesh or finer screening; annual health department inspection.',
    slug: 'north-carolina-15a-ncac-18a-1515-vermin-control'
  },
  {
    state: 'Ohio',
    instrument: 'Ohio Adm.Code 5120:1-8-05 (full service jails)',
    force: 'State rule, effective January 1, 2026.',
    quote: '(Essential) Monthly sanitation, vermin and safety inspections of all areas will be conducted by a designated trained staff person.',
    frequency: 'Monthly, by a designated trained staff person; annual inspection by local or state health authorities.',
    slug: 'ohio-5120-1-8-05-jail-sanitation'
  },
  {
    state: 'Oklahoma',
    instrument: 'OAC 310:670-5-6(19) (State Department of Health)',
    force: 'Rule under the Oklahoma Jail Standards Act; all detention and lockup facilities must comply (74 O.S. § 192(B)).',
    quote: 'Licensed pest control professionals shall be contracted to perform pest control on a scheduled basis specified in the facility policy and procedure.',
    frequency: 'A licensed contractor, on a schedule the facility sets in its own policy. Conducive conditions eliminated immediately.',
    slug: 'oklahoma-oac-310-670-5-6-pest-control'
  },
  {
    state: 'Oregon',
    instrument: 'ORS 169.076(2)(g); OSSA Oregon Jail Standards H-201',
    force: 'Statute for every local correctional facility; the Department of Corrections inspects and the Attorney General can enforce (ORS 169.070, 169.080).',
    quote: 'Have a comprehensive written policy with respect to: ... (g) Vermin and communicable disease control.',
    frequency: 'None in the statute. The sheriffs’ association standard ties vermin treatment to inspection findings (recorded by identifier; copyrighted).',
    slug: 'oregon-ors-169-076-local-correctional-facility-standards'
  },
  {
    state: 'Pennsylvania',
    instrument: '37 Pa. Code §95.248(2) (Department of Corrections)',
    force: 'Mandatory minimum requirement for county prisons; listed as essential (§95.220b).',
    quote: 'The control of vermin and pests shall be addressed on a monthly basis by a qualified person, with documentation of the application of any pest or vermin control treatment.',
    frequency: 'Monthly, by a qualified person (no license named), with every treatment documented.',
    slug: 'pennsylvania-37-pa-code-95-248-vermin-pests'
  },
  {
    state: 'South Carolina',
    instrument: 'S.C. Minimum Standards for Local Detention Facilities, 3003 (2013)',
    force: 'Association standards adopted by the Department of Corrections; the basis of annual state inspection (S.C. Code § 24-9-20).',
    quote: 'Each facility shall have a regularly scheduled program of pest and vermin control and extermination.',
    frequency: 'A regularly scheduled program (no fixed frequency); 16-mesh or finer screening.',
    slug: 'south-carolina-jail-standards-3003-vermin-insects-pests'
  },
  {
    state: 'Tennessee',
    instrument: 'Tenn. Comp. R. & Regs. 1400-01-.09(5) (Tennessee Corrections Institute)',
    force: 'Minimum standard for all local facilities; noncompliance means a recommendation of non-certification.',
    quote: 'Facilities shall provide for control of vermin and pests and shall remove inmates from treatment areas if there is a risk of illness.',
    frequency: 'None named. Inmates removed from treatment areas when there is a risk of illness.',
    slug: 'tennessee-tci-1400-01-09-vermin-pests'
  },
  {
    state: 'Texas',
    instrument: '37 TAC §261.147 (Texas Commission on Jail Standards)',
    force: 'Commission rule for county jails, adopted under Tex. Gov\'t Code § 511.009.',
    quote: 'Facility construction shall protect against the entrance and infestation of vermin.',
    frequency: 'None. A construction rule only; the operational sanitation rule (Ch. 279) names no pest service, frequency, or provider.',
    slug: 'texas-tcjs-37-tac-261-147-vermin-control'
  },
  {
    state: 'Utah',
    instrument: 'Utah Correctional Standards (FY27, Secure Facilities), E-03',
    force: 'Utah Department of Corrections minimum standards for facilities housing offenders under its jurisdiction.',
    quote: 'B. Pest/Vermin control: facility shall remove inmates from areas if there is a risk of illness.',
    frequency: 'An item on the facility’s required weekly documented inspection; no service frequency or provider named.',
    slug: 'utah-udc-correctional-standards'
  },
  {
    state: 'Virginia',
    instrument: '6VAC15-40-1150 (State Board of Local and Regional Jails)',
    force: 'Regulation in the Minimum Standards for Jails and Lockups.',
    quote: 'The facility shall control vermin and pests and shall be serviced at least quarterly by a licensed pest control business or personnel certified by the Virginia Department of Agriculture and Consumer Services.',
    frequency: 'At least quarterly, by a licensed pest control business or VDACS-certified personnel.',
    slug: 'virginia-6vac15-40-1150-vermin-pest-control'
  },
  {
    state: 'Washington',
    instrument: 'WASPC Jail Accreditation Standards (2026), 20.1',
    force: 'Association accreditation standard, for agencies seeking accreditation. Separately, RCW 70.48.071 requires every city and county jail to adopt operating standards and be operated in accordance with them.',
    quote: 'The agency has policy or procedures governing pest control.',
    frequency: 'None named. WASPC’s required proofs: the agency policy and a copy of the service provider agreement.',
    slug: 'washington-waspc-jail-accreditation-20-1'
  },
  {
    state: 'Wisconsin',
    instrument: 'Wis. Admin. Code DOC 350.12(10) (Department of Corrections)',
    force: 'Department rule for county jails and houses of correction; the Department inspects at least annually (Wis. Stat. § 301.37).',
    quote: 'Vermin and pests are controlled with an effective, documented program.',
    frequency: 'None named. The program must be effective and documented; pesticides labeled and locked away from food.',
    slug: 'wisconsin-doc-350-12-vermin-pests'
  }
];
