import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { authStore } from '@/stores/auth-store';
import { fetchMemberFull, updateMember, addDependent } from '@/stores/api';

// ── Helpers ───────────────────────────────────────────────────
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
      {onForward
        ? <TouchableOpacity style={styles.backCircle} onPress={onForward}><Text style={styles.backArrow}>›</Text></TouchableOpacity>
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

function ReadField({ label, value, placeholder, isDropdown }: { label: string; value: string; placeholder: string; isDropdown?: boolean }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={isDropdown ? styles.dropdownBox : styles.reviewInput}>
        <Text style={[{ flex: 1 }, value ? styles.reviewValue : styles.reviewPlaceholder]}>
          {value || placeholder}
        </Text>
        {isDropdown && <Text style={styles.dropdownCaret}>⌄</Text>}
      </View>
    </View>
  );
}

function BottomActions({ leftLabel, rightLabel, onLeft, onRight, agreeTerms, agreeConsent, onToggleTerms, onToggleConsent, loading }: { leftLabel: string; rightLabel: string; onLeft: () => void; onRight: () => void; agreeTerms: boolean; agreeConsent: boolean; onToggleTerms: () => void; onToggleConsent: () => void; loading?: boolean }) {
  return (
    <View style={styles.bottomActions}>
      <View style={styles.actionBtnRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={onLeft}><Text style={styles.saveBtnText}>{leftLabel}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.continueBtn, loading && { opacity: 0.6 }]} onPress={onRight} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.continueBtnText}>{rightLabel}</Text>}
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

