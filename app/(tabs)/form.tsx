import { addMember } from '@/stores/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Dependent = {
  dependentName: string;
  dependentRelationship: string;
  dependentDOBYear: string;
  dependentDOBMonth: string;
  dependentDOBDay: string;
  dependentCitizenship: string;
  permanentDisability: string;
};

const STEPS = ['Personal Details', 'Dependent Declaration', 'Member type'];

function PageHeader({ onBack, onForward }: { onBack: () => void; onForward?: () => void }) {
  return (
    <View style={styles.topHeader}>
      <TouchableOpacity style={styles.navCircle} onPress={onBack}>
        <Text style={styles.navArrow}>‹</Text>
      </TouchableOpacity>
      <View style={styles.headerLogoRow}>
        <Image source={require('@/assets/images/philhealth_logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerLogoText}>PhilHealth</Text>
      </View>
      {onForward
        ? <TouchableOpacity style={styles.navCircle} onPress={onForward}><Text style={styles.navArrow}>›</Text></TouchableOpacity>
        : <View style={{ width: 36 }} />}
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

function ReviewField({ label, value, placeholder, isDropdown }: { label: string; value?: string; placeholder: string; isDropdown?: boolean }) {
  return (
    <Field label={label}>
      <View style={isDropdown ? styles.dropdownBox : styles.input}>
        <Text style={{ flex: 1, fontSize: 14, color: value ? '#333' : '#bbb' }}>{value || placeholder}</Text>
        {isDropdown && <Text style={styles.dropdownCaret}>⌄</Text>}
      </View>
    </Field>
  );
}

// Generic dropdown/select field — opens a modal list of options
function SelectField({
  label,
  value,
  placeholder,
  options,
  onSelect,
  disabled,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Field label={label}>
      <TouchableOpacity
        style={[styles.dropdownBox, disabled && styles.disabledBox]}
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}>
        <Text style={{ flex: 1, fontSize: 14, color: value ? '#333' : '#bbb' }}>{value || placeholder}</Text>
        <Text style={styles.dropdownCaret}>⌄</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => { onSelect(item); setOpen(false); }}>
                  <Text style={[styles.modalOptionText, item === value && styles.modalOptionTextActive]}>{item}</Text>
                  {item === value && <Text style={styles.modalCheck}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Field>
  );
}

// Month/Day picker pair for Date of Birth
function MonthDayYearField({
  label,
  year,
  month,
  day,
  onChangeYear,
  onChangeMonth,
  onChangeDay,
}: {
  label: string;
  year: string;
  month: string;
  day: string;
  onChangeYear: (v: string) => void;
  onChangeMonth: (v: string) => void;
  onChangeDay: (v: string) => void;
}) {
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  return (
    <Field label={label}>
      <View style={styles.triRow}>
        <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb"
          value={year} onChangeText={onChangeYear} keyboardType="numeric" maxLength={4} />
        <View style={[styles.triInput]}>
          <InlinePicker placeholder="Month" value={month} options={months} onSelect={onChangeMonth} />
        </View>
        <View style={[styles.triInput]}>
          <InlinePicker placeholder="Day" value={day} options={days} onSelect={onChangeDay} />
        </View>
      </View>
    </Field>
  );
}

// Small inline picker used for Month/Day — same visual size as a triInput
function InlinePicker({ placeholder, value, options, onSelect }: { placeholder: string; value: string; options: string[]; onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={[styles.input, styles.triPickerInput]} onPress={() => setOpen(true)}>
        <Text style={{ fontSize: 14, color: value ? '#333' : '#bbb' }}>{value || placeholder}</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{placeholder}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              numColumns={6}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalGridOption, item === value && styles.modalGridOptionActive]}
                  onPress={() => { onSelect(item); setOpen(false); }}>
                  <Text style={[styles.modalGridOptionText, item === value && styles.modalOptionTextActive]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default function MembershipForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    konSulTaProvider: '',
    memberName: '',
    motherMaidenName: '',
    spouseName: '',
    dobYear: '', dobMonth: '', dobDay: '',
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
    homePhoneNA: false,
    mobileNum: '',
    businessDirectLine: '',
    emailAddress: '',
    monthlyIncome: '',
    profession: '',
    memberType: 'Employed Private',
    proofOfIncome: 'Certificate of Employment',
    proofOfIncomeType: '',
    professionID: '',
    agreeTerms: false,
    agreeConsent: false,
  });

  const [dependents, setDependents] = useState<Dependent[]>([{
    dependentName: '', dependentRelationship: 'Family',
    dependentDOBYear: '', dependentDOBMonth: '', dependentDOBDay: '',
    dependentCitizenship: '', permanentDisability: '',
  }]);

  const update = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));
  const updateDependent = (index: number, field: string, value: string) =>
    setDependents(prev => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  const addDependent = () => setDependents(prev => [...prev, {
    dependentName: '', dependentRelationship: 'Family',
    dependentDOBYear: '', dependentDOBMonth: '', dependentDOBDay: '',
    dependentCitizenship: '', permanentDisability: '',
  }]);
  const removeDependent = (index: number) => setDependents(prev => prev.filter((_, i) => i !== index));

  // Auto-fill Mailing Address with Permanent Address when "Same as Permanent" is checked.
  // Unchecking clears it back to empty so the user can enter a different address.
  useEffect(() => {
    if (form.sameAsPermanent) {
      setForm(prev => ({ ...prev, mailingAddress: prev.permanentAddress }));
    }
  }, [form.sameAsPermanent, form.permanentAddress]);

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else router.push('/(tabs)/explore');
  };

  const generatePIN = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `0010-0123-${random}`;
  };

  const formatDate = (year: string, month: string, day: string) => {
    const y = year.padStart(4, '0');
    const m = month.padStart(2, '0');
    const d = day.padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const handleSubmit = async () => {
    if (!form.agreeTerms || !form.agreeConsent) {
      Alert.alert('Required', 'Please agree to the terms and consent.');
      return;
    }

    setSubmitting(true);

    try {
      const newPIN = generatePIN();

      const memberData = {
        PIN: newPIN,
        Purpose: 'Registration',
        KonSultaProvider: form.konSulTaProvider,
        MemberName: form.memberName,
        MotherMaidenName: form.motherMaidenName,
        SpouseName: form.spouseName || 'N/A',
        DateOfBirth: formatDate(form.dobYear, form.dobMonth, form.dobDay),
        PlaceOfBirth: form.placeOfBirth,
        Sex: form.sex,
        CivilStatus: form.civilStatus,
        Citizenship: form.citizenship,
        PhilSysIDNum: form.philSysIDNum || 'N/A',
        TIN: form.tin || 'N/A',
        PermanentAddress: form.permanentAddress,
        MailingAddress: form.mailingAddress || 'SAME AS ABOVE',
        HomePhoneNum: form.homePhoneNA ? 'N/A' : (form.homePhoneNum || 'N/A'),
        MobileNum: form.mobileNum,
        BusinessDirectLine: form.businessDirectLine || 'N/A',
        EmailAddress: form.emailAddress,
        MonthlyIncome: form.monthlyIncome,
        Profession: form.profession,
        ProofOfIncome: form.proofOfIncomeType || form.proofOfIncome,
        ProfessionID: form.professionID,
      };

      const memberRes = await addMember(memberData);
      console.log('Member added:', memberRes);

      if (memberRes.success) {
        // Add dependents
        for (const dep of dependents) {
          if (dep.dependentName.trim()) {
            const depData = {
              DependentName: dep.dependentName,
              DepenedentRelationship: dep.dependentRelationship,
              DependentDOB: formatDate(dep.dependentDOBYear, dep.dependentDOBMonth, dep.dependentDOBDay),
              DependentCitizenship: dep.dependentCitizenship,
              DependentPermanentDisability: dep.permanentDisability,
            };
            await addDependent(newPIN, depData);
          }
        }

        Alert.alert('Success', `Member registered with PIN: ${newPIN}`);
        setSubmitted(true);
      } else {
        Alert.alert('Error', memberRes.error || 'Failed to add member');
      }
    } catch (err) {
      console.error('Submit error:', err);
      Alert.alert('Error', 'Could not connect to server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successHeader}>
          <TouchableOpacity style={styles.navCircle} onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerLogoRow}>
            <Image source={require('@/assets/images/philhealth_logo.png')} style={styles.headerLogo} />
            <Text style={styles.headerLogoText}>PhilHealth</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <LinearGradient
          colors={['#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successGradient}>
          <View style={styles.successCheckCircle}>
            <Text style={styles.successCheckMark}>✓</Text>
          </View>
        </LinearGradient>

        <View style={styles.successBody}>
          <Text style={styles.successTitle}>Membership Application Form{'\n'}Successfully Submitted!</Text>
          <Text style={styles.successSubtitle}>Your new membership registration form has been successfully submitted and recorded!</Text>
          <LinearGradient
            colors={['#3aaa35', '#7dc142', '#c8e04a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.viewFormBtnGradient}>
            <TouchableOpacity
              style={styles.viewFormBtnInner}
              onPress={() => router.push('/(tabs)/revalidation' as any)}>
              <Text style={styles.viewFormBtnText}>View Form</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }

  const progressFill = ((step + 1) / 4) * 100;

  return (
    <View style={styles.outerContainer}>
      <PageHeader onBack={handleBack} onForward={step < 3 ? () => setStep(Math.min(step + 1, 3)) : undefined} />

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.formTitle}>New Membership{'\n'}Registration Form</Text>
          <Text style={styles.stepSubtitle}>
            {step < 3 ? `Step ${step + 1} of 3: ${STEPS[step]}` : 'Submission Confirmation'}
          </Text>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={['#3aaa35', '#7dc142', '#c8e04a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progressFill}%` as any }]}
            />
          </View>
        </View>

        {step === 0 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>

            <Field label="Preferred Konsulta Provider">
              <TextInput style={styles.input} placeholder="e.g. Victory Medical Center" placeholderTextColor="#bbb"
                value={form.konSulTaProvider} onChangeText={v => update('konSulTaProvider', v)} />
            </Field>
            <Field label="Member Name">
              <TextInput style={styles.input} placeholder="First Name, Middle Initial, Last Name" placeholderTextColor="#bbb"
                value={form.memberName} onChangeText={v => update('memberName', v)} />
            </Field>
            <Field label="Mother's Maiden Name">
              <TextInput style={styles.input} placeholder="First Name, Middle Initial, Last Name" placeholderTextColor="#bbb"
                value={form.motherMaidenName} onChangeText={v => update('motherMaidenName', v)} />
            </Field>
            <Field label="Spouse Name">
              <TextInput style={styles.input} placeholder="N/A if not applicable, First Name, Middle Initial, Last Name" placeholderTextColor="#bbb"
                value={form.spouseName} onChangeText={v => update('spouseName', v)} />
            </Field>
            <MonthDayYearField
              label="Date of Birth"
              year={form.dobYear} month={form.dobMonth} day={form.dobDay}
              onChangeYear={v => update('dobYear', v)}
              onChangeMonth={v => update('dobMonth', v)}
              onChangeDay={v => update('dobDay', v)}
            />
            <Field label="Place of Birth">
              <View style={styles.dropdownBox}>
                <TextInput style={[styles.dropdownInput]} placeholder="City/Province" placeholderTextColor="#bbb"
                  value={form.placeOfBirth} onChangeText={v => update('placeOfBirth', v)} />
                <Text style={styles.dropdownCaret}>⌄</Text>
              </View>
            </Field>
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <TouchableOpacity key={opt} style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]}
                    onPress={() => update('sex', opt)}>
                    <Text style={[styles.toggleText, form.sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>
            <SelectField
              label="Civil Status"
              value={form.civilStatus}
              placeholder="Select current civil status"
              options={['Single', 'Married', 'Widowed', 'Legally Separated']}
              onSelect={v => update('civilStatus', v)}
            />
            <SelectField
              label="Citizenship"
              value={form.citizenship}
              placeholder="Select current Citizenship/Nationality"
              options={['Filipino', 'Other']}
              onSelect={v => update('citizenship', v)}
            />
            <Field label="Philsys ID Number">
              <TextInput style={styles.input} placeholder="0000-0000-0000" placeholderTextColor="#bbb"
                value={form.philSysIDNum} onChangeText={v => update('philSysIDNum', v)} />
            </Field>
            <Field label="Tax Payer Identification Number">
              <TextInput style={styles.input} placeholder="000-000-000" placeholderTextColor="#bbb"
                value={form.tin} onChangeText={v => update('tin', v)} keyboardType="numeric" />
            </Field>

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <Field label="Permanent Address">
              <TextInput style={styles.input} placeholder="Street, Barangay, City/Province" placeholderTextColor="#bbb"
                value={form.permanentAddress} onChangeText={v => update('permanentAddress', v)} />
            </Field>
            <Field label="Mailing Address">
              <TextInput
                style={[styles.input, form.sameAsPermanent && styles.disabledBox]}
                placeholder="Street, Barangay, City/Province" placeholderTextColor="#bbb"
                value={form.mailingAddress} onChangeText={v => update('mailingAddress', v)}
                editable={!form.sameAsPermanent} />
            </Field>
            <TouchableOpacity style={styles.checkRow} onPress={() => update('sameAsPermanent', !form.sameAsPermanent)}>
              <View style={[styles.checkbox, form.sameAsPermanent && styles.checkboxChecked]}>
                {form.sameAsPermanent && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.checkLabel}>Same as Permanent Address</Text>
            </TouchableOpacity>
            <Field label="Home Phone Number">
              <View style={styles.triRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }, form.homePhoneNA && styles.disabledBox]}
                  placeholder="09XX-XXX-XXXX" placeholderTextColor="#bbb"
                  value={form.homePhoneNA ? 'N/A' : form.homePhoneNum}
                  onChangeText={v => update('homePhoneNum', v)}
                  keyboardType="phone-pad"
                  editable={!form.homePhoneNA} />
                <TouchableOpacity
                  style={[styles.naToggle, form.homePhoneNA && styles.naToggleActive]}
                  onPress={() => update('homePhoneNA', !form.homePhoneNA)}>
                  <Text style={[styles.naToggleText, form.homePhoneNA && styles.naToggleTextActive]}>N/A</Text>
                </TouchableOpacity>
              </View>
            </Field>
            <Field label="Mobile Number">
              <TextInput style={styles.input} placeholder="09XX-XXX-XXXX" placeholderTextColor="#bbb"
                value={form.mobileNum} onChangeText={v => update('mobileNum', v)} keyboardType="phone-pad" />
            </Field>
            <Field label="Business (Direct Line)">
              <TextInput style={styles.input} placeholder="N/A if not applicable" placeholderTextColor="#bbb"
                value={form.businessDirectLine} onChangeText={v => update('businessDirectLine', v)} />
            </Field>
            <Field label="Email Address">
              <TextInput style={styles.input} placeholder="email@gmail.com" placeholderTextColor="#bbb"
                value={form.emailAddress} onChangeText={v => update('emailAddress', v)} keyboardType="email-address" />
            </Field>

            <Text style={styles.sectionHeading}>III. Profession</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Monthly Income">
              <TextInput style={styles.input} placeholder="e.g. 150000" placeholderTextColor="#bbb"
                value={form.monthlyIncome} onChangeText={v => update('monthlyIncome', v)} keyboardType="numeric" />
            </Field>
            <Field label="Profession">
              <TextInput style={styles.input} placeholder="e.g Doctor, Nurse, Teacher" placeholderTextColor="#bbb"
                value={form.profession} onChangeText={v => update('profession', v)} />
            </Field>
            <SelectField
              label="Proof of Income Type"
              value={form.proofOfIncomeType ?? ''}
              placeholder="Select proof of income type"
              options={['Certificate of Employment', 'Bank Statements', 'ITR', 'PRC License', 'Government Payslip', 'Business Registration']}
              onSelect={v => update('proofOfIncomeType', v)}
            />
            <Field label="Proof of Income">
              <View style={styles.proofBox}>
                <Text style={styles.proofText}>{form.proofOfIncomeType || form.proofOfIncome}</Text>
                <TouchableOpacity style={styles.uploadBtn}>
                  <Text style={styles.uploadText}>Upload a File ↑</Text>
                </TouchableOpacity>
              </View>
            </Field>
            <TouchableOpacity style={styles.addMoreBtn}>
              <Text style={styles.addMoreText}>+ Add More</Text>
            </TouchableOpacity>
            <Field label="Profession ID">
              <TextInput style={styles.input} placeholder="P001, P002, P003, P004, or P005" placeholderTextColor="#bbb"
                value={form.professionID} onChangeText={v => update('professionID', v)} />
            </Field>

            <View style={styles.bottomActions}>
              <View style={styles.actionBtnRow}>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save current progress</Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#3aaa35', '#7dc142', '#c8e04a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueBtnGradient}>
                  <TouchableOpacity style={styles.continueBtnInner} onPress={() => setStep(1)}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

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
                  <TextInput style={styles.input} placeholder="First Name, Middle Initial, Last Name" placeholderTextColor="#bbb"
                    value={dep.dependentName} onChangeText={v => updateDependent(index, 'dependentName', v)} />
                </Field>
                <Field label="Dependent's Relationship with the Member">
                  <TextInput style={styles.input} placeholder="Family" placeholderTextColor="#bbb"
                    value={dep.dependentRelationship} onChangeText={v => updateDependent(index, 'dependentRelationship', v)} />
                </Field>
                <MonthDayYearField
                  label="Date of Birth"
                  year={dep.dependentDOBYear} month={dep.dependentDOBMonth} day={dep.dependentDOBDay}
                  onChangeYear={v => updateDependent(index, 'dependentDOBYear', v)}
                  onChangeMonth={v => updateDependent(index, 'dependentDOBMonth', v)}
                  onChangeDay={v => updateDependent(index, 'dependentDOBDay', v)}
                />
                <SelectField
                  label="Citizenship"
                  value={dep.dependentCitizenship}
                  placeholder="Select current Citizenship/Nationality"
                  options={['Filipino', 'Other']}
                  onSelect={v => updateDependent(index, 'dependentCitizenship', v)}
                />
                <Field label="Dependent with Permanent Disability?">
                  <View style={styles.toggleRow}>
                    {['Yes', 'No'].map(opt => (
                      <TouchableOpacity key={opt}
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

            <View style={styles.bottomActions}>
              <View style={styles.actionBtnRow}>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save current progress</Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#3aaa35', '#7dc142', '#c8e04a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueBtnGradient}>
                  <TouchableOpacity style={styles.continueBtnInner} onPress={() => setStep(2)}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Member Type</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Profession ID">
              <TextInput style={styles.input} placeholder="P001, P002, P003, P004, or P005" placeholderTextColor="#bbb"
                value={form.professionID} onChangeText={v => update('professionID', v)} />
            </Field>
            <SelectField
              label="Member Type/Profession"
              value={form.memberType}
              placeholder="Employed Private"
              options={['Employed Private', 'Employed Government', 'Self-Earning Individual', 'Sole Proprietor', 'Professional Practitioner']}
              onSelect={v => update('memberType', v)}
            />

            <View style={styles.bottomActions}>
              <View style={styles.actionBtnRow}>
                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save current progress</Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#3aaa35', '#7dc142', '#c8e04a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.continueBtnGradient}>
                  <TouchableOpacity style={styles.continueBtnInner} onPress={() => setStep(3)}>
                    <Text style={styles.continueBtnText}>Submit Application Form</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.formBody}>
            <View style={styles.warningBox}>
              <Text style={styles.warningLabel}>⚠ Warning</Text>
              <Text style={styles.warningText}>Before clicking the submit button, please make sure to double check your information.</Text>
            </View>

            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <ReviewField label="Preferred Konsulta Provider" value={form.konSulTaProvider} placeholder="e.g. Victory Medical Center" />
            <ReviewField label="Member Name" value={form.memberName} placeholder="First Name, Middle Initial, Last Name" />
            <ReviewField label="Mother's Maiden Name" value={form.motherMaidenName} placeholder="First Name, Middle Initial, Last Name" />
            <ReviewField label="Spouse Name" value={form.spouseName} placeholder="N/A if not applicable, First Name, Middle Initial, Last Name" />
            <Field label="Date of Birth">
              <View style={styles.triRow}>
                <View style={[styles.input, styles.triInput]}><Text style={{ color: form.dobYear ? '#333' : '#bbb' }}>{form.dobYear || 'Year'}</Text></View>
                <View style={[styles.input, styles.triInput]}><Text style={{ color: form.dobMonth ? '#333' : '#bbb' }}>{form.dobMonth || 'Month'}</Text></View>
                <View style={[styles.input, styles.triInput]}><Text style={{ color: form.dobDay ? '#333' : '#bbb' }}>{form.dobDay || 'Day'}</Text></View>
              </View>
            </Field>
            <ReviewField label="Place of Birth" value={form.placeOfBirth} placeholder="City/Province" isDropdown />
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <View key={opt} style={[styles.toggleBtn, form.sex === opt && styles.toggleBtnActive]}>
                    <Text style={[styles.toggleText, form.sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </View>
                ))}
              </View>
            </Field>
            <ReviewField label="Civil Status" value={form.civilStatus} placeholder="Select current civil status" isDropdown />
            <ReviewField label="Citizenship" value={form.citizenship} placeholder="Select current Citizenship/Nationality" isDropdown />
            <ReviewField label="Philsys ID Number" value={form.philSysIDNum} placeholder="0000-0000-0000" />
            <ReviewField label="Tax Payer Identification Number" value={form.tin} placeholder="000-000-000" />

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <ReviewField label="Permanent Address" value={form.permanentAddress} placeholder="Street, Barangay, City/Province" />
            <ReviewField label="Mailing Address" value={form.mailingAddress} placeholder="Street, Barangay, City/Province" />
            <ReviewField label="Home Phone Number" value={form.homePhoneNA ? 'N/A' : form.homePhoneNum} placeholder="09XX-XXX-XXXX" />
            <ReviewField label="Mobile Number:" value={form.mobileNum} placeholder="09XX-XXX-XXXX" />
            <ReviewField label="Business (Direct Line)" value={form.businessDirectLine} placeholder="N/A if not applicable" />
            <ReviewField label="Email Address" value={form.emailAddress} placeholder="email@gmail.com" />

            <Text style={styles.sectionHeading}>III. Profession</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <ReviewField label="Monthly Income" value={form.monthlyIncome} placeholder="e.g. 150000" />
            <ReviewField label="Profession" value={form.profession} placeholder="e.g Doctor, Nurse, Teacher" />
            <ReviewField label="Proof of Income Type" value={form.proofOfIncomeType} placeholder="Select proof of income type" isDropdown />
            <Field label="Proof of Income">
              <View style={styles.proofBox}>
                <Text style={styles.proofText}>{form.proofOfIncomeType || form.proofOfIncome}</Text>
                <TouchableOpacity style={styles.uploadBtn}>
                  <Text style={styles.uploadText}>Upload a File ↑</Text>
                </TouchableOpacity>
              </View>
            </Field>
            <TouchableOpacity style={styles.addMoreBtn}>
              <Text style={styles.addMoreText}>+ Add More</Text>
            </TouchableOpacity>
            <ReviewField label="Profession ID" value={form.professionID} placeholder="P001, P002, P003, P004, or P005" />

            {dependents.length > 0 && (
              <>
                <Text style={styles.sectionHeading}>IV. Declaration of Dependents</Text>
                {dependents.map((dep, index) => (
                  <View key={index} style={styles.dependentCard}>
                    <Text style={styles.dependentTitle}>Dependent {index + 1}</Text>
                    <Field label="Dependent Name">
                      <View style={styles.input}><Text style={{ color: dep.dependentName ? '#333' : '#bbb' }}>{dep.dependentName || 'First Name, Middle Initial, Last Name'}</Text></View>
                    </Field>
                    <Field label="Dependent's Relationship with the Member">
                      <View style={styles.input}><Text style={{ color: '#333' }}>{dep.dependentRelationship}</Text></View>
                    </Field>
                    <Field label="Date of Birth">
                      <View style={styles.triRow}>
                        <View style={[styles.input, styles.triInput]}><Text style={{ color: dep.dependentDOBYear ? '#333' : '#bbb' }}>{dep.dependentDOBYear || 'Year'}</Text></View>
                        <View style={[styles.input, styles.triInput]}><Text style={{ color: dep.dependentDOBMonth ? '#333' : '#bbb' }}>{dep.dependentDOBMonth || 'Month'}</Text></View>
                        <View style={[styles.input, styles.triInput]}><Text style={{ color: dep.dependentDOBDay ? '#333' : '#bbb' }}>{dep.dependentDOBDay || 'Day'}</Text></View>
                      </View>
                    </Field>
                    <ReviewField label="Citizenship" value={dep.dependentCitizenship} placeholder="Select citizenship" isDropdown />
                    <Field label="Dependent with Permanent Disability?">
                      <View style={styles.toggleRow}>
                        {['Yes', 'No'].map(opt => (
                          <View key={opt} style={[styles.toggleBtn, dep.permanentDisability === opt && styles.toggleBtnActive]}>
                            <Text style={[styles.toggleText, dep.permanentDisability === opt && styles.toggleTextActive]}>{opt}</Text>
                          </View>
                        ))}
                      </View>
                    </Field>
                  </View>
                ))}
              </>
            )}

            <Text style={styles.sectionHeading}>IV. Member Type</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <ReviewField label="Profession ID" value={form.professionID} placeholder="P001, P002, P003, P004, or P005" />
            <ReviewField label="Member Type/Profession" value={form.memberType} placeholder="Employed Private" isDropdown />

            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.checkRow} onPress={() => update('agreeTerms', !form.agreeTerms)}>
                <View style={[styles.checkbox, form.agreeTerms && styles.checkboxChecked]}>
                  {form.agreeTerms && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.checkLabel}>I agree with the terms and condition</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkRow} onPress={() => update('agreeConsent', !form.agreeConsent)}>
                <View style={[styles.checkbox, form.agreeConsent && styles.checkboxChecked]}>
                  {form.agreeConsent && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={styles.checkLabel}>I give consent to use the following personal informations</Text>
              </TouchableOpacity>

              <View style={styles.confirmBtnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(2)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#3aaa35', '#7dc142', '#c8e04a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitBtnGradient}>
                  <TouchableOpacity 
                    style={styles.submitBtnInner} 
                    onPress={handleSubmit}
                    disabled={submitting}>
                    {submitting ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text style={styles.submitText}>Submit Application Form</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff' },
  scrollBody: { flex: 1 },

  topHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  navCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  navArrow: { fontSize: 24, color: '#333', marginTop: -2 },
  headerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogo: { width: 28, height: 28, resizeMode: 'contain' },
  headerLogoText: { fontSize: 16, fontWeight: '700', color: '#222' },

  titleSection: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8, alignItems: 'center' },
  formTitle: { fontSize: 22, fontWeight: '800', color: '#111', textAlign: 'center', lineHeight: 30, marginBottom: 6 },
  stepSubtitle: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 14 },
  progressTrack: { height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden', width: '100%' },
  progressFill: { height: 6, borderRadius: 3 },

  formBody: { paddingHorizontal: 20, paddingTop: 16 },
  sectionHeading: { fontSize: 15, fontWeight: '700', color: '#111', marginTop: 20, marginBottom: 14 },
  subHeading: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 10, marginTop: -8 },

  fieldWrapper: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, color: '#555', fontWeight: '500', marginBottom: 6 },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  triRow: { flexDirection: 'row', gap: 8 },
  triInput: { flex: 1 },
  dropdownBox: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, flexDirection: 'row', alignItems: 'center' },
  dropdownInput: { flex: 1, fontSize: 14, color: '#333' },
  dropdownCaret: { fontSize: 18, color: '#888' },

  disabledBox: { backgroundColor: '#e8e8e8', opacity: 0.7 },
  triPickerInput: { justifyContent: 'center' },

  naToggle: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#f0f0f0', borderWidth: 1.5, borderColor: '#e0e0e0' },
  naToggleActive: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  naToggleText: { fontSize: 13, color: '#555', fontWeight: '600' },
  naToggleTextActive: { color: '#fff' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalSheet: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '100%', maxHeight: '60%' },
  modalTitle: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalOptionText: { fontSize: 14, color: '#333' },
  modalOptionTextActive: { color: '#3aaa35', fontWeight: '700' },
  modalCheck: { fontSize: 14, color: '#3aaa35', fontWeight: '700' },
  modalGridOption: { width: '15%', margin: '0.83%', paddingVertical: 10, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center' },
  modalGridOptionActive: { backgroundColor: '#3aaa35' },
  modalGridOptionText: { fontSize: 13, color: '#333', fontWeight: '500' },

  toggleRow: { flexDirection: 'row', gap: 10 },
  toggleBtn: { borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10, backgroundColor: '#f0f0f0', borderWidth: 1.5, borderColor: '#e0e0e0' },
  toggleBtnActive: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  toggleText: { fontSize: 13, color: '#555', fontWeight: '500' },
  toggleTextActive: { color: '#fff', fontWeight: '700' },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  checkboxChecked: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  checkMark: { fontSize: 11, color: '#fff', fontWeight: 'bold' },
  checkLabel: { fontSize: 12, color: '#555', flex: 1 },

  proofBox: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 14, flexDirection: 'row', alignItems: 'center' },
  proofText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },
  uploadBtn: { marginLeft: 8 },
  uploadText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },
  addMoreBtn: { alignItems: 'center', paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 8, marginTop: 8 },
  addMoreText: { fontSize: 13, color: '#3aaa35', fontWeight: '600' },

  dependentCard: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#eee' },
  dependentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dependentTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  removeText: { fontSize: 12, color: '#e53935', fontWeight: '500' },
  addDependentBtn: { backgroundColor: '#f0f0f0', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1.5, borderColor: '#3aaa35', borderStyle: 'dashed' },
  addDependentText: { fontSize: 14, color: '#3aaa35', fontWeight: '600' },

  bottomActions: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  actionBtnRow: { flexDirection: 'row', gap: 10 },
  saveBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  saveBtnText: { fontSize: 12, color: '#555', fontWeight: '600' },
  continueBtnGradient: { flex: 1, borderRadius: 8 },
  continueBtnInner: { paddingVertical: 13, alignItems: 'center' },
  continueBtnText: { fontSize: 13, color: '#fff', fontWeight: '700' },

  warningBox: { backgroundColor: '#fff8e1', borderRadius: 8, padding: 14, borderLeftWidth: 4, borderLeftColor: '#FFC200', marginBottom: 4 },
  warningLabel: { fontSize: 13, fontWeight: '700', color: '#e65100', marginBottom: 4 },
  warningText: { fontSize: 12, color: '#555', lineHeight: 18 },

  confirmActions: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  confirmBtnRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  cancelBtn: { flex: 1, paddingVertical: 13, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  cancelText: { fontSize: 13, color: '#555', fontWeight: '600' },
  submitBtnGradient: { flex: 1.8, borderRadius: 8 },
  submitBtnInner: { paddingVertical: 13, alignItems: 'center' },
  submitText: { fontSize: 13, color: '#fff', fontWeight: '700' },

  successContainer: { flex: 1, backgroundColor: '#fff' },
  successHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  successGradient: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCheckCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.6)',
  },
  successCheckMark: { fontSize: 44, color: '#fff', fontWeight: '800' },
  successBody: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successTitle: { fontSize: 20, fontWeight: '800', color: '#111', textAlign: 'center', lineHeight: 28, marginBottom: 12 },
  successSubtitle: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  viewFormBtnGradient: { borderRadius: 8, paddingHorizontal: 40 },
  viewFormBtnInner: { paddingVertical: 13, alignItems: 'center' },
  viewFormBtnText: { fontSize: 14, color: '#fff', fontWeight: '700' },
});