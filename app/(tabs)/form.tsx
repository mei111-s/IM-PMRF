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

type Dependent = {
  dependentName: string;
  dependentRelationship: string;
  dependentDOB: string;
  dependentCitizenship: string;
  permanentDisability: string;
};

export default function MembershipForm() {
  const [form, setForm] = useState({
    purpose: 'Registration',
    konSulTaProvider: '',
    memberName: '',
    motherMaidenName: '',
    spouseName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    sex: '',
    civilStatus: '',
    citizenship: 'Filipino',
    philSysIDNum: '',
    tin: '',
    permanentAddress: '',
    mailingAddress: '',
    homePhoneNum: '',
    mobileNum: '',
    businessDirectLine: '',
    emailAddress: '',
    monthlyIncome: '',
    professionID: '',
    proofOfIncome: '',
  });

  const [dependents, setDependents] = useState<Dependent[]>([]);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addDependent = () => {
    setDependents(prev => [...prev, {
      dependentName: '',
      dependentRelationship: 'Child',
      dependentDOB: '',
      dependentCitizenship: 'Filipino',
      permanentDisability: 'No',
    }]);
  };

  const updateDependent = (index: number, field: string, value: string) => {
    setDependents(prev => prev.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  const removeDependent = (index: number) => {
    setDependents(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!form.memberName || !form.mobileNum || !form.emailAddress) {
      Alert.alert('Missing Fields', 'Please fill in at least Member Name, Mobile Number, and Email.');
      return;
    }
    Alert.alert('Success', 'Membership form submitted successfully!');
  };

  const professions = [
    { id: 'P001', label: 'Employed Private' },
    { id: 'P002', label: 'Employed Government' },
    { id: 'P003', label: 'Self-Earning Individual' },
    { id: 'P004', label: 'Sole Proprietor' },
    { id: 'P005', label: 'Professional Practitioner' },
  ];

  const proofOptions = [
    'Certificate of Employment',
    'ITR',
    'Government Payslip',
    'Business Registration',
    'PRC License',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NEW MEMBERSHIP FORM</Text>
      </View>

      {/* Section 1 - Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Purpose</Text>
        <View style={styles.optionRow}>
          {['Registration', 'Updating/Amendment'].map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, form.purpose === opt && styles.optionBtnActive]}
              onPress={() => update('purpose', opt)}>
              <Text style={[styles.optionText, form.purpose === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>KonSulTa Provider</Text>
        <TextInput style={styles.input} value={form.konSulTaProvider} onChangeText={v => update('konSulTaProvider', v)} placeholder="e.g. Victory Medical Clinic" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Member Name</Text>
        <TextInput style={styles.input} value={form.memberName} onChangeText={v => update('memberName', v)} placeholder="Full Name" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Mother's Maiden Name</Text>
        <TextInput style={styles.input} value={form.motherMaidenName} onChangeText={v => update('motherMaidenName', v)} placeholder="Mother's Maiden Name" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Spouse Name</Text>
        <TextInput style={styles.input} value={form.spouseName} onChangeText={v => update('spouseName', v)} placeholder="N/A if not applicable" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value={form.dateOfBirth} onChangeText={v => update('dateOfBirth', v)} placeholder="YYYY-MM-DD" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Place of Birth</Text>
        <TextInput style={styles.input} value={form.placeOfBirth} onChangeText={v => update('placeOfBirth', v)} placeholder="City/Province" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Sex</Text>
        <View style={styles.optionRow}>
          {['Male', 'Female'].map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, form.sex === opt && styles.optionBtnActive]}
              onPress={() => update('sex', opt)}>
              <Text style={[styles.optionText, form.sex === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Civil Status</Text>
        <View style={styles.optionRow}>
          {['Single', 'Married', 'Widowed', 'Legally Separated'].map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, form.civilStatus === opt && styles.optionBtnActive]}
              onPress={() => update('civilStatus', opt)}>
              <Text style={[styles.optionText, form.civilStatus === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Section 2 - ID Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ID Information</Text>

        <Text style={styles.label}>Citizenship</Text>
        <TextInput style={styles.input} value={form.citizenship} onChangeText={v => update('citizenship', v)} placeholder="Filipino" placeholderTextColor="#aaa" />

        <Text style={styles.label}>PhilSys ID Number</Text>
        <TextInput style={styles.input} value={form.philSysIDNum} onChangeText={v => update('philSysIDNum', v)} placeholder="0000-0000-0000" placeholderTextColor="#aaa" />

        <Text style={styles.label}>TIN</Text>
        <TextInput style={styles.input} value={form.tin} onChangeText={v => update('tin', v)} placeholder="000-000-000" placeholderTextColor="#aaa" />
      </View>

      {/* Section 3 - Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>

        <Text style={styles.label}>Permanent Address</Text>
        <TextInput style={styles.input} value={form.permanentAddress} onChangeText={v => update('permanentAddress', v)} placeholder="Street, City, Province" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Mailing Address</Text>
        <TextInput style={styles.input} value={form.mailingAddress} onChangeText={v => update('mailingAddress', v)} placeholder="Same as above or different" placeholderTextColor="#aaa" />
      </View>

      {/* Section 4 - Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Text style={styles.label}>Home Phone Number</Text>
        <TextInput style={styles.input} value={form.homePhoneNum} onChangeText={v => update('homePhoneNum', v)} placeholder="(000)000-0000" placeholderTextColor="#aaa" keyboardType="phone-pad" />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value={form.mobileNum} onChangeText={v => update('mobileNum', v)} placeholder="09XX-XXX-XXXX" placeholderTextColor="#aaa" keyboardType="phone-pad" />

        <Text style={styles.label}>Business Direct Line</Text>
        <TextInput style={styles.input} value={form.businessDirectLine} onChangeText={v => update('businessDirectLine', v)} placeholder="N/A if not applicable" placeholderTextColor="#aaa" keyboardType="phone-pad" />

        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} value={form.emailAddress} onChangeText={v => update('emailAddress', v)} placeholder="email@example.com" placeholderTextColor="#aaa" keyboardType="email-address" autoCapitalize="none" />
      </View>

      {/* Section 5 - Employment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employment Information</Text>

        <Text style={styles.label}>Monthly Income</Text>
        <TextInput style={styles.input} value={form.monthlyIncome} onChangeText={v => update('monthlyIncome', v)} placeholder="e.g. 25000" placeholderTextColor="#aaa" keyboardType="numeric" />

        <Text style={styles.label}>Member Type / Profession</Text>
        <View style={styles.optionRow}>
          {professions.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.optionBtn, form.professionID === p.id && styles.optionBtnActive]}
              onPress={() => update('professionID', p.id)}>
              <Text style={[styles.optionText, form.professionID === p.id && styles.optionTextActive]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Proof of Income</Text>
        <View style={styles.optionRow}>
          {proofOptions.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, form.proofOfIncome === opt && styles.optionBtnActive]}
              onPress={() => update('proofOfIncome', opt)}>
              <Text style={[styles.optionText, form.proofOfIncome === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Section 6 - Dependents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dependents</Text>

        {dependents.length === 0 && (
          <Text style={styles.emptyText}>No dependents added yet.</Text>
        )}

        {dependents.map((dep, index) => (
          <View key={index} style={styles.dependentCard}>
            <View style={styles.dependentHeader}>
              <Text style={styles.dependentTitle}>Dependent {index + 1}</Text>
              <TouchableOpacity onPress={() => removeDependent(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Dependent Name</Text>
            <TextInput style={styles.input} value={dep.dependentName} onChangeText={v => updateDependent(index, 'dependentName', v)} placeholder="Full Name" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Relationship</Text>
            <View style={styles.optionRow}>
              {['Child', 'Spouse', 'Parent'].map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, dep.dependentRelationship === opt && styles.optionBtnActive]}
                  onPress={() => updateDependent(index, 'dependentRelationship', opt)}>
                  <Text style={[styles.optionText, dep.dependentRelationship === opt && styles.optionTextActive]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput style={styles.input} value={dep.dependentDOB} onChangeText={v => updateDependent(index, 'dependentDOB', v)} placeholder="YYYY-MM-DD" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Citizenship</Text>
            <TextInput style={styles.input} value={dep.dependentCitizenship} onChangeText={v => updateDependent(index, 'dependentCitizenship', v)} placeholder="Filipino" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Permanent Disability</Text>
            <View style={styles.optionRow}>
              {['Yes', 'No'].map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, dep.permanentDisability === opt && styles.optionBtnActive]}
                  onPress={() => updateDependent(index, 'permanentDisability', opt)}>
                  <Text style={[styles.optionText, dep.permanentDisability === opt && styles.optionTextActive]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addDependent}>
          <Text style={styles.addBtnText}>+ Add Dependent</Text>
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3aaa35',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3aaa35',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    marginTop: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
  },
  optionBtnActive: {
    backgroundColor: '#3aaa35',
    borderColor: '#3aaa35',
  },
  optionText: {
    fontSize: 12,
    color: '#555',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 13,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  dependentCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  dependentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dependentTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  removeText: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '500',
  },
  addBtn: {
    borderWidth: 1,
    borderColor: '#3aaa35',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addBtnText: {
    color: '#3aaa35',
    fontWeight: '600',
    fontSize: 13,
  },
  submitBtn: {
    backgroundColor: '#3aaa35',
    margin: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
});