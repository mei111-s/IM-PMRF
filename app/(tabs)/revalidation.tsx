import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// ── Member data ──────────────────────────────────────────────
const MEMBER_DATA: Record<string, MemberRecord> = {
  '0010-0123-0001': { pin: '0010-0123-0001', name: 'Dela Cruz, Juan', konSulTaProvider: 'Victory Medical Clinic', motherMaidenName: 'Santos, Maria', spouseName: 'Andrea Dela Cruz', dobYear: '1985', dobMonth: '03', dobDay: '12', placeOfBirth: 'Manila', sex: 'Male', civilStatus: 'Married', citizenship: 'Filipino', philSysIDNum: '1234-5678-9012', tin: '123-456-789', permanentAddress: 'Intramuros, Manila', mailingAddress: 'SAME AS ABOVE', sameAsPermanent: true, homePhoneNum: '(047)222-1235', mobileNum: '09171234567', businessDirectLine: 'N/A', emailAddress: 'jdcruz@email.com', monthlyIncome: '25000', profession: 'Engineer', memberType: 'Employed Private', professionID: 'P001', proofOfIncome: 'Certificate of Employment', submittedOn: 'May 02, 2025', dependents: [{ dependentName: 'Andrea Dela Cruz', dependentRelationship: 'Spouse', dependentDOBYear: '1987', dependentDOBMonth: '07', dependentDOBDay: '20', dependentCitizenship: 'Filipino', permanentDisability: 'No' }] },
  '0010-0123-0002': { pin: '0010-0123-0002', name: 'Reyes, Maria Eleanor', konSulTaProvider: '', motherMaidenName: 'Cruz, Lorna', spouseName: 'N/A', dobYear: '1990', dobMonth: '06', dobDay: '05', placeOfBirth: 'Mabalacat, Pampanga', sex: 'Female', civilStatus: 'Single', citizenship: 'Filipino', philSysIDNum: '', tin: '', permanentAddress: 'Mabalacat, Pampanga', mailingAddress: 'Pedro Gil St., Manila', sameAsPermanent: false, homePhoneNum: 'N/A', mobileNum: '09182345678', businessDirectLine: 'N/A', emailAddress: 'mariaer@email.com', monthlyIncome: '18000', profession: 'Nurse', memberType: 'Self-Earning Individual', professionID: 'P003', proofOfIncome: 'ITR', submittedOn: 'May 02, 2025', dependents: [] },
};

// Fill remaining with defaults
for (let i = 3; i <= 10; i++) {
  const padded = `0010-0123-00${String(i).padStart(2, '0')}`;
  if (!MEMBER_DATA[padded]) {
    MEMBER_DATA[padded] = { pin: padded, name: 'Member, Test', konSulTaProvider: '', motherMaidenName: '', spouseName: 'N/A', dobYear: '1990', dobMonth: '01', dobDay: '01', placeOfBirth: 'Manila', sex: 'Male', civilStatus: 'Single', citizenship: 'Filipino', philSysIDNum: '', tin: '', permanentAddress: 'Metro Manila', mailingAddress: 'SAME AS ABOVE', sameAsPermanent: true, homePhoneNum: 'N/A', mobileNum: '09000000000', businessDirectLine: 'N/A', emailAddress: 'test@email.com', monthlyIncome: '20000', profession: '', memberType: 'Employed Private', professionID: 'P001', proofOfIncome: 'Certificate of Employment', submittedOn: 'May 02, 2025', dependents: [] };
  }
}

type Dependent = { dependentName: string; dependentRelationship: string; dependentDOBYear: string; dependentDOBMonth: string; dependentDOBDay: string; dependentCitizenship: string; permanentDisability: string; };
type MemberRecord = { pin: string; name: string; konSulTaProvider: string; motherMaidenName: string; spouseName: string; dobYear: string; dobMonth: string; dobDay: string; placeOfBirth: string; sex: string; civilStatus: string; citizenship: string; philSysIDNum: string; tin: string; permanentAddress: string; mailingAddress: string; sameAsPermanent: boolean; homePhoneNum: string; mobileNum: string; businessDirectLine: string; emailAddress: string; monthlyIncome: string; profession: string; memberType: string; professionID: string; proofOfIncome: string; submittedOn: string; dependents: Dependent[]; };

