// ── Mirrors pmrf_db exactly ───────────────────────────────────

export type Dependent = {
  dependentID: string;
  pin: string;
  dependentName: string;
  dependentRelationship: string;
  dependentDOB: string; // YYYY-MM-DD
  dependentCitizenship: string;
  dependentPermanentDisability: string;
};

export type Member = {
  pin: string;
  purpose: string;
  konSulTaProvider: string;
  memberName: string;
  motherMaidenName: string;
  spouseName: string;
  dateOfBirth: string; // YYYY-MM-DD
  placeOfBirth: string;
  sex: string;
  civilStatus: string;
  citizenship: string;
  philSysIDNum: string;
  tin: string;
  permanentAddress: string;
  mailingAddress: string;
  homePhoneNum: string;
  mobileNum: string;
  businessDirectLine: string;
  emailAddress: string;
  monthlyIncome: string;
  profession: string;
  proofOfIncome: string;
  professionID: string;
};

export type Profession = {
  professionID: string;
  memberType: string;
};

// ── profession_t ─────────────────────────────────────────────
export const PROFESSIONS: Profession[] = [
  { professionID: 'P001', memberType: 'Employed Private' },
  { professionID: 'P002', memberType: 'Employed Government' },
  { professionID: 'P003', memberType: 'Self-Earning Individual' },
  { professionID: 'P004', memberType: 'Sole Proprietor' },
  { professionID: 'P005', memberType: 'Professional Practitioner' },
];

export const getProfessionLabel = (id: string) =>
  PROFESSIONS.find(p => p.professionID === id)?.memberType ?? id;

