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

const MEMBER_DATA: Record<string, {
  name: string;
  spouseName: string;
  civilStatus: string;
  email: string;
  mobile: string;
  homePhone: string;
  businessLine: string;
  permanentAddress: string;
  mailingAddress: string;
  monthlyIncome: string;
  professionID: string;
}> = {
  '0010-0123-0001': { name: 'Juan Dela Cruz', spouseName: 'Andrea Dela Cruz', civilStatus: 'Married', email: 'jdcruz@email.com', mobile: '9171234567', homePhone: '(047)222-1235', businessLine: 'N/A', permanentAddress: 'Intramuros, Manila', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '25000', professionID: 'P001' },
  '0010-0123-0002': { name: 'Maria Eleanor Reyes', spouseName: 'N/A', civilStatus: 'Single', email: 'mariaer@email.com', mobile: '9182345678', homePhone: 'N/A', businessLine: 'N/A', permanentAddress: 'Mabalacat, Pampanga', mailingAddress: 'Pedro Gil St., Manila', monthlyIncome: '18000', professionID: 'P003' },
  '0010-0123-0003': { name: 'Josephine Torre', spouseName: 'Patrick Torre', civilStatus: 'Married', email: 'josephinetorre@email.com', mobile: '9215678901', homePhone: 'N/A', businessLine: 'N/A', permanentAddress: 'Pasig City', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '25000', professionID: 'P001' },
  '0010-0123-0004': { name: 'Christine Lim', spouseName: 'N/A', civilStatus: 'Widowed', email: 'clim@email.com', mobile: '9260123456', homePhone: 'N/A', businessLine: '(047)222-4568', permanentAddress: 'Intramuros, Manila', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '45000', professionID: 'P004' },
  '0010-0123-0005': { name: 'Mikko Santos', spouseName: 'Jennifer Santos', civilStatus: 'Married', email: 'mikkosan@gmail.com', mobile: '9259012345', homePhone: '(047)222-3457', businessLine: 'N/A', permanentAddress: 'Bacoor, Cavite', mailingAddress: 'Quirino Ave., Manila', monthlyIncome: '20000', professionID: 'P003' },
  '0010-0123-0006': { name: 'Eduardo Pascua', spouseName: 'N/A', civilStatus: 'Legally Separated', email: 'peduardo@email.com', mobile: '9248901234', homePhone: 'N/A', businessLine: 'N/A', permanentAddress: 'Santa Rosa, Laguna', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '28000', professionID: 'P002' },
  '0010-0123-0007': { name: 'Lily Fernandez', spouseName: 'N/A', civilStatus: 'Single', email: 'fernandezlily@email.com', mobile: '9237890123', homePhone: 'N/A', businessLine: '(047)222-7891', permanentAddress: 'Makati City', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '80000', professionID: 'P005' },
  '0010-0123-0008': { name: 'Carlo Mendoza', spouseName: 'Angela Mendoza', civilStatus: 'Married', email: 'cmendoza@email.com', mobile: '9291122334', homePhone: 'N/A', businessLine: 'N/A', permanentAddress: 'Quezon City', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '25000', professionID: 'P001' },
  '0010-0123-0009': { name: 'Angela Bautista', spouseName: 'N/A', civilStatus: 'Single', email: 'abautista@email.com', mobile: '9192233445', homePhone: 'N/A', businessLine: 'N/A', permanentAddress: 'Davao City', mailingAddress: 'SAME AS ABOVE', monthlyIncome: '70000', professionID: 'P005' },
  '0010-0123-0010': { name: 'Francis Villanueva', spouseName: 'Liza Villanueva', civilStatus: 'Married', email: 'fvillanueva@email.com', mobile: '9203344556', homePhone: '(033)222-3344', businessLine: 'N/A', permanentAddress: 'Iloilo City', mailingAddress: 'Pasig City', monthlyIncome: '40000', professionID: 'P002' },
};

const professions: Record<string, string> = {
  P001: 'Employed Private',
  P002: 'Employed Government',
  P003: 'Self-Earning Individual',
  P004: 'Sole Proprietor',
  P005: 'Professional Practitioner',
};

