import { authStore } from '@/stores/auth-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const VALID_PINS = [
  '0010-0123-0001', '0010-0123-0002', '0010-0123-0003', '0010-0123-0004', '0010-0123-0005',
  '0010-0123-0006', '0010-0123-0007', '0010-0123-0008', '0010-0123-0009', '0010-0123-0010',
];

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (VALID_PINS.includes(pin)) {
      authStore.setPin(pin);
      router.push('/(tabs)/explore');
    } else {
      Alert.alert('Invalid PIN', 'Please check your PIN and try again.');
    }
  };

  return (
    // Gradient: deep green (top-left) → yellow-green (bottom-right), matching Figma
    <LinearGradient
      colors={['#2d8f2a', '#3aaa35', '#7dc142', '#c8e04a']}
      style={styles.root}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 1 }}>

      {/* Top spacer with tagline */}
      <View style={styles.topSection}>
        <Text style={styles.tagline}>Your Partner in Health</Text>
      </View>

      {/* Card */}
      <KeyboardAvoidingView
        style={styles.cardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoRow}>
            <Image
              source={require('@/assets/images/philhealth_logo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.logoTitle}>PhilHealth</Text>
          </View>
          <Text style={styles.logoTagline}>Your Partner in Health</Text>

          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSub}>Enter your 12 digits PhilHealth PIN.</Text>

          {/* PIN input */}
          <TextInput
            style={styles.input}
            placeholder="PhilHealth PIN"
            placeholderTextColor="#bbb"
            value={pin}
            onChangeText={setPin}
            autoCapitalize="none"
          />

          {/* Password input */}
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          {/* Remember me */}
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRemember(!remember)}>
            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
              {remember && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          {/* Login button — gradient matching Figma's green→yellow-green */}
          <LinearGradient
            colors={['#3aaa35', '#7dc142', '#c8e04a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginBtnGradient}>
            <TouchableOpacity style={styles.loginBtnInner} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Links */}
          <View style={styles.linksRow}>
            <TouchableOpacity><Text style={styles.linkText}>Forgot Password?</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Create New Account</Text></TouchableOpacity>
          </View>
          <View style={styles.linksRow}>
            <TouchableOpacity><Text style={styles.linkText}>PhilHealth Check</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[styles.linkText, styles.linkGreen]}>PhilHealth Membership{'\n'}Application</Text></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomLabel}>Language:</Text>
        <TouchableOpacity><Text style={styles.bottomLink}>Preferences ▾</Text></TouchableOpacity>
      </View>
      <View style={styles.appVerRow}>
        <Text style={styles.appVerText}>Beta V1.0</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  topSection: {
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: 'center',
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },

  cardWrap: { flex: 1, justifyContent: 'flex-start' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4 },
  logoImage: { width: 44, height: 44, resizeMode: 'contain' },
  logoTitle: { fontSize: 24, fontWeight: '900', color: '#222', letterSpacing: 1 },
  logoTagline: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },

  welcomeTitle: { fontSize: 22, fontWeight: '800', color: '#111', textAlign: 'center', marginBottom: 4 },
  welcomeSub: { fontSize: 12, color: '#aaa', textAlign: 'center', marginBottom: 20 },

  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ececec',
  },

  passwordRow: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  passwordInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 13, fontSize: 14, color: '#333' },
  eyeBtn: { paddingHorizontal: 14 },
  eyeIcon: { fontSize: 16 },

  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  checkboxChecked: { backgroundColor: '#3aaa35', borderColor: '#3aaa35' },
  checkMark: { fontSize: 10, color: '#fff', fontWeight: 'bold' },
  rememberText: { fontSize: 13, color: '#555' },

  loginBtnGradient: {
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#3aaa35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnInner: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginBtnText: { fontSize: 15, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },

  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  linkText: { fontSize: 12, color: '#666', textDecorationLine: 'underline' },
  linkGreen: { color: '#3aaa35', textAlign: 'right' },

  bottomBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 12 },
  bottomLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  bottomLink: { fontSize: 12, color: '#fff', fontWeight: '600' },
  appVerRow: { alignItems: 'center', paddingBottom: 24 },
  appVerText: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
});