// ── member_t ──────────────────────────────────────────────────
export const MEMBERS: Record<string, Member> = {
  '0010-0123-0001': {
    pin: '0010-0123-0001',
    purpose: 'Registration',
    konSulTaProvider: 'Victory Medical Clinic',
    memberName: 'Juan Dela Cruz',
    motherMaidenName: 'Maria Santos',
    spouseName: 'Andrea Dela Cruz',
    dateOfBirth: '1985-03-12',
    placeOfBirth: 'Metro Manila',
    sex: 'Male',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    philSysIDNum: '1234-5678-9012',
    tin: '147-012-896',
    permanentAddress: 'Intramuros, Manila',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: '(047)222-1235',
    mobileNum: '9171234567',
    businessDirectLine: 'N/A',
    emailAddress: 'jdcruz@email.com',
    monthlyIncome: '25000.00',
    profession: 'N/A',
    proofOfIncome: 'Certificate of Employment',
    professionID: 'P001',
  },
  '0010-0123-0002': {
    pin: '0010-0123-0002',
    purpose: 'Registration',
    konSulTaProvider: 'Dr. Mariano Icasiano Health Center',
    memberName: 'Maria Eleanor Reyes',
    motherMaidenName: 'Lucia Gomez',
    spouseName: 'N/A',
    dateOfBirth: '1990-07-25',
    placeOfBirth: 'Pampanga',
    sex: 'Female',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    philSysIDNum: '9128-3764-0010',
    tin: '897-741-130',
    permanentAddress: 'Mabalacat, Pampanga',
    mailingAddress: 'Pedro Gil St., Manila',
    homePhoneNum: 'N/A',
    mobileNum: '9182345678',
    businessDirectLine: 'N/A',
    emailAddress: 'mariaer@email.com',
    monthlyIncome: '18000.00',
    profession: 'Freelancer',
    proofOfIncome: 'ITR',
    professionID: 'P003',
  },
  '0010-0123-0003': {
    pin: '0010-0123-0003',
    purpose: 'Registration',
    konSulTaProvider: 'Labtech Medical Clinic',
    memberName: 'Josephine Torre',
    motherMaidenName: 'Aida Navarro',
    spouseName: 'Patrick Torre',
    dateOfBirth: '1982-09-14',
    placeOfBirth: 'Metro Manila',
    sex: 'Female',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    philSysIDNum: '1234-5677-9834',
    tin: '130-175-019',
    permanentAddress: 'Pasig City',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9215678901',
    businessDirectLine: 'N/A',
    emailAddress: 'josephinetorre@emaíl.com',
    monthlyIncome: '25000.00',
    profession: 'N/A',
    proofOfIncome: 'Certificate of Employment',
    professionID: 'P001',
  },
  '0010-0123-0004': {
    pin: '0010-0123-0004',
    purpose: 'Registration',
    konSulTaProvider: '1 Reach Medical Center',
    memberName: 'Christine Lim',
    motherMaidenName: 'Gloria Cruz',
    spouseName: 'N/A',
    dateOfBirth: '1988-01-19',
    placeOfBirth: 'Metro Manila',
    sex: 'Female',
    civilStatus: 'Widowed',
    citizenship: 'Filipino',
    philSysIDNum: '6724-0236-3425',
    tin: '754-012-453',
    permanentAddress: 'Intramuros, Manila',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9260123456',
    businessDirectLine: '(047)222-4568',
    emailAddress: 'clim@email.com',
    monthlyIncome: '45000.00',
    profession: 'Business Owner',
    proofOfIncome: 'Business Registration',
    professionID: 'P004',
  },
  '0010-0123-0005': {
    pin: '0010-0123-0005',
    purpose: 'Registration',
    konSulTaProvider: 'Healthway Medical',
    memberName: 'Mikko Santos',
    motherMaidenName: 'Mary Ramos',
    spouseName: 'Jennifer Santos',
    dateOfBirth: '1975-06-22',
    placeOfBirth: 'Cavite',
    sex: 'Male',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    philSysIDNum: '2234-0124-2663',
    tin: '124-012-663',
    permanentAddress: 'Bacoor, Cavite',
    mailingAddress: 'Quirino Ave., Manila',
    homePhoneNum: '(047)222-3457',
    mobileNum: '9259012345',
    businessDirectLine: 'N/A',
    emailAddress: 'mikkosan@gmail.com',
    monthlyIncome: '20000.00',
    profession: 'Freelancer',
    proofOfIncome: 'ITR',
    professionID: 'P003',
  },
  '0010-0123-0006': {
    pin: '0010-0123-0006',
    purpose: 'Updating/Amendment',
    konSulTaProvider: 'Healthway Medical',
    memberName: 'Eduardo Pascua',
    motherMaidenName: 'Teresita Domingo',
    spouseName: 'N/A',
    dateOfBirth: '1993-12-05',
    placeOfBirth: 'Laguna',
    sex: 'Male',
    civilStatus: 'Legally Separated',
    citizenship: 'Filipino',
    philSysIDNum: '9073-8751-0016',
    tin: '890-321-001',
    permanentAddress: 'Santa Rosa, Laguna',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9248901234',
    businessDirectLine: 'N/A',
    emailAddress: 'peduardo@email.com',
    monthlyIncome: '28000.00',
    profession: 'N/A',
    proofOfIncome: 'Government Payslip',
    professionID: 'P002',
  },
  '0010-0123-0007': {
    pin: '0010-0123-0007',
    purpose: 'Registration',
    konSulTaProvider: 'Healthway Medical',
    memberName: 'Lily Fernandez',
    motherMaidenName: 'Carmela Aquino',
    spouseName: 'N/A',
    dateOfBirth: '1998-08-09',
    placeOfBirth: 'Metro Manila',
    sex: 'Female',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    philSysIDNum: '5645-2231-0092',
    tin: '546-702-834',
    permanentAddress: 'Makati City',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9237890123',
    businessDirectLine: '(047)222-7891',
    emailAddress: 'fernandezlily@email.com',
    monthlyIncome: '80000.00',
    profession: 'Doctor',
    proofOfIncome: 'PRC License',
    professionID: 'P005',
  },
  '0010-0123-0008': {
    pin: '0010-0123-0008',
    purpose: 'Registration',
    konSulTaProvider: 'Victory Medical Clinic',
    memberName: 'Carlo Mendoza',
    motherMaidenName: 'Luzviminda Reyes',
    spouseName: 'Angela Mendoza',
    dateOfBirth: '1987-02-18',
    placeOfBirth: 'Quezon City',
    sex: 'Male',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    philSysIDNum: '2234-5567-8890',
    tin: '145-778-321',
    permanentAddress: 'Quezon City',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9291122334',
    businessDirectLine: 'N/A',
    emailAddress: 'cmendoza@email.com',
    monthlyIncome: '25000.00',
    profession: 'N/A',
    proofOfIncome: 'Certificate of Employment',
    professionID: 'P001',
  },
  '0010-0123-0009': {
    pin: '0010-0123-0009',
    purpose: 'Registration',
    konSulTaProvider: 'Labtech Medical Clinic',
    memberName: 'Angela Bautista',
    motherMaidenName: 'Carmen Diaz',
    spouseName: 'N/A',
    dateOfBirth: '1992-04-14',
    placeOfBirth: 'Davao',
    sex: 'Female',
    civilStatus: 'Single',
    citizenship: 'Filipino',
    philSysIDNum: '5566-7788-9900',
    tin: '789-456-123',
    permanentAddress: 'Davao City',
    mailingAddress: 'SAME AS ABOVE',
    homePhoneNum: 'N/A',
    mobileNum: '9192233445',
    businessDirectLine: 'N/A',
    emailAddress: 'abautista@email.com',
    monthlyIncome: '70000.00',
    profession: 'Engineer',
    proofOfIncome: 'PRC License',
    professionID: 'P005',
  },
  '0010-0123-0010': {
    pin: '0010-0123-0010',
    purpose: 'Registration',
    konSulTaProvider: '1 Reach Medical Center',
    memberName: 'Francis Villanueva',
    motherMaidenName: 'Rosa Mercado',
    spouseName: 'Liza Villanueva',
    dateOfBirth: '1979-09-09',
    placeOfBirth: 'Iloilo',
    sex: 'Male',
    civilStatus: 'Married',
    citizenship: 'Filipino',
    philSysIDNum: '6677-8899-0011',
    tin: '852-963-741',
    permanentAddress: 'Iloilo City',
    mailingAddress: 'Pasig City',
    homePhoneNum: '(033)222-3344',
    mobileNum: '9203344556',
    businessDirectLine: 'N/A',
    emailAddress: 'fvillanueva@email.com',
    monthlyIncome: '40000.00',
    profession: 'Business Owner',
    proofOfIncome: 'Business Registration',
    professionID: 'P004',
  },
};

