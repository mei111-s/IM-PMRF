import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const VALID_PINS = [
  '0010-0123-0001', '0010-0123-0002', '0010-0123-0003', '0010-0123-0004', '0010-0123-0005',
  '0010-0123-0006', '0010-0123-0007', '0010-0123-0008', '0010-0123-0009', '0010-0123-0010',
];

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (VALID_PINS.includes(pin)) {
      router.push('/(tabs)/explore');
    } else {
      Alert.alert('Invalid PIN', 'Please check your PIN and try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      {/* Top green banner */}
      <View style={styles.topBanner}>
        <Text style={styles.bannerTagline}>Your Member in Health</Text>
      </View>

      {/* Main card */}
      <View style={styles.card}>
        {/* Logo row */}
        <View style={styles.logoRow}>
          <Image
            source={require('@/assets/images/philhealth_logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoTitle}>PHILHEALTH</Text>
        </View>

        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSub}>Enter your 12 digits PhilHealth PIN.</Text>

        <TextInput
          style={styles.input}
          placeholder="PhilHealth PIN"
          placeholderTextColor="#aaa"
          value={pin}
          onChangeText={setPin}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.rememberRow}
          onPress={() => setRemember(!remember)}>
          <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
            {remember && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>Create New Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>PhilHealth Check</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkTextGreen}>PhilHealth Membership{'\n'}Application</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomLabel}>Language:</Text>
        <TouchableOpacity>
          <Text style={styles.bottomLink}>Preferences</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appVerRow}>
        <Text style={styles.appVerText}>App ver something something</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7f0',
  },
  topBanner: {
    backgroundColor: '#3aaa35',
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },
  bannerTagline: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 14,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 18,
  },
  logoImage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#222',
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#3aaa35',
    borderColor: '#3aaa35',
  },
  checkMark: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 13,
    color: '#555',
  },
  loginBtn: {
    backgroundColor: '#3aaa35',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#3aaa35',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'underline',
  },
  linkTextGreen: {
    fontSize: 12,
    color: '#3aaa35',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
  },
  bottomLabel: {
    fontSize: 12,
    color: '#888',
  },
  bottomLink: {
    fontSize: 12,
    color: '#3aaa35',
    textDecorationLine: 'underline',
  },
  appVerRow: {
    alignItems: 'center',
    marginTop: 6,
  },
  appVerText: {
    fontSize: 11,
    color: '#bbb',
  },
});