// ── Main ──────────────────────────────────────────────────────
export default function RevalidationScreen() {
  const router = useRouter();
  const pin = authStore.getPin();

  const [screen, setScreen] = useState<'default' | 'update' | 'view'>('default');
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);

  // API data
  const [member, setMember] = useState<any>(null);
  const [dependents, setDependents] = useState<any[]>([]);

  // Form state
  const [form, setForm] = useState<any>({});
  const [formDependents, setFormDependents] = useState<any[]>([]);

  // Load data from API
  useEffect(() => {
    if (pin) loadData();
  }, [pin]);

  const loadData = async () => {
    setApiLoading(true);
    try {
      const data = await fetchMemberFull(pin);
      if (!data.error) {
        setMember(data.member);
        setDependents(data.dependents || []);

        // Initialize form from member data
        const dob = data.member?.DateOfBirth ? new Date(data.member.DateOfBirth) : null;
        setForm({
          konSulTaProvider: data.member?.KonSultaProvider || '',
          memberName: data.member?.MemberName || '',
          motherMaidenName: data.member?.MotherMaidenName || '',
          spouseName: data.member?.SpouseName || '',
          dobYear: dob ? String(dob.getFullYear()) : '',
          dobMonth: dob ? String(dob.getMonth() + 1) : '',
          dobDay: dob ? String(dob.getDate()) : '',
          placeOfBirth: data.member?.PlaceOfBirth || '',
          sex: data.member?.Sex || '',
          civilStatus: data.member?.CivilStatus || '',
          citizenship: data.member?.Citizenship || '',
          philSysIDNum: data.member?.PhilSysIDNum || '',
          tin: data.member?.TIN || '',
          permanentAddress: data.member?.PermanentAddress || '',
          mailingAddress: data.member?.MailingAddress || '',
          sameAsPermanent: data.member?.MailingAddress === 'SAME AS ABOVE',
          homePhoneNum: data.member?.HomePhoneNum || '',
          mobileNum: data.member?.MobileNum || '',
          businessDirectLine: data.member?.BusinessDirectLine || '',
          emailAddress: data.member?.EmailAddress || '',
          monthlyIncome: data.member?.MonthlyIncome ? String(data.member.MonthlyIncome) : '',
          profession: data.member?.Profession || '',
          proofOfIncome: data.member?.ProofOfIncome || '',
          professionID: data.member?.ProfessionID || '',
          memberType: data.member?.ProfessionID || '',
        });

        // Initialize dependents form
        const depForms = (data.dependents || []).map((d: any) => {
          const dDob = d.DependentDOB ? new Date(d.DependentDOB) : null;
          return {
            dependentName: d.DependentName || '',
            dependentRelationship: d.DepenedentRelationship || 'Child',  // ← correct DB column
            dependentDOBYear: dDob ? String(dDob.getFullYear()) : '',
            dependentDOBMonth: dDob ? String(dDob.getMonth() + 1) : '',
            dependentDOBDay: dDob ? String(dDob.getDate()) : '',
            dependentCitizenship: d.DependentCitizenship || '',
            permanentDisability: d.DependentPermanentDisability || 'No',
          };
        });
        setFormDependents(depForms.length > 0 ? depForms : [{
          dependentName: '', dependentRelationship: 'Child',
          dependentDOBYear: '', dependentDOBMonth: '', dependentDOBDay: '',
          dependentCitizenship: '', permanentDisability: 'No',
        }]);
      }
    } catch (err) {
      console.error('Failed to load member data:', err);
      Alert.alert('Error', 'Failed to load member data from server.');
    } finally {
      setApiLoading(false);
    }
  };

  const getProfessionLabel = (profID: string) => {
    const map: Record<string, string> = {
      'P001': 'Employed Private',
      'P002': 'Employed Government',
      'P003': 'Self-Earning Individual',
      'P004': 'Sole Proprietor',
      'P005': 'Professional Practitioner',
    };
    return map[profID] || profID;
  };

  const update = (field: string, value: string | boolean) =>
    setForm((prev: any) => ({ ...prev, [field]: value }));
  const updateDep = (i: number, field: string, value: string) =>
    setFormDependents((prev: any[]) => prev.map((d, idx) => idx === i ? { ...d, [field]: value } : d));
  const addDep = () => setFormDependents((prev: any[]) => [...prev, {
    dependentName: '', dependentRelationship: 'Child',
    dependentDOBYear: '', dependentDOBMonth: '', dependentDOBDay: '',
    dependentCitizenship: '', permanentDisability: 'No',
  }]);
  const removeDep = (i: number) => setFormDependents((prev: any[]) => prev.filter((_, idx) => idx !== i));

  const submittedOn = member ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  const handleUpdateSubmit = async () => {
    if (!agreeTerms || !agreeConsent) {
      Alert.alert('Required', 'Please agree to the terms and consent.');
      return;
    }

    setLoading(true);
    try {
      const dob = `${form.dobYear}-${form.dobMonth.padStart(2, '0')}-${form.dobDay.padStart(2, '0')}`;

      const updateData = {
        KonSultaProvider: form.konSulTaProvider,
        MemberName: form.memberName,
        MotherMaidenName: form.motherMaidenName,
        SpouseName: form.spouseName,
        DateOfBirth: dob,
        PlaceOfBirth: form.placeOfBirth,
        Sex: form.sex,
        CivilStatus: form.civilStatus,
        Citizenship: form.citizenship,
        PhilSysIDNum: form.philSysIDNum,
        TIN: form.tin,
        PermanentAddress: form.permanentAddress,
        MailingAddress: form.sameAsPermanent ? 'SAME AS ABOVE' : form.mailingAddress,
        HomePhoneNum: form.homePhoneNum,
        MobileNum: form.mobileNum,
        BusinessDirectLine: form.businessDirectLine,
        EmailAddress: form.emailAddress,
        MonthlyIncome: form.monthlyIncome,
        Profession: form.profession,
        ProofOfIncome: form.proofOfIncome,
        ProfessionID: form.professionID,
      };

      const result = await updateMember(pin, updateData);
      if (result.success) {
        let depErrors = [];
        for (const dep of formDependents) {
          const existingDep = dependents.find((d: any) =>
            d.DependentName === dep.dependentName &&
            d.DepenedentRelationship === dep.dependentRelationship
          );
          if (dep.dependentName.trim() && !existingDep) {
            try {
              const depDob = `${dep.dependentDOBYear}-${dep.dependentDOBMonth.padStart(2, '0')}-${dep.dependentDOBDay.padStart(2, '0')}`;
              console.log('Adding dependent:', pin, {
                DependentName: dep.dependentName,
                DepenedentRelationship: dep.dependentRelationship,
                DependentDOB: depDob,
                DependentCitizenship: dep.dependentCitizenship,
                DependentPermanentDisability: dep.permanentDisability,
              });
              await addDependent(pin, {
                DependentName: dep.dependentName,
                DepenedentRelationship: dep.dependentRelationship,
                DependentDOB: depDob,
                DependentCitizenship: dep.dependentCitizenship,
                DependentPermanentDisability: dep.permanentDisability,
              });
            } catch (depErr: any) {
              depErrors.push(dep.dependentName + ': ' + (depErr.message || 'Failed'));
            }
          }
        }
        if (depErrors.length > 0) {
          Alert.alert('Warning', 'Member updated but some dependents failed:\n' + depErrors.join('\n'));
        }
        setSubmitted(true);
        await loadData();
      } else {
        Alert.alert('Error', result.error || 'Failed to update member');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Connection Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  // ── LOADING ──
  if (apiLoading) {
    return (
      <View style={[styles.outerContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3aaa35" />
        <Text style={{ marginTop: 12, color: '#888' }}>Loading member data...</Text>
      </View>
    );
  }

  // ── SUCCESS ──
  if (submitted) {
    return (
      <View style={styles.outerContainer}>
        <PageHeader onBack={() => { setSubmitted(false); setScreen('default'); setStep(0); }} />

        <LinearGradient
          colors={['#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successHero}>
          <View style={styles.successHeroCircle}>
            <Text style={styles.successHeroCheck}>✓</Text>
          </View>
        </LinearGradient>

        <View style={styles.successBody}>
          <Text style={styles.successTitle}>Membership Application Form{'\n'}Successfully Updated!</Text>
          <Text style={styles.successSubtitle}>You have successfully updated your{'\n'}membership form!</Text>
          <LinearGradient
            colors={['#3aaa35', '#7dc142', '#c8e04a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.viewFormBtnGradient}>
            <TouchableOpacity style={styles.viewFormBtnInner} onPress={() => { setSubmitted(false); setScreen('view'); }}>
              <Text style={styles.viewFormBtnText}>View Form</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }

  // ── DEFAULT ──
  if (screen === 'default') {
    return (
      <View style={styles.outerContainer}>
        <PageHeader onBack={() => router.push('/(tabs)/explore')} />
        <ScrollView style={styles.scrollBody}>
          <View style={styles.titleSection}>
            <Text style={styles.formTitle}>Update Existing{'\n'}Membership Form</Text>
            <Text style={styles.stepSubtitle}>Update data from an existing membership form.</Text>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Submitted Forms</Text>
            <View style={styles.submittedCard}>
              <View style={styles.submittedTop}>
                <Text style={styles.submittedPin}>{pin}</Text>
                <View style={styles.submittedBtns}>
                  <TouchableOpacity style={styles.viewFormSmallBtn} onPress={() => setScreen('view')}>
                    <Text style={styles.viewFormSmallText}>🔍 View Form</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.updateFormSmallBtn} onPress={() => setScreen('update')}>
                    <Text style={styles.updateFormSmallText}>✏ Update Form</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.submittedName}>{member?.MemberName}</Text>
              <Text style={styles.submittedDate}>Application Submitted on {submittedOn}</Text>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionLabel}>Activity history</Text>
            <View style={styles.activityDateHeader}><Text style={styles.activityDateText}>Today</Text></View>
            <View style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <Text style={styles.activityPin}>{pin}</Text>
                <Text style={styles.activityName}>{member?.MemberName}</Text>
                <Text style={styles.activityDate}>Application Submitted on {submittedOn}</Text>
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

  // ── VIEW & PRINT ──
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
              <Text style={styles.submittedPin}>{pin}</Text>
              <Text style={styles.submittedName}>{member?.MemberName}</Text>
              <Text style={styles.submittedDate}>Application Submitted on {submittedOn}</Text>
              <View style={styles.downloadPrintRow}>
                <TouchableOpacity style={styles.downloadBtn}><Text style={styles.downloadBtnText}>↓ Download Form</Text></TouchableOpacity>
                <TouchableOpacity style={styles.printBtn}><Text style={styles.printBtnText}>🖨 Print Form</Text></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <ReadField label="Preferred Konsulta Provider" value={member?.KonSultaProvider} placeholder="—" />
            <ReadField label="Member Name" value={member?.MemberName} placeholder="—" />
            <ReadField label="Mother's Maiden Name" value={member?.MotherMaidenName} placeholder="—" />
            <ReadField label="Spouse Name" value={member?.SpouseName} placeholder="—" />
            <ReadField label="Date of Birth" value={member?.DateOfBirth} placeholder="—" />
            <ReadField label="Place of Birth" value={member?.PlaceOfBirth} placeholder="—" isDropdown />
            <Field label="Sex">
              <View style={styles.toggleRow}>
                {['Female', 'Male'].map(opt => (
                  <View key={opt} style={[styles.toggleBtn, member?.Sex === opt && styles.toggleBtnActive]}>
                    <Text style={[styles.toggleText, member?.Sex === opt && styles.toggleTextActive]}>{opt}</Text>
                  </View>
                ))}
              </View>
            </Field>
            <ReadField label="Civil Status" value={member?.CivilStatus} placeholder="—" isDropdown />
            <ReadField label="Citizenship" value={member?.Citizenship} placeholder="—" isDropdown />
            <ReadField label="Philsys ID Number" value={member?.PhilSysIDNum} placeholder="—" />
            <ReadField label="Tax Payer Identification Number" value={member?.TIN} placeholder="—" />
            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <ReadField label="Permanent Address" value={member?.PermanentAddress} placeholder="—" />
            <ReadField label="Mailing Address" value={member?.MailingAddress} placeholder="—" />
            <ReadField label="Home Phone Number" value={member?.HomePhoneNum} placeholder="—" />
            <ReadField label="Mobile Number" value={member?.MobileNum} placeholder="—" />
            <ReadField label="Business (Direct Line)" value={member?.BusinessDirectLine} placeholder="—" />
            <ReadField label="Email Address" value={member?.EmailAddress} placeholder="—" />
            <Text style={styles.sectionHeading}>III. Profession</Text>
            <ReadField label="Monthly Income" value={member?.MonthlyIncome ? `₱${parseFloat(member.MonthlyIncome).toLocaleString()}` : '—'} placeholder="—" />
            <ReadField label="Profession" value={member?.Profession} placeholder="—" />
            <ReadField label="Proof of Income" value={member?.ProofOfIncome} placeholder="—" />
            <ReadField label="Member Type" value={getProfessionLabel(member?.ProfessionID ?? '')} placeholder="—" />
            {dependents.length > 0 && (
              <>
                <Text style={styles.sectionHeading}>IV. Dependents</Text>
                {dependents.map((dep, i) => (
                  <View key={i} style={styles.dependentCard}>
                    <Text style={styles.dependentTitle}>{dep.DependentName}</Text>
                    {/* DepenedentRelationship  */}
                    <Text style={styles.depDetail}>{dep.DepenedentRelationship} · {dep.DependentDOB} · {dep.DependentCitizenship}</Text>
                    <Text style={styles.depDetail}>Permanent Disability: {dep.DependentPermanentDisability}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ── UPDATE (multi-step) ──
  const progress = ((step + 1) / 4) * 100;
  const stepLabel = ['Page 1 of 3: Personal Details', 'Page 2 of 3: Declaration of Dependents', 'Page 3 of 3: Member Type', 'Update Confirmation'][step];

  return (
    <View style={styles.outerContainer}>
      <PageHeader
        onBack={() => step > 0 ? setStep(step - 1) : setScreen('default')}
        onForward={step < 3 ? () => setStep(step + 1) : undefined}
      />
      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.formTitle}>Update Existing{'\n'}Membership Form</Text>
          <Text style={styles.stepSubtitle}>{stepLabel}</Text>
        </View>
        <View style={styles.progressTrackWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
          </View>
        </View>

        {/* STEP 0 */}
        {step === 0 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <Field label="Preferred Konsulta Provider"><TextInput style={styles.input} value={form.konSulTaProvider} onChangeText={(v: string) => update('konSulTaProvider', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Member Name"><TextInput style={styles.input} value={form.memberName} onChangeText={(v: string) => update('memberName', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Mother's Maiden Name"><TextInput style={styles.input} value={form.motherMaidenName} onChangeText={(v: string) => update('motherMaidenName', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Spouse Name"><TextInput style={styles.input} value={form.spouseName} onChangeText={(v: string) => update('spouseName', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Date of Birth">
              <View style={styles.triRow}>
                <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb" value={form.dobYear} onChangeText={(v: string) => update('dobYear', v)} keyboardType="numeric" />
                <TextInput style={[styles.input, styles.triInput]} placeholder="Month" placeholderTextColor="#bbb" value={form.dobMonth} onChangeText={(v: string) => update('dobMonth', v)} keyboardType="numeric" />
                <TextInput style={[styles.input, styles.triInput]} placeholder="Day" placeholderTextColor="#bbb" value={form.dobDay} onChangeText={(v: string) => update('dobDay', v)} keyboardType="numeric" />
              </View>
            </Field>
            <Field label="Place of Birth">
              <View style={styles.dropdownBox}><TextInput style={styles.dropdownInput} value={form.placeOfBirth} onChangeText={(v: string) => update('placeOfBirth', v)} placeholderTextColor="#bbb" /><Text style={styles.dropdownCaret}>⌄</Text></View>
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
              <View style={styles.dropdownBox}><TextInput style={styles.dropdownInput} value={form.civilStatus} onChangeText={(v: string) => update('civilStatus', v)} placeholderTextColor="#bbb" /><Text style={styles.dropdownCaret}>⌄</Text></View>
            </Field>
            <Field label="Citizenship">
              <View style={styles.dropdownBox}><TextInput style={styles.dropdownInput} value={form.citizenship} onChangeText={(v: string) => update('citizenship', v)} placeholderTextColor="#bbb" /><Text style={styles.dropdownCaret}>⌄</Text></View>
            </Field>
            <Field label="Philsys ID Number (Optional)"><TextInput style={styles.input} value={form.philSysIDNum} onChangeText={(v: string) => update('philSysIDNum', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Tax Payer Identification Number (Optional)"><TextInput style={styles.input} value={form.tin} onChangeText={(v: string) => update('tin', v)} placeholderTextColor="#bbb" /></Field>

            <Text style={styles.sectionHeading}>II. Address And Contact Details</Text>
            <Field label="Permanent Address"><TextInput style={styles.input} value={form.permanentAddress} onChangeText={(v: string) => update('permanentAddress', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Mailing Address">
              <TextInput style={styles.input} value={form.mailingAddress} onChangeText={(v: string) => update('mailingAddress', v)} placeholderTextColor="#bbb" />
              <TouchableOpacity style={styles.checkRow} onPress={() => update('sameAsPermanent', !form.sameAsPermanent)}>
                <View style={[styles.checkbox, form.sameAsPermanent && styles.checkboxChecked]}>{form.sameAsPermanent && <Text style={styles.checkMark}>✓</Text>}</View>
                <Text style={styles.checkLabel}>Same as Permanent Address</Text>
              </TouchableOpacity>
            </Field>
            <Field label="Home Phone Number"><TextInput style={styles.input} value={form.homePhoneNum} onChangeText={(v: string) => update('homePhoneNum', v)} keyboardType="phone-pad" placeholderTextColor="#bbb" /></Field>
            <Field label="Mobile Number"><TextInput style={styles.input} value={form.mobileNum} onChangeText={(v: string) => update('mobileNum', v)} keyboardType="phone-pad" placeholderTextColor="#bbb" /></Field>
            <Field label="Business (Direct Line)"><TextInput style={styles.input} value={form.businessDirectLine} onChangeText={(v: string) => update('businessDirectLine', v)} keyboardType="phone-pad" placeholderTextColor="#bbb" /></Field>
            <Field label="Email Address"><TextInput style={styles.input} value={form.emailAddress} onChangeText={(v: string) => update('emailAddress', v)} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#bbb" /></Field>

            <Text style={styles.sectionHeading}>III. Profession</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Monthly Income"><TextInput style={styles.input} value={form.monthlyIncome} onChangeText={(v: string) => update('monthlyIncome', v)} keyboardType="numeric" placeholderTextColor="#bbb" /></Field>
            <Field label="Profession"><TextInput style={styles.input} value={form.profession} onChangeText={(v: string) => update('profession', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Proof of Income">
              <View style={styles.proofBox}>
                <Text style={styles.proofText}>{form.proofOfIncome || 'Certificate of Employment, Bank Statements, ITR'}</Text>
                <TouchableOpacity style={styles.uploadBtn}><Text style={styles.uploadText}>Upload a File ↑</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.addMoreBtn}><Text style={styles.addMoreText}>+ Add More</Text></TouchableOpacity>
            </Field>

            <BottomActions leftLabel="Save current progress" rightLabel="Update Personal Details" onLeft={() => Alert.alert('Saved', 'Progress saved.')} onRight={() => setStep(1)} agreeTerms={agreeTerms} agreeConsent={agreeConsent} onToggleTerms={() => setAgreeTerms(!agreeTerms)} onToggleConsent={() => setAgreeConsent(!agreeConsent)} />
          </View>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Declaration of Dependents</Text>
            {formDependents.map((dep: any, i: number) => (
              <View key={i} style={styles.dependentCard}>
                <View style={styles.dependentHeader}>
                  <Text style={styles.dependentTitle}>Dependent {i + 1}</Text>
                  {i > 0 && <TouchableOpacity onPress={() => removeDep(i)}><Text style={styles.removeText}>Remove</Text></TouchableOpacity>}
                </View>
                <Field label="Dependent Name"><TextInput style={styles.input} value={dep.dependentName} onChangeText={(v: string) => updateDep(i, 'dependentName', v)} placeholderTextColor="#bbb" /></Field>
                <Field label="Relationship with Member"><TextInput style={styles.input} value={dep.dependentRelationship} onChangeText={(v: string) => updateDep(i, 'dependentRelationship', v)} placeholderTextColor="#bbb" /></Field>
                <Field label="Date of Birth">
                  <View style={styles.triRow}>
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Year" placeholderTextColor="#bbb" value={dep.dependentDOBYear} onChangeText={(v: string) => updateDep(i, 'dependentDOBYear', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Month" placeholderTextColor="#bbb" value={dep.dependentDOBMonth} onChangeText={(v: string) => updateDep(i, 'dependentDOBMonth', v)} keyboardType="numeric" />
                    <TextInput style={[styles.input, styles.triInput]} placeholder="Day" placeholderTextColor="#bbb" value={dep.dependentDOBDay} onChangeText={(v: string) => updateDep(i, 'dependentDOBDay', v)} keyboardType="numeric" />
                  </View>
                </Field>
                <Field label="Citizenship">
                  <View style={styles.dropdownBox}><TextInput style={styles.dropdownInput} value={dep.dependentCitizenship} onChangeText={(v: string) => updateDep(i, 'dependentCitizenship', v)} placeholderTextColor="#bbb" /><Text style={styles.dropdownCaret}>⌄</Text></View>
                </Field>
                <Field label="Permanent Disability?">
                  <View style={styles.toggleRow}>
                    {['Yes', 'No'].map(opt => (
                      <TouchableOpacity key={opt} style={[styles.toggleBtn, dep.permanentDisability === opt && styles.toggleBtnActive]} onPress={() => updateDep(i, 'permanentDisability', opt)}>
                        <Text style={[styles.toggleText, dep.permanentDisability === opt && styles.toggleTextActive]}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Field>
              </View>
            ))}
            <TouchableOpacity style={styles.addDependentBtn} onPress={addDep}><Text style={styles.addDependentText}>+ Add Dependent</Text></TouchableOpacity>
            <BottomActions
              leftLabel="Update Dependents"
              rightLabel="Continue"
              onLeft={async () => {
                setLoading(true);
                let savedCount = 0;
                try {
                  for (const dep of formDependents) {
                    const existingDep = dependents.find((d: any) =>
                      d.DependentName === dep.dependentName &&
                      d.DepenedentRelationship === dep.dependentRelationship
                    );
                    if (dep.dependentName.trim() && !existingDep) {
                      const depDob = `${dep.dependentDOBYear}-${dep.dependentDOBMonth.padStart(2, '0')}-${dep.dependentDOBDay.padStart(2, '0')}`;
                      await addDependent(pin, {
                        DependentName: dep.dependentName,
                        DepenedentRelationship: dep.dependentRelationship,
                        DependentDOB: depDob,
                        DependentCitizenship: dep.dependentCitizenship,
                        DependentPermanentDisability: dep.permanentDisability,
                      });
                      savedCount++;
                    }
                  }
                  if (savedCount > 0) {
                    Alert.alert('Saved', `${savedCount} dependent(s) saved to database.`);
                  } else {
                    Alert.alert('No Changes', 'No new dependents to save.');
                  }
                  await loadData();
                } catch (err: any) {
                  console.error('Save dependents error:', err);
                  Alert.alert('Error', err.message || 'Failed to save dependents. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}
              onRight={() => setStep(2)}
              agreeTerms={agreeTerms}
              agreeConsent={agreeConsent}
              onToggleTerms={() => setAgreeTerms(!agreeTerms)}
              onToggleConsent={() => setAgreeConsent(!agreeConsent)}
              loading={loading}
            />
          </View>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <View style={styles.formBody}>
            <Text style={styles.sectionHeading}>IV. Member Type</Text>
            <Text style={styles.subHeading}>Employment Information</Text>
            <Field label="Profession ID"><TextInput style={styles.input} value={form.professionID} onChangeText={(v: string) => update('professionID', v)} placeholderTextColor="#bbb" /></Field>
            <Field label="Member Type/Profession">
              <View style={styles.memberTypeOptions}>
                {[
                  { id: 'P001', label: 'Employed Private' },
                  { id: 'P002', label: 'Employed Government' },
                  { id: 'P003', label: 'Self-Earning Individual' },
                  { id: 'P004', label: 'Sole Proprietor' },
                  { id: 'P005', label: 'Professional Practitioner' },
                ].map(p => (
                  <TouchableOpacity key={p.id} style={[styles.memberTypeBtn, form.professionID === p.id && styles.memberTypeBtnActive]} onPress={() => { update('professionID', p.id); update('memberType', p.label); }}>
                    <Text style={[styles.memberTypeText, form.professionID === p.id && styles.memberTypeTextActive]}>{p.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>
            <BottomActions leftLabel="Save current progress" rightLabel="Update Form" onLeft={() => Alert.alert('Saved', 'Progress saved.')} onRight={() => setStep(3)} agreeTerms={agreeTerms} agreeConsent={agreeConsent} onToggleTerms={() => setAgreeTerms(!agreeTerms)} onToggleConsent={() => setAgreeConsent(!agreeConsent)} />
          </View>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && (
          <View style={styles.formBody}>
            <View style={styles.warningBox}>
              <Text style={styles.warningLabel}>⚠ Warning</Text>
              <Text style={styles.warningText}>Before clicking the update and resubmit button, please make sure to double check your information.</Text>
            </View>
            <Text style={styles.sectionHeading}>I. Personal Details</Text>
            <ReadField label="Member Name" value={form.memberName} placeholder="—" />
            <ReadField label="Date of Birth" value={`${form.dobYear}-${form.dobMonth}-${form.dobDay}`} placeholder="—" />
            <ReadField label="Place of Birth" value={form.placeOfBirth} placeholder="—" isDropdown />
            <ReadField label="Sex" value={form.sex} placeholder="—" />
            <ReadField label="Civil Status" value={form.civilStatus} placeholder="—" isDropdown />
            <ReadField label="Citizenship" value={form.citizenship} placeholder="—" isDropdown />
            <ReadField label="Philsys ID Number" value={form.philSysIDNum} placeholder="—" />
            <Text style={styles.sectionHeading}>II. Address & Contact</Text>
            <ReadField label="Permanent Address" value={form.permanentAddress} placeholder="—" />
            <ReadField label="Mailing Address" value={form.mailingAddress} placeholder="—" />
            <ReadField label="Mobile Number" value={form.mobileNum} placeholder="—" />
            <ReadField label="Email Address" value={form.emailAddress} placeholder="—" />
            <Text style={styles.sectionHeading}>III. Profession</Text>
            <ReadField label="Monthly Income" value={form.monthlyIncome ? `₱${parseFloat(form.monthlyIncome).toLocaleString()}` : '—'} placeholder="—" />
            <ReadField label="Member Type" value={getProfessionLabel(form.professionID)} placeholder="—" />

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
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep(2)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleUpdateSubmit} disabled={loading}>
                  {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.submitText}>Update Membership Form</Text>}
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

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff' },
  scrollBody: { flex: 1 },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 24, color: '#333', marginTop: -2 },
  headerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerLogoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3aaa35' },
  headerLogoText: { fontSize: 15, fontWeight: '700', color: '#333' },
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
  proofBox: { backgroundColor: '#f4f4f4', borderRadius: 8, padding: 14, flexDirection: 'row', alignItems: 'center' },
  proofText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },
  uploadBtn: { marginLeft: 8 },
  uploadText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },
  addMoreBtn: { alignItems: 'center', paddingVertical: 10, backgroundColor: '#f4f4f4', borderRadius: 8, marginTop: 8 },
  addMoreText: { fontSize: 13, color: '#3aaa35', fontWeight: '600' },
  dependentCard: { backgroundColor: '#fafafa', borderRadius: 10, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: '#eee' },
  dependentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dependentTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  depDetail: { fontSize: 12, color: '#777', marginTop: 2 },
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
  successHero: { height: 220, alignItems: 'center', justifyContent: 'center' },
  successHeroCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.6)' },
  successHeroCheck: { fontSize: 44, color: '#fff', fontWeight: '800' },
  successBody: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successTitle: { fontSize: 20, fontWeight: '800', color: '#111', textAlign: 'center', lineHeight: 28, marginBottom: 10 },
  successSubtitle: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  viewFormBtnGradient: { borderRadius: 8, paddingHorizontal: 40 },
  viewFormBtnInner: { paddingVertical: 13, alignItems: 'center' },
  viewFormBtnText: { fontSize: 14, color: '#fff', fontWeight: '700' },
});