// ── dependent_t ───────────────────────────────────────────────
export const DEPENDENTS: Dependent[] = [
  { dependentID: 'D001', pin: '0010-0123-0001', dependentName: 'Paolo Dela Cruz',   dependentRelationship: 'Child', dependentDOB: '2010-06-15', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D002', pin: '0010-0123-0001', dependentName: 'Solana Dela Cruz',  dependentRelationship: 'Child', dependentDOB: '2013-09-20', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D003', pin: '0010-0123-0003', dependentName: 'Liam Torre',        dependentRelationship: 'Child', dependentDOB: '2012-04-03', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D004', pin: '0010-0123-0003', dependentName: 'Nathan Torre',      dependentRelationship: 'Child', dependentDOB: '2007-07-19', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'Yes' },
  { dependentID: 'D005', pin: '0010-0123-0005', dependentName: 'Rico Santos',       dependentRelationship: 'Child', dependentDOB: '2011-08-30', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D006', pin: '0010-0123-0008', dependentName: 'Ethan Mendoza',     dependentRelationship: 'Child', dependentDOB: '2012-05-10', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D007', pin: '0010-0123-0008', dependentName: 'Sophia Mendoza',    dependentRelationship: 'Child', dependentDOB: '2015-08-22', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D008', pin: '0010-0123-0010', dependentName: 'Kyle Villanueva',   dependentRelationship: 'Child', dependentDOB: '2006-03-18', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'No' },
  { dependentID: 'D009', pin: '0010-0123-0010', dependentName: 'Anna Villanueva',   dependentRelationship: 'Child', dependentDOB: '2010-07-25', dependentCitizenship: 'Filipino', dependentPermanentDisability: 'Yes' },
];

export const getDependentsByPin = (pin: string) =>
  DEPENDENTS.filter(d => d.pin === pin);

// ── Helpers ───────────────────────────────────────────────────
export const parseDOB = (dob: string) => {
  const [year, month, day] = dob.split('-');
  return { year, month, day };
};

export const formatDOB = (dob: string) => {
  const d = new Date(dob);
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
};