// ── Shared helpers ────────────────────────────────────────────
function PageHeader({ onBack, onForward }: { onBack: () => void; onForward?: () => void }) {
  return (
    <View style={styles.topHeader}>
      <TouchableOpacity style={styles.backCircle} onPress={onBack}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>
      <View style={styles.headerLogoRow}>
        <View style={styles.headerLogoDot} />
        <Text style={styles.headerLogoText}>PhilHealth</Text>
      </View>
      {onForward ? (
        <TouchableOpacity style={styles.backCircle} onPress={onForward}>
          <Text style={styles.backArrow}>›</Text>
        </TouchableOpacity>
      ) : <View style={{ width: 36 }} />}
    </View>
  );
}

function PageTitle({ subtitle }: { subtitle?: string }) {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.formTitle}>Update Existing{'\n'}Membership Form</Text>
      <Text style={styles.stepSubtitle}>{subtitle || 'Update data from an existing membership form.'}</Text>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function BottomActions({ leftLabel, rightLabel, onLeft, onRight, agreeTerms, agreeConsent, onToggleTerms, onToggleConsent }: { leftLabel: string; rightLabel: string; onLeft: () => void; onRight: () => void; agreeTerms: boolean; agreeConsent: boolean; onToggleTerms: () => void; onToggleConsent: () => void; }) {
  return (
    <View style={styles.bottomActions}>
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={onLeft}>
          <Text style={styles.saveBtnText}>{leftLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtn} onPress={onRight}>
          <Text style={styles.continueBtnText}>{rightLabel}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.checkRow} onPress={onToggleTerms}>
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>{agreeTerms && <Text style={styles.checkMark}>✓</Text>}</View>
        <Text style={styles.checkLabel}>I agree with the terms and condition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkRow} onPress={onToggleConsent}>
        <View style={[styles.checkbox, agreeConsent && styles.checkboxChecked]}>{agreeConsent && <Text style={styles.checkMark}>✓</Text>}</View>
        <Text style={styles.checkLabel}>I give consent to use the following personal informations</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Main component ────────────────────────────────────────────
