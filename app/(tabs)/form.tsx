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
    profession: '',
    proofOfIncome: '',
    professionID: '',
  });

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.memberName || !form.mobileNum || !form.emailAddress) {
      Alert.alert('Missing Fields', 'Please fill in at least Member Name, Mobile Number, and Email.');
      return;
    }
    Alert.alert('Success', 'Membership form submitted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NEW MEMBERSHIP FORM</Text>
      </View>

      {/* Section 1 */}
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

      {/* Section 2 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ID Information</Text>

        <Text style={styles.label}>Citizenship</Text>
        <TextInput style={styles.input} value={form.citizenship} onChangeText={v => update('citizenship', v)} placeholder="Filipino" placeholderTextColor="#aaa" />

        <Text style={styles.label}>PhilSys ID Number</Text>
        <TextInput style={styles.input} value={form.philSysIDNum} onChangeText={v => update('philSysIDNum', v)} placeholder="0000-0000-0000" placeholderTextColor="#aaa" />

        <Text style={styles.label}>TIN</Text>
        <TextInput style={styles.input} value={form.tin} onChangeText={v => update('tin', v)} placeholder="000-000-000" placeholderTextColor="#aaa" />
      </View>

      {/* Section 3 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>

        <Text style={styles.label}>Permanent Address</Text>
        <TextInput style={styles.input} value={form.permanentAddress} onChangeText={v => update('permanentAddress', v)} placeholder="Street, City, Province" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Mailing Address</Text>
        <TextInput style={styles.input} value={form.mailingAddress} onChangeText={v => update('mailingAddress', v)} placeholder="Same as above or different" placeholderTextColor="#aaa" />
      </View>

      {/* Section 4 */}
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

      {/* Section 5 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employment Information</Text>

        <Text style={styles.label}>Monthly Income</Text>
        <TextInput style={styles.input} value={form.monthlyIncome} onChangeText={v => update('monthlyIncome', v)} placeholder="e.g. 25000" placeholderTextColor="#aaa" keyboardType="numeric" />

        <Text style={styles.label}>Profession</Text>
        <View style={styles.optionRow}>
          {['N/A', 'Freelancer', 'Business Owner', 'Doctor', 'Engineer'].map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionBtn, form.profession === opt && styles.optionBtnActive]}
              onPress={() => update('profession', opt)}>
              <Text style={[styles.optionText, form.profession === opt && styles.optionTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Proof of Income</Text>
        <View style={styles.optionRow}>
          {['Certificate of Employment', 'ITR', 'Government Payslip', 'Business Registration', 'PRC License'].map(opt => (
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