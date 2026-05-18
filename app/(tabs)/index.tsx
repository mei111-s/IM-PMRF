import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const VALID_PINS = [
  '0010-0123-0001',
  '0010-0123-0002',
  '0010-0123-0003',
  '0010-0123-0004',
  '0010-0123-0005',
  '0010-0123-0006',
  '0010-0123-0007',
  '0010-0123-0008',
  '0010-0123-0009',
  '0010-0123-0010',
];

export default function LoginScreen() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (VALID_PINS.includes(pin)) {
      router.push('/(tabs)/explore');
    } else {
      Alert.alert('Invalid PIN', 'Please check your PIN and try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Top green banner */}
      <View style={styles.topBanner}>
        <Text style={styles.bannerTagline}>Your Partner in Health</Text>
      </View>

      {/* Main card */}
      <View style={styles.card}>
        {/* Logo row */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/philhealth_logo.png')}
            style={styles.logoImage}
          />
          <View>
            <Text style={styles.logoTitle}>PhilHealth</Text>
            <Text style={styles.logoSubtitle}>MEMBERSHIP REGISTRATION</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Enter your PhilHealth PIN</Text>
        <Text style={styles.hint}>Your PIN was sent to your registered email address.</Text>

        <TextInput
          style={styles.input}
          placeholder="0000-0000-0000"
          placeholderTextColor="#aaa"
          value={pin}
          onChangeText={setPin}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Having trouble? Contact PhilHealth at{'\n'}
          <Text style={styles.footerLink}>(02) 866-225-88</Text>
        </Text>
      </View>

      {/* Bottom banner */}
      <View style={styles.bottomBanner}>
        <Text style={styles.bottomText}>© 2025 Philippine Health Insurance Corporation</Text>
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
    paddingBottom: 50,
    alignItems: 'center',
  },
  bannerTagline: {
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -24,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  logoImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3aaa35',
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#777',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
    marginBottom: 16,
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#3aaa35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#3aaa35',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  footerNote: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: '#3aaa35',
    fontWeight: '600',
  },
  bottomBanner: {
    marginTop: 'auto',
    backgroundColor: '#3aaa35',
    padding: 16,
    alignItems: 'center',
  },
  bottomText: {
    color: '#fff',
    fontSize: 11,
  },
});