export default function RevalidationScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'lookup' | 'edit'>('lookup');
  const [pin, setPin] = useState('');
  const [form, setForm] = useState({
    name: '',
    spouseName: '',
    civilStatus: '',
    email: '',
    mobile: '',
    homePhone: '',
    businessLine: '',
    permanentAddress: '',
    mailingAddress: '',
    monthlyIncome: '',
    professionID: '',
  });

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLookup = () => {
    const member = MEMBER_DATA[pin];
    if (member) {
      setForm({
        name: member.name,
        spouseName: member.spouseName,
        civilStatus: member.civilStatus,
        email: member.email,
        mobile: member.mobile,
        homePhone: member.homePhone,
        businessLine: member.businessLine,
        permanentAddress: member.permanentAddress,
        mailingAddress: member.mailingAddress,
        monthlyIncome: member.monthlyIncome,
        professionID: member.professionID,
      });
      setStep('edit');
    } else {
      Alert.alert('Not Found', 'No member found with that PIN. Please check and try again.');
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Revalidation Submitted',
      `Member information for ${form.name} has been updated successfully!`,
      [{ text: 'OK', onPress: () => router.push('/(tabs)/explore') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REVALIDATION</Text>
        <View style={{ width: 50 }} />
      </View>

      {step === 'lookup' ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Member Lookup</Text>
          <Text style={styles.cardSubtitle}>Enter your PhilHealth PIN to load your current information.</Text>

          <Text style={styles.label}>PhilHealth PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="0010-0123-0000"
            placeholderTextColor="#aaa"
            value={pin}
            onChangeText={setPin}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleLookup}>
            <Text style={styles.buttonText}>Find My Record</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {/* PIN badge */}
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>PIN</Text>
            <Text style={styles.infoValue}>{pin}</Text>
            <Text style={styles.infoNote}>Review and update your information below.</Text>
          </View>

          {/* Section 1 - Personal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={v => update('name', v)} placeholderTextColor="#aaa" />

            <Text style={styles.label}>Spouse Name</Text>
            <TextInput style={styles.input} value={form.spouseName} onChangeText={v => update('spouseName', v)} placeholder="N/A if not applicable" placeholderTextColor="#aaa" />

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

          {/* Section 2 - Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>

            <Text style={styles.label}>Permanent Address</Text>
            <TextInput style={styles.input} value={form.permanentAddress} onChangeText={v => update('permanentAddress', v)} placeholderTextColor="#aaa" />

            <Text style={styles.label}>Mailing Address</Text>
            <TextInput style={styles.input} value={form.mailingAddress} onChangeText={v => update('mailingAddress', v)} placeholder="Same as above or different" placeholderTextColor="#aaa" />
          </View>

          {/* Section 3 - Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={form.email} onChangeText={v => update('email', v)} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput style={styles.input} value={form.mobile} onChangeText={v => update('mobile', v)} keyboardType="phone-pad" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Home Phone Number</Text>
            <TextInput style={styles.input} value={form.homePhone} onChangeText={v => update('homePhone', v)} keyboardType="phone-pad" placeholder="N/A if not applicable" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Business Direct Line</Text>
            <TextInput style={styles.input} value={form.businessLine} onChangeText={v => update('businessLine', v)} keyboardType="phone-pad" placeholder="N/A if not applicable" placeholderTextColor="#aaa" />
          </View>

          {/* Section 4 - Employment */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employment Information</Text>

            <Text style={styles.label}>Monthly Income</Text>
            <TextInput style={styles.input} value={form.monthlyIncome} onChangeText={v => update('monthlyIncome', v)} keyboardType="numeric" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Member Type</Text>
            <View style={styles.optionRow}>
              {Object.entries(professions).map(([id, label]) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.optionBtn, form.professionID === id && styles.optionBtnActive]}
                  onPress={() => update('professionID', id)}>
                  <Text style={[styles.optionText, form.professionID === id && styles.optionTextActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>SUBMIT REVALIDATION</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => setStep('lookup')}>
            <Text style={styles.cancelText}>← Look up a different PIN</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7f0',
  },
  header: {
    backgroundColor: '#3aaa35',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backBtn: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    width: 50,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#3aaa35',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontSize: 11,
    color: '#c8f0c8',
    fontWeight: '600',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  infoNote: {
    fontSize: 12,
    color: '#c8f0c8',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3aaa35',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  button: {
    backgroundColor: '#3aaa35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: '#3aaa35',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  cancelBtn: {
    alignItems: 'center',
    padding: 16,
  },
  cancelText: {
    color: '#3aaa35',
    fontSize: 13,
    fontWeight: '600',
  },
});