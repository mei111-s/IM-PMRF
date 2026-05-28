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
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

type Dependent = {
  dependentName: string;
  dependentRelationship: string;
  dependentDOBYear: string;
  dependentDOBMonth: string;
  dependentDOBDay: string;
  dependentCitizenship: string;
  permanentDisability: string;
};

const STEPS = [
  'Personal Details',
  'Dependent Declaration',
  'Member Type',
  'Confirmation',
];

export default function MembershipForm() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-indexed: 0,1,2,3
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    konSulTaProvider: '',
    memberName: '',
    motherMaidenName: '',
    spouseName: '',
    dobYear: '',
    dobMonth: '',
    dobDay: '',
    placeOfBirth: '',
    sex: '',
    civilStatus: '',
    citizenship: '',
    philSysIDNum: '',
    tin: '',
    permanentAddress: '',
    mailingAddress: '',
    sameAsPermanent: false,
    homePhoneNum: '',
    mobileNum: '',
    businessDirectLine: '',
    emailAddress: '',
    monthlyIncome: '',
    profession: '',
    memberType: 'Employed Private',
    proofOfIncome: 'Certificate of Employment, Bank Statements, Income Tax Return (ITR)',
    professionID: '',
    agreeTerms: false,
    agreeConsent: false,
  });

  const [dependents, setDependents] = useState<Dependent[]>([
    {
      dependentName: '',
      dependentRelationship: 'Family',
      dependentDOBYear: '',
      dependentDOBMonth: '',
      dependentDOBDay: '',
      dependentCitizenship: '',
      permanentDisability: '',
    },
  ]);

  const update = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addDependent = () => {
    setDependents(prev => [
      ...prev,
      {
        dependentName: '',
        dependentRelationship: 'Family',
        dependentDOBYear: '',
        dependentDOBMonth: '',
        dependentDOBDay: '',
        dependentCitizenship: '',
        permanentDisability: '',
      },
    ]);
  };

  const updateDependent = (index: number, field: string, value: string) => {
    setDependents(prev => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  };

  const removeDependent = (index: number) => {
    setDependents(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else router.back();
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // ── SUCCESS SCREEN ──────────────────────────────────────────
  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successHeader}>
          <View style={styles.headerLogoRow}>
            <View style={styles.headerLogoDot} />
            <Text style={styles.headerLogoText}>PhilHealth</Text>
          </View>
        </View>
        <Text style={styles.formTitle}>New Membership{'\n'}Registration Form</Text>
        <Text style={styles.stepSubtitle}>Application Submitted!</Text>

        <View style={styles.successCard}>
          <View style={styles.successIconBox}>
            <IconSymbol size={64} name="checkmark.seal.fill" color="#3aaa35" />
          </View>
          <Text style={styles.successTitle}>Membership Application Form{'\n'}Successfully Submitted!</Text>
          <TouchableOpacity
            style={styles.viewFormBtn}
            onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.viewFormText}>View Form</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const progressFill = ((step + 1) / 4) * 100;

  return (
    <View style={styles.outerContainer}>
      {/* Fixed Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backCircle} onPress={handleBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerLogoRow}>
          <View style={styles.headerLogoDot} />
          <Text style={styles.headerLogoText}>PhilHealth</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {/* Title & Progress */}
        <View style={styles.titleSection}>
          <Text style={styles.formTitle}>New Membership{'\n'}Registration Form</Text>
          <Text style={styles.stepSubtitle}>
            {step < 3
              ? `Step ${step + 1} of 3: ${STEPS[step]}`
              : 'Submission Confirmation'}
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressFill}%` as any }]} />
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
              <TextInput style={styles.input} placeholder="Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={form.memberName} onChangeText={v => update('memberName', v)} />
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
                  <TouchableOpacity
                    key={opt}
                    style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]}
                    onPress={() => update('sex', opt)}>
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
              <TouchableOpacity
                style={styles.checkRow}
                onPress={() => update('sameAsPermanent', !form.sameAsPermanent)}>
                <View style={[styles.checkbox, form.sameAsPermanent && styles.checkboxChecked]}>
                  {form.sameAsPermanent && <Text style={styles.checkMark}>✓</Text>}
                </View>
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
                <Text style={styles.proofText}>{form.proofOfIncome}</Text>
                <View style={styles.uploadBtn}>
                  <Text style={styles.uploadText}>Upload a File  ↑</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addMoreBtn}>
                <Text style={styles.addMoreText}>+ Add More</Text>
              </TouchableOpacity>
            </Field>

            <Field label="Profession ID">
              <TextInput style={styles.input} placeholder="X000" placeholderTextColor="#bbb" value={form.professionID} onChangeText={v => update('professionID', v)} />
            </Field>

            <BottomActions
              onSave={() => Alert.alert('Progress Saved', 'Your progress has been saved.')}
              onContinue={handleNext}
              continueLabel="Continue"
              agreeTerms={form.agreeTerms}
              agreeConsent={form.agreeConsent}
              onToggleTerms={() => update('agreeTerms', !form.agreeTerms)}
              onToggleConsent={() => update('agreeConsent', !form.agreeConsent)}
            />
          </View>
        )}

        {/* ── STEP 1: Dependent Declaration ── */}
        {step === 1 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Declaration of Dependents</Text>

            {dependents.map((dep, index) => (
              <View key={index} style={styles.dependentCard}>
                <View style={styles.dependentHeader}>
                  <Text style={styles.dependentTitle}>Dependent {index + 1}</Text>
                  {index > 0 && (
                    <TouchableOpacity onPress={() => removeDependent(index)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Field label="Dependent Name">
                  <TextInput style={styles.input} placeholder="Last Name, First Name, Middle Initial" placeholderTextColor="#bbb" value={dep.dependentName} onChangeText={v => updateDependent(index, 'dependentName', v)} />
                </Field>

                <Field label="Dependent's Relationship with the Member">
                  <TextInput style={styles.input} placeholder="Family" placeholderTextColor="#bbb" value={dep.dependentRelationship} onChangeText={v => updateDependent(index, 'dependentRelationship', v)} />
                </Field>

                <Field label="Date of Birth">
                  <View style={styles.triRow}>
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb" value={dep.dependentDOBYear} onChangeText={v => updateDependent(index, 'dependentDOBYear', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Month" placeholderTextColor="#bbb" value={dep.dependentDOBMonth} onChangeText={v => updateDependent(index, 'dependentDOBMonth', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Day" placeholderTextColor="#bbb" value={dep.dependentDOBDay} onChangeText={v => updateDependent(index, 'dependentDOBDay', v)} keyboardType="numeric" />
                  </View>
                </Field>

                <Field label="Citizenship">
                  <View style={styles.dropdownBox}>
                    <TextInput style={styles.dropdownInput} placeholder="Select current Citizenship/Nationality" placeholderTextColor="#bbb" value={dep.dependentCitizenship} onChangeText={v => updateDependent(index, 'dependentCitizenship', v)} />
                    <Text style={styles.dropdownCaret}>⌄</Text>
                  </View>
                </Field>

                <Field label="Dependent with Permanent Disability?">
                  <View style={styles.toggleRow}>
                    {['Yes', 'No'].map(opt => (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.toggleBtn, dep.permanentDisability === opt && styles.toggleBtnActive]}
                        onPress={() => updateDependent(index, 'permanentDisability', opt)}>
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
              onSave={() => Alert.alert('Progress Saved', 'Your progress has been saved.')}
              onContinue={handleNext}
              continueLabel="Continue"
              agreeTerms={form.agreeTerms}
              agreeConsent={form.agreeConsent}
              onToggleTerms={() => update('agreeTerms', !form.agreeTerms)}
              onToggleConsent={() => update('agreeConsent', !form.agreeConsent)}
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
                  <TouchableOpacity
                    key={opt}
                    style={[styles.memberTypeBtn, form.memberType === opt && styles.memberTypeBtnActive]}
                    onPress={() => update('memberType', opt)}>
                    <Text style={[styles.memberTypeText, form.memberType === opt && styles.memberTypeTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>

            <BottomActions
              onSave={() => Alert.alert('Progress Saved', 'Your progress has been saved.')}
              onContinue={handleNext}
              continueLabel="Submit Application Form"
              submitStyle
              agreeTerms={form.agreeTerms}
              agreeConsent={form.agreeConsent}
              onToggleTerms={() => update('agreeTerms', !form.agreeTerms)}
              onToggleConsent={() => update('agreeConsent', !form.agreeConsent)}
            />
          </View>
        )}

        {/* ── STEP 3: Confirmation ── */}
        {step === 3 && (
          <View style={styles.formBody}>
            <View style={styles.warningBox}>
              <Text style={styles.warningLabel}>⚠ Warning</Text>
              <Text style={styles.warningText}>Before submitting the form, please make sure to double check your information.</Text>
            </View>

            <Text style={styles.sectionHeading}>I. Personal Details</Text>

            <ReviewRow label="Preferred Konsulta Provider" value={form.konSulTaProvider} placeholder="e.g. Victory Medical Center" />
            <ReviewRow label="Member Name" value={form.memberName} placeholder="Last Name, First Name, Middle Initial" />
            <ReviewRow label="Mother's Maiden Name" value={form.motherMaidenName} placeholder="Last Name, First Name, Middle Initial" />
            <ReviewRow label="Spouse Name" value={form.spouseName} placeholder="N/A if not applicable, Last Name, First Name, Middle Initial" />
            <ReviewRow label="Date of Birth" value={[form.dobYear, form.dobMonth, form.dobDay].filter(Boolean).join(' / ')} placeholder="Year / Month / Day" />
            <ReviewRow label="Place of Birth" value={form.placeOfBirth} placeholder="City/Province" />
            <ReviewRow label="Sex" value={form.sex} placeholder="—" />
            <ReviewRow label="Civil Status" value={form.civilStatus} placeholder="—" />
            <ReviewRow label="Citizenship" value={form.citizenship} placeholder="—" />
            <ReviewRow label="Philsys ID Number" value={form.philSysIDNum} placeholder="0000-0000-0000" />
            <ReviewRow label="Tax Payer Identification Number" value={form.tin} placeholder="000-000-000" />

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <ReviewRow label="Permanent Address" value={form.permanentAddress} placeholder="Street, Barangay, City/Province" />
            <ReviewRow label="Mailing Address" value={form.mailingAddress} placeholder="Street, Barangay, City/Province" />
            <ReviewRow label="Home Phone Number" value={form.homePhoneNum} placeholder="09XX-XXX-XXXX" />
            <ReviewRow label="Mobile Number" value={form.mobileNum} placeholder="09XX-XXX-XXXX" />
            <ReviewRow label="Email Address" value={form.emailAddress} placeholder="email@gmail.com" />

            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.checkRow}
                onPress={() => update('agreeTerms', !form.agreeTerms)}>
                <View style={[styles.checkbox, form.agreeTerms && styles.checkboxChecked]}>
                  {form.agreeTerms && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.checkLabel}>I agree with the terms and condition</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkRow}
                onPress={() => update('agreeConsent', !form.agreeConsent)}>
                <View style={[styles.checkbox, form.agreeConsent && styles.checkboxChecked]}>
                  {form.agreeConsent && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.checkLabel}>I give consent to use the following personal informations</Text>
              </TouchableOpacity>

              <View style={styles.confirmBtnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(2)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit Application Form</Text>
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

// ── Helper Components ────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function ReviewRow({ label, value, placeholder }: { label: string; value: string; placeholder: string }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.reviewInput}>
        <Text style={value ? styles.reviewValue : styles.reviewPlaceholder}>
          {value || placeholder}
        </Text>
      </View>
    </View>
  );
}

function BottomActions({
  onSave,
  onContinue,
  continueLabel,
  submitStyle,
  agreeTerms,
  agreeConsent,
  onToggleTerms,
  onToggleConsent,
}: {
  onSave: () => void;
  onContinue: () => void;
  continueLabel: string;
  submitStyle?: boolean;
  agreeTerms: boolean;
  agreeConsent: boolean;
  onToggleTerms: () => void;
  onToggleConsent: () => void;
}) {
  return (
    <View style={styles.bottomActions}>
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveBtnText}>Save current progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueBtn, submitStyle && styles.submitBtnStyle]}
          onPress={onContinue}>
          <Text style={styles.continueBtnText}>{continueLabel}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.checkRow} onPress={onToggleTerms}>
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
          {agreeTerms && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.checkLabel}>I agree with the terms and condition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkRow} onPress={onToggleConsent}>
        <View style={[styles.checkbox, agreeConsent && styles.checkboxChecked]}>
          {agreeConsent && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.checkLabel}>I give consent to use the following personal informations</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollBody: {
    flex: 1,
  },

  // Header
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    marginTop: -2,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerLogoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3aaa35',
  },
  headerLogoText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },

  // Title & Progress
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    lineHeight: 30,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#3aaa35',
    borderRadius: 3,
  },

  // Form Body
  formBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginTop: 16,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    marginTop: -6,
  },

  // Fields
  fieldWrapper: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#333',
  },
  triRow: {
    flexDirection: 'row',
    gap: 8,
  },
  triInput: {
    flex: 1,
  },
  dropdownBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  dropdownCaret: {
    fontSize: 18,
    color: '#888',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleBtn: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 9,
    backgroundColor: '#f4f4f4',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  toggleBtnActive: {
    backgroundColor: '#3aaa35',
    borderColor: '#3aaa35',
  },
  toggleText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#3aaa35',
    borderColor: '#3aaa35',
  },
  checkMark: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
  },
  checkLabel: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },

  // Proof of Income
  proofBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proofText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  uploadBtn: {
    marginLeft: 8,
  },
  uploadText: {
    fontSize: 12,
    color: '#3aaa35',
    fontWeight: '600',
  },
  addMoreBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginTop: 8,
  },
  addMoreText: {
    fontSize: 13,
    color: '#3aaa35',
    fontWeight: '600',
  },

  // Dependents
  dependentCard: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dependentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dependentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  removeText: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '500',
  },
  addDependentBtn: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#3aaa35',
    borderStyle: 'dashed',
  },
  addDependentText: {
    fontSize: 14,
    color: '#3aaa35',
    fontWeight: '600',
  },

  // Member Type options
  memberTypeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  memberTypeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#f4f4f4',
  },
  memberTypeBtnActive: {
    backgroundColor: '#3aaa35',
    borderColor: '#3aaa35',
  },
  memberTypeText: {
    fontSize: 12,
    color: '#555',
  },
  memberTypeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Review / Confirmation
  reviewInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  reviewValue: {
    fontSize: 14,
    color: '#333',
  },
  reviewPlaceholder: {
    fontSize: 14,
    color: '#bbb',
  },
  warningBox: {
    backgroundColor: '#fff8e1',
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC200',
    marginBottom: 16,
  },
  warningLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e65100',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },

  // Bottom Actions
  bottomActions: {
    marginTop: 24,
    marginBottom: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveBtnText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  continueBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#3aaa35',
    alignItems: 'center',
  },
  submitBtnStyle: {
    backgroundColor: '#3aaa35',
  },
  continueBtnText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },

  // Confirmation actions
  confirmActions: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1.6,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#3aaa35',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },

  // Success screen
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  successHeader: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  successCard: {
    margin: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  successIconBox: {
    width: 100,
    height: 100,
    backgroundColor: '#e8f5e9',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  viewFormBtn: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ddd',
  },
  viewFormText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});