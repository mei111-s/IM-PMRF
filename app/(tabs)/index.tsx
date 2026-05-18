import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

  const handleLogin = () => {
    if (VALID_PINS.includes(pin)) {
      Alert.alert('Success', 'Welcome to PhilHealth!');
    } else {
      Alert.alert('Invalid PIN', 'Please check your PIN and try again.');
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Enter your PhilHealth PIN number.</Text>
      <Text style={styles.hint}>(Please take note that your PhilHealth pin number is sent to your email)</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3aaa35',
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#555',
    letterSpacing: 1,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  hint: {
    fontSize: 11,
    color: '#888',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});