export default function RevalidationScreen() {
  const router = useRouter();

  // Which top-level screen: 'default' | 'update' | 'view'
  const [screen, setScreen] = useState<'default' | 'update' | 'view'>('default');
  // Multi-step: 0=personal, 1=dependents, 2=membertype, 3=confirmation
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeConsent, setAgreeConsent] = useState(false);

  // For demo: use first member
  const demoPin = '0010-0123-0001';
  const source = MEMBER_DATA[demoPin];

  const [form, setForm] = useState<MemberRecord>({ ...source });
  const [dependents, setDependents] = useState<Dependent[]>([...source.dependents]);

  const update = (field: keyof MemberRecord, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const updateDependent = (i: number, field: string, value: string) => {
    setDependents(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: value } : d));
  };
  const addDependent = () => setDependents(prev => [...prev, { dependentName: '', dependentRelationship: 'Family', dependentDOBYear: '', dependentDOBMonth: '', dependentDOBDay: '', dependentCitizenship: '', permanentDisability: '' }]);
  const removeDependent = (i: number) => setDependents(prev => prev.filter((_, idx) => idx !== i));

  // ── SUCCESS ──
  if (submitted) {
    return (
      <View style={styles.outerContainer}>
        <PageHeader onBack={() => { setSubmitted(false); setScreen('default'); setStep(0); }} />
        <View style={styles.titleSection}>
          <Text style={styles.formTitle}>Update Existing{'\n'}Membership Form</Text>
          <Text style={styles.stepSubtitle}>Membership form Updated!</Text>
        </View>
        <View style={styles.successCard}>
          <View style={styles.successIconBox}>
            <Text style={styles.successEmoji}>✅</Text>
          </View>
          <Text style={styles.successTitle}>Membership Form{'\n'}Successfully Updated and{'\n'}Resubmitted!</Text>
          <TouchableOpacity style={styles.viewFormBtn} onPress={() => { setSubmitted(false); setScreen('view'); setStep(0); }}>
            <Text style={styles.viewFormText}>View Form</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── DEFAULT SCREEN ──
  if (screen === 'default') {
    return (
      <View style={styles.outerContainer}>
        <PageHeader onBack={() => router.push('/(tabs)/explore')} />
        <ScrollView style={styles.scrollBody}>
          <PageTitle />

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Submitted Forms</Text>
            <View style={styles.submittedCard}>
              <View style={styles.submittedTop}>
                <Text style={styles.submittedPin}>{demoPin}</Text>
                <View style={styles.submittedBtns}>
                  <TouchableOpacity style={styles.viewFormSmallBtn} onPress={() => setScreen('view')}>
                    <Text style={styles.viewFormSmallText}>🔍 View Form</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.updateFormSmallBtn} onPress={() => setScreen('update')}>
                    <Text style={styles.updateFormSmallText}>✏ Update Form</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.submittedName}>{form.name}</Text>
              <Text style={styles.submittedDate}>Application Submitted on {source.submittedOn}</Text>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Activity history</Text>
            <View style={styles.activityDateHeader}>
              <Text style={styles.activityDateText}>Today</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <Text style={styles.activityPin}>{demoPin}</Text>
                <Text style={styles.activityName}>{form.name}</Text>
                <Text style={styles.activityDate}>Application Submitted on {source.submittedOn}</Text>
              </View>
              <View style={styles.activityBtns}>
                <TouchableOpacity style={styles.viewUpdateBtn} onPress={() => setScreen('view')}>
                  <Text style={styles.viewUpdateText}>👁 View Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteUpdateBtn}>
                  <Text style={styles.deleteUpdateText}>🗑 Delete Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ── VIEW AND PRINT ──
  if (screen === 'view') {
    return (
      <View style={styles.outerContainer}>
        <PageHeader onBack={() => setScreen('default')} />
        <ScrollView style={styles.scrollBody}>
          <View style={styles.titleSection}>
            <Text style={styles.formTitle}>Membership Form</Text>
            <Text style={styles.stepSubtitle}>Access your PhilHealth Membership form.</Text>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Submitted Forms</Text>
            <View style={styles.submittedCard}>
              <Text style={styles.submittedPin}>{demoPin}</Text>
              <Text style={styles.submittedName}>{form.name}</Text>
              <Text style={styles.submittedDate}>Application Submitted on {source.submittedOn}</Text>
              <View style={styles.downloadPrintRow}>
                <TouchableOpacity style={styles.downloadBtn}>
                  <Text style={styles.downloadBtnText}>↓ Download Form</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.printBtn}>
                  <Text style={styles.printBtnText}>🖨 Print Form</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Read-only form */}
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <ReadField label="Preferred Konsulta Provider" value={form.konSulTaProvider} placeholder="e.g. Victory Medical Center" />
            <ReadField label="Member Name" value={form.name} placeholder="Last Name, First Name, Middle Initial" />
            <ReadField label="Mother's Maiden Name" value={form.motherMaidenName} placeholder="Last Name, First Name, Middle Initial" />
            <ReadField label="Spouse Name" value={form.spouseName} placeholder="N/A if not applicable" />
            <ReadField label="Date of Birth" value={[form.dobYear, form.dobMonth, form.dobDay].filter(Boolean).join(' / ')} placeholder="Year / Month / Day" />
            <ReadField label="Place of Birth" value={form.placeOfBirth} placeholder="City/Province" isDropdown />
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <View key={opt} style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]}>
                    <Text style={[styles.toggleText, form.sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </View>
                ))}
              </View>
            </Field>
            <ReadField label="Civil Status" value={form.civilStatus} placeholder="Select current civil status" isDropdown />
            <ReadField label="Citizenship" value={form.citizenship} placeholder="Select current Citizenship/Nationality" isDropdown />
            <ReadField label="Philsys ID Number (Optional)" value={form.philSysIDNum} placeholder="0000-0000-0000" />
            <ReadField label="Tax Payer Identification Number (Optional)" value={form.tin} placeholder="000-000-000" />

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <ReadField label="Permanent Address" value={form.permanentAddress} placeholder="Street, Barangay, City/Province" />
            <ReadField label="Mailing Address" value={form.mailingAddress} placeholder="Street, Barangay, City/Province" />
            <ReadField label="Home Phone Number" value={form.homePhoneNum} placeholder="09XX-XXX-XXXX" />
            <ReadField label="Mobile Number" value={form.mobileNum} placeholder="09XX-XXX-XXXX" />
            <ReadField label="Business (Direct Line)" value={form.businessDirectLine} placeholder="N/A if not applicable" />
            <ReadField label="Email Address" value={form.emailAddress} placeholder="email@gmail.com" />

            <Text style={styles.sectionHeading}>III. Profession</Text>
            <ReadField label="Monthly Income" value={form.monthlyIncome} placeholder="e.g. 150000" />
            <ReadField label="Profession" value={form.profession} placeholder="e.g. Doctor, Nurse, Teacher" />
            <ReadField label="Profession ID" value={form.professionID} placeholder="X000" />
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ── UPDATE FORM (multi-step) ──
  const progress = ((step + 1) / 4) * 100;

  const stepLabel = [
    'Page 1 of 3: Personal Details',
    'Page 2 of 3: Declaration of Dependents',
    'Page 3 of 3: Member Type',
    'Update Confirmation',
  ][step];

  return (
    <View style={styles.outerContainer}>
      <PageHeader
        onBack={() => { if (step > 0) setStep(step - 1); else setScreen('default'); }}
        onForward={step < 3 ? () => setStep(step + 1) : undefined}
      />
      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <PageTitle subtitle={stepLabel} />
        <View style={styles.progressTrackWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
          </View>
        </View>

        {/* ── STEP 0: Personal Details ── */}
        {step === 0 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <Field label="Preferred Konsulta Provider">
              <TextInput style={styles.input} placeholder="e.g. Victory Medical Center" placeholderTextColor="#bbb" value={form.konSulTaProvider} onChangeText={v => update('konSulTaProvider', v)} />
            </Field>
            <Field label="Member Name">
              <TextInput style={styles.input} placeholder="Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={form.name} onChangeText={v => update('name', v)} />
            </Field>
            <Field label="Mother's Maiden Name">
              <TextInput style={styles.input} placeholder="Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={form.motherMaidenName} onChangeText={v => update('motherMaidenName', v)} />
            </Field>
            <Field label="Spouse Name">
              <TextInput style={styles.input} placeholder="N/A if not applicable, Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={form.spouseName} onChangeText={v => update('spouseName', v)} />
            </Field>
            <Field label="Date of Birth">
              <View style={styles.triRow}>
                <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb" value={form.dobYear} onChangeText={v => update('dobYear', v)} keyboardType="numeric" />
                <TextInput style={[styles.input, styles.triInput]} placeholder="Month" placeholderTextColor="#bbb" value={form.dobMonth} onChangeText={v => update('dobMonth', v)} keyboardType="numeric" />
                <TextInput style={[styles.input, styles.triInput]} placeholder="Day" placeholderTextColor="#bbb" value={form.dobDay} onChangeText={v => update('dobDay', v)} keyboardType="numeric" />
              </View>
            </Field>
            <Field label="Place of Birth">
              <View style={styles.dropdownBox}>
                <TextInput style={styles.dropdownInput} placeholder="City/Province" placeholderTextColor="#bbb" value={form.placeOfBirth} onChangeText={v => update('placeOfBirth', v)} />
                <Text style={styles.dropdownCaret}>⌄</Text>
              </View>
            </Field>
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <TouchableOpacity key={opt} style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]} onPress={() => update('sex', opt)}>
                    <Text style={[styles.toggleText, form.sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>
            <Field label="Civil Status">
              <View style={styles.dropdownBox}>
                <TextInput style={styles.dropdownInput} placeholder="Select current civil status" placeholderTextColor="#bbb" value={form.civilStatus} onChangeText={v => update('civilStatus', v)} />
                <Text style={styles.dropdownCaret}>⌄</Text>
              </View>
            </Field>
            <Field label="Citizenship">
              <View style={styles.dropdownBox}>
                <TextInput style={styles.dropdownInput} placeholder="Select current Citizenship/Nationality" placeholderTextColor="#bbb" value={form.citizenship} onChangeText={v => update('citizenship', v)} />
                <Text style={styles.dropdownCaret}>⌄</Text>
              </View>
            </Field>
            <Field label="Philsys ID Number (Optional)">
              <TextInput style={styles.input} placeholder="0000-0000-0000" placeholderTextColor="#bbb" value={form.philSysIDNum} onChangeText={v => update('philSysIDNum', v)} />
            </Field>
            <Field label="Tax Payer Identification Number (Optional)">
              <TextInput style={styles.input} placeholder="000-000-000" placeholderTextColor="#bbb" value={form.tin} onChangeText={v => update('tin', v)} />
            </Field>

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <Field label="Permanent Address">
              <TextInput style={styles.input} placeholder="Street, Barangay, City/Province" placeholderTextColor="#bbb" value={form.permanentAddress} onChangeText={v => update('permanentAddress', v)} />
            </Field>
            <Field label="Mailing Address">
              <TextInput style={styles.input} placeholder="Street, Barangay, City/Province" placeholderTextColor="#bbb" value={form.mailingAddress} onChangeText={v => update('mailingAddress', v)} />
              <TouchableOpacity style={styles.checkRow} onPress={() => update('sameAsPermanent', !form.sameAsPermanent)}>
                <View style={[styles.checkbox, form.sameAsPermanent && styles.checkboxChecked]}>{form.sameAsPermanent && <Text style={styles.checkMark}>✓</Text>}</View>
                <Text style={styles.checkLabel}>Same as Permanent Address</Text>
              </TouchableOpacity>
            </Field>
            <Field label="Home Phone Number">
              <TextInput style={styles.input} placeholder="09XX-XXX-XXXX" placeholderTextColor="#bbb" value={form.homePhoneNum} onChangeText={v => update('homePhoneNum', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Mobile Number">
              <TextInput style={styles.input} placeholder="09XX-XXX-XXXX" placeholderTextColor="#bbb" value={form.mobileNum} onChangeText={v => update('mobileNum', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Business (Direct Line)">
              <TextInput style={styles.input} placeholder="N/A if not applicable" placeholderTextColor="#bbb" value={form.businessDirectLine} onChangeText={v => update('businessDirectLine', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Email Address">
              <TextInput style={styles.input} placeholder="email@gmail.com" placeholderTextColor="#bbb" value={form.emailAddress} onChangeText={v => update('emailAddress', v)} keyboardType="email-address" autoCapitalize="none" />
            </Field>

            <Text style={styles.sectionHeading}>III. Profession</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Monthly Income">
              <TextInput style={styles.input} placeholder="e.g. 150000" placeholderTextColor="#bbb" value={form.monthlyIncome} onChangeText={v => update('monthlyIncome', v)} keyboardType="numeric" />
            </Field>
            <Field label="Profession">
              <TextInput style={styles.input} placeholder="e.g. Doctor, Nurse, Teacher" placeholderTextColor="#bbb" value={form.profession} onChangeText={v => update('profession', v)} />
            </Field>
            <Field label="Proof of Income">
              <View style={styles.proofBox}>
                <Text style={styles.proofText}>{form.proofOfIncome || 'Certificate of Employment, Bank Statements, Income Tax Return (ITR)'}</Text>
                <View style={styles.uploadBtn}><Text style={styles.uploadText}>Upload a File  ↑</Text></View>
              </View>
              <TouchableOpacity style={styles.addMoreBtn}><Text style={styles.addMoreText}>+ Add More</Text></TouchableOpacity>
            </Field>
            <Field label="Profession ID">
              <TextInput style={styles.input} placeholder="X000" placeholderTextColor="#bbb" value={form.professionID} onChangeText={v => update('professionID', v)} />
            </Field>

            <BottomActions
              leftLabel="Save current progress"
              rightLabel="Update Personal Details"
              onLeft={() => Alert.alert('Saved', 'Progress saved.')}
              onRight={() => setStep(1)}
              agreeTerms={agreeTerms}
              agreeConsent={agreeConsent}
              onToggleTerms={() => setAgreeTerms(!agreeTerms)}
              onToggleConsent={() => setAgreeConsent(!agreeConsent)}
            />
          </View>
        )}

        {/* ── STEP 1: Dependents ── */}
        {step === 1 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Declaration of Dependents</Text>
            {dependents.map((dep, i) => (
              <View key={i} style={styles.dependentCard}>
                <View style={styles.dependentHeader}>
                  <Text style={styles.dependentTitle}>Dependent {i + 1}</Text>
                  {i > 0 && <TouchableOpacity onPress={() => removeDependent(i)}><Text style={styles.removeText}>Remove</Text></TouchableOpacity>}
                </View>
                <Field label="Dependent Name">
                  <TextInput style={styles.input} placeholder="Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={dep.dependentName} onChangeText={v => updateDependent(i, 'dependentName', v)} />
                </Field>
                <Field label="Dependent's Relationship with the Member">
                  <TextInput style={styles.input} placeholder="Family" placeholderTextColor="#bbb" value={dep.dependentRelationship} onChangeText={v => updateDependent(i, 'dependentRelationship', v)} />
                </Field>
                <Field label="Date of Birth">
                  <View style={styles.triRow}>
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb" value={dep.dependentDOBYear} onChangeText={v => updateDependent(i, 'dependentDOBYear', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Month" placeholderTextColor="#bbb" value={dep.dependentDOBMonth} onChangeText={v => updateDependent(i, 'dependentDOBMonth', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Day" placeholderTextColor="#bbb" value={dep.dependentDOBDay} onChangeText={v => updateDependent(i, 'dependentDOBDay', v)} keyboardType="numeric" />
                  </View>
                </Field>
                <Field label="Citizenship">
                  <View style={styles.dropdownBox}>
                    <TextInput style={styles.dropdownInput} placeholder="Select current Citizenship/Nationality" placeholderTextColor="#bbb" value={dep.dependentCitizenship} onChangeText={v => updateDependent(i, 'dependentCitizenship', v)} />
                    <Text style={styles.dropdownCaret}>⌄</Text>
                  </View>
                </Field>
                <Field label="Dependent with Permanent Disability?">
                  <View style={styles.toggleRow}>
                    {['Yes', 'No'].map(opt => (
                      <TouchableOpacity key={opt} style={[styles.toggleBtn, dep.permanentDisability === opt && styles.toggleBtnActive]} onPress={() => updateDependent(i, 'permanentDisability', opt)}>
                        <Text style={[styles.toggleText, dep.permanentDisability === opt && styles.toggleTextActive]}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Field>
              </View>
            ))}
            <TouchableOpacity style={styles.addDependentBtn} onPress={addDependent}>
              <Text style={styles.addDependentText}>+ Add Dependent</Text>
            </TouchableOpacity>
            <BottomActions
              leftLabel="Update Dependents"
              rightLabel="Continue"
              onLeft={() => Alert.alert('Saved', 'Dependents saved.')}
              onRight={() => setStep(2)}
              agreeTerms={agreeTerms}
              agreeConsent={agreeConsent}
              onToggleTerms={() => setAgreeTerms(!agreeTerms)}
              onToggleConsent={() => setAgreeConsent(!agreeConsent)}
            />
          </View>
        )}

        {/* ── STEP 2: Member Type ── */}
        {step === 2 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Member Type</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Profession ID">
              <TextInput style={styles.input} placeholder="X000" placeholderTextColor="#bbb" value={form.professionID} onChangeText={v => update('professionID', v)} />
            </Field>
            <Field label="Member Type/Profession">
              <View style={styles.dropdownBox}>
                <Text style={[styles.dropdownInput, { color: form.memberType ? '#333' : '#bbb' }]}>{form.memberType || 'Select Member Type'}</Text>
                <Text style={styles.dropdownCaret}>⌄</Text>
              </View>
              <View style={styles.memberTypeOptions}>
                {['Employed Private', 'Employed Government', 'Self-Earning Individual', 'Sole Proprietor', 'Professional Practitioner'].map(opt => (
                  <TouchableOpacity key={opt} style={[styles.memberTypeBtn, form.memberType === opt && styles.memberTypeBtnActive]} onPress={() => update('memberType', opt)}>
                    <Text style={[styles.memberTypeText, form.memberType === opt && styles.memberTypeTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>
            <BottomActions
              leftLabel="Save current progress"
              rightLabel="Update Form"
              onLeft={() => Alert.alert('Saved', 'Progress saved.')}
              onRight={() => setStep(3)}
              agreeTerms={agreeTerms}
              agreeConsent={agreeConsent}
              onToggleTerms={() => setAgreeTerms(!agreeTerms)}
              onToggleConsent={() => setAgreeConsent(!agreeConsent)}
            />
          </View>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <View style={styles.formBody}>
            <View style={styles.warningBox}>
              <Text style={styles.warningLabel}>⚠ Warning</Text>
              <Text style={styles.warningText}>Before clicking the update and resubmit button, please make sure to double check your information.</Text>
            </View>

            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <ReadField label="Preferred Konsulta Provider" value={form.konSulTaProvider} placeholder="e.g. Victory Medical Center" />
            <ReadField label="Member Name" value={form.name} placeholder="Last Name, First Name, Middle Initial" />
            <ReadField label="Mother's Maiden Name" value={form.motherMaidenName} placeholder="Last Name, First Name, Middle Initial" />
            <ReadField label="Spouse Name" value={form.spouseName} placeholder="N/A if not applicable" />
            <ReadField label="Date of Birth" value={[form.dobYear, form.dobMonth, form.dobDay].filter(Boolean).join(' / ')} placeholder="Year / Month / Day" />
            <ReadField label="Place of Birth" value={form.placeOfBirth} placeholder="City/Province" isDropdown />
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <View key={opt} style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]}>
                    <Text style={[styles.toggleText, form.sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </View>
                ))}
              </View>
            </Field>
            <ReadField label="Civil Status" value={form.civilStatus} placeholder="Select current civil status" isDropdown />
            <ReadField label="Citizenship" value={form.citizenship} placeholder="Select current Citizenship/Nationality" isDropdown />
            <ReadField label="Philsys ID Number (Optional)" value={form.philSysIDNum} placeholder="0000-0000-0000" />

            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.checkRow} onPress={() => setAgreeTerms(!agreeTerms)}>
                <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>{agreeTerms && <Text style={styles.checkMark}>✓</Text>}</View>
                <Text style={styles.checkLabel}>I agree with the terms and condition</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkRow} onPress={() => setAgreeConsent(!agreeConsent)}>
                <View style={[styles.checkbox, agreeConsent && styles.checkboxChecked]}>{agreeConsent && <Text style={styles.checkMark}>✓</Text>}</View>
                <Text style={styles.checkLabel}>I give consent to use the following personal informations</Text>
              </TouchableOpacity>
              <View style={styles.confirmBtnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(2)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={() => setSubmitted(true)}>
                  <Text style={styles.submitText}>Update Membership Form</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ── ReadField ─────────────────────────────────────────────────
function ReadField({ label, value, placeholder, isDropdown }: { label: string; value: string; placeholder: string; isDropdown?: boolean }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={isDropdown ? styles.dropdownBox : styles.reviewInput}>
        <Text style={[isDropdown ? styles.dropdownInput : {}, value ? styles.reviewValue : styles.reviewPlaceholder, { flex: 1 }]}>
          {value || placeholder}
        </Text>
        {isDropdown && <Text style={styles.dropdownCaret}>⌄</Text>}
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff' },
  scrollBody: { flex: 1 },

  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 24, color: '#333', marginTop: -2 },
  headerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerLogoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3aaa35' },
  headerLogoText: { fontSize: 15, fontWeight: '700', color: '#333', letterSpacing: 0.5 },

  titleSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  formTitle: { fontSize: 22, fontWeight: '800', color: '#111', lineHeight: 30, textAlign: 'center' },
  stepSubtitle: { fontSize: 13, color: '#888', textAlign: 'center', marginTop: 6 },

  progressTrackWrap: { paddingHorizontal: 20, paddingBottom: 8 },
  progressTrack: { height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: '#3aaa35', borderRadius: 3 },

  sectionBlock: { marginHorizontal: 16, marginTop: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },

  submittedCard: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#eee' },
  submittedTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  submittedPin: { fontSize: 15, fontWeight: '700', color: '#333' },
  submittedBtns: { flexDirection: 'row', gap: 6 },
  viewFormSmallBtn: { backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  viewFormSmallText: { fontSize: 11, color: '#555', fontWeight: '600' },
  updateFormSmallBtn: { backgroundColor: '#3aaa35', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  updateFormSmallText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  submittedName: { fontSize: 13, color: '#555', marginBottom: 2 },
  submittedDate: { fontSize: 11, color: '#aaa' },

  activityDateHeader: { marginBottom: 8 },
  activityDateText: { fontSize: 12, fontWeight: '700', color: '#333' },
  activityItem: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#eee' },
  activityLeft: { marginBottom: 10 },
  activityPin: { fontSize: 14, fontWeight: '700', color: '#333' },
  activityName: { fontSize: 13, color: '#555' },
  activityDate: { fontSize: 11, color: '#aaa', marginTop: 2 },
  activityBtns: { flexDirection: 'row', gap: 8 },
  viewUpdateBtn: { backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  viewUpdateText: { fontSize: 11, color: '#555', fontWeight: '600' },
  deleteUpdateBtn: { backgroundColor: '#fff0f0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#ffcdd2' },
  deleteUpdateText: { fontSize: 11, color: '#e53935', fontWeight: '600' },

  downloadPrintRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  downloadBtn: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 9, alignItems: 'center' },
  downloadBtnText: { fontSize: 12, color: '#555', fontWeight: '600' },
  printBtn: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 9, alignItems: 'center' },
  printBtnText: { fontSize: 12, color: '#555', fontWeight: '600' },

  formBody: { paddingHorizontal: 20, paddingTop: 16 },
  sectionHeading: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 16, marginBottom: 12 },
  subHeading: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 10, marginTop: -6 },

  fieldWrapper: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, color: '#444', fontWeight: '500', marginBottom: 6 },
  input: { backgroundColor: '#f4f4f4', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 14, color: '#333' },
  triRow: { flexDirection: 'row', gap: 8 },
  triInput: { flex: 1 },
  dropdownBox: { backgroundColor: '#f4f4f4', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, flexDirection: 'row', alignItems: 'center' },
  dropdownInput: { flex: 1, fontSize: 14, color: '#333' },
  dropdownCaret: { fontSize: 18, color: '#888' },
  toggleRow: { flexDirection: 'row', gap: 10 },
  toggleBtn: { borderRadius: 8, paddingHorizontal: 20, paddingVertical: 9, backgroundColor: '#f4f4f4', borderWidth: 1.5, borderColor: '#e0e0e0' },
  toggleBtnActive: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  toggleText: { fontSize: 13, color: '#555', fontWeight: '500' },
  toggleTextActive: { color: '#fff', fontWeight: '700' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  checkboxChecked: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  checkMark: { fontSize: 11, color: '#fff', fontWeight: 'bold' },
  checkLabel: { fontSize: 12, color: '#555', flex: 1 },

  proofBox: { backgroundColor: '#f4f4f4', borderRadius: 8, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proofText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },
  uploadBtn: { marginLeft: 8 },
  uploadText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },
  addMoreBtn: { alignItems: 'center', paddingVertical: 10, backgroundColor: '#f4f4f4', borderRadius: 8, marginTop: 8 },
  addMoreText: { fontSize: 13, color: '#3aaa35', fontWeight: '600' },

  dependentCard: { backgroundColor: '#fafafa', borderRadius: 10, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#eee' },
  dependentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dependentTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  removeText: { fontSize: 12, color: '#e53935', fontWeight: '500' },
  addDependentBtn: { backgroundColor: '#f4f4f4', borderRadius: 8, paddingVertical: 13, alignItems: 'center', marginBottom: 16, borderWidth: 1.5, borderColor: '#3aaa35', borderStyle: 'dashed' },
  addDependentText: { fontSize: 14, color: '#3aaa35', fontWeight: '600' },

  memberTypeOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  memberTypeBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: '#ddd', backgroundColor: '#f4f4f4' },
  memberTypeBtnActive: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  memberTypeText: { fontSize: 12, color: '#555' },
  memberTypeTextActive: { color: '#fff', fontWeight: '600' },

  reviewInput: { backgroundColor: '#f4f4f4', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11 },
  reviewValue: { fontSize: 14, color: '#333' },
  reviewPlaceholder: { fontSize: 14, color: '#bbb' },

  warningBox: { backgroundColor: '#fff8e1', borderRadius: 8, padding: 14, borderLeftWidth: 4, borderLeftColor: '#FFC200', marginBottom: 16 },
  warningLabel: { fontSize: 13, fontWeight: '700', color: '#e65100', marginBottom: 4 },
  warningText: { fontSize: 12, color: '#555', lineHeight: 18 },

  bottomActions: { marginTop: 24, marginBottom: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  actionBtnRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  saveBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, backgroundColor: '#f4f4f4', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  saveBtnText: { fontSize: 12, color: '#555', fontWeight: '600' },
  continueBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, backgroundColor: '#3aaa35', alignItems: 'center' },
  continueBtnText: { fontSize: 12, color: '#fff', fontWeight: '700' },

  confirmActions: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  confirmBtnRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  cancelBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, backgroundColor: '#f4f4f4', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  cancelText: { fontSize: 13, color: '#555', fontWeight: '600' },
  submitBtn: { flex: 1.6, paddingVertical: 13, borderRadius: 8, backgroundColor: '#3aaa35', alignItems: 'center' },
  submitText: { fontSize: 12, color: '#fff', fontWeight: '700' },

  successCard: { margin: 24, backgroundColor: '#f9f9f9', borderRadius: 16, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  successIconBox: { width: 100, height: 100, backgroundColor: '#e8f5e9', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successEmoji: { fontSize: 48 },
  successTitle: { fontSize: 18, fontWeight: '700', color: '#111', textAlign: 'center', lineHeight: 26, marginBottom: 24 },
  viewFormBtn: { paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#ddd' },
  viewFormText: { fontSize: 14, color: '#333', fontWeight: '600' },
});