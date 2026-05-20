import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const miniBoxes = [
  { label: 'Contact Us', icon: 'phone.fill' },
  { label: 'News', icon: 'newspaper.fill' },
  { label: 'Benefits', icon: 'heart.fill' },
  { label: 'Hospitals', icon: 'cross.fill' },
  { label: 'Contributions', icon: 'creditcard.fill' },
  { label: 'FAQs', icon: 'questionmark.circle.fill' },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>☰</Text>
        <Text style={styles.headerTitle}>PhilHealth</Text>
        <IconSymbol size={24} name="person.fill" color="#FFC200" />
      </View>

      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerGreeting}>Welcome!</Text>
        <Text style={styles.bannerText}>What would you like to do today?</Text>
      </View>

      {/* Section Label */}
      <Text style={styles.sectionLabel}>Membership Services</Text>

      {/* Two Big Buttons */}
      <View style={styles.bigButtonRow}>
        <TouchableOpacity style={styles.bigButton} onPress={() => router.push('/(tabs)/form')}>
          <IconSymbol size={32} name="doc.text.fill" color="#3aaa35" />
          <Text style={styles.bigButtonText}>NEW{'\n'}MEMBERSHIP{'\n'}FORM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => router.push('/(tabs)/revalidation')}>
          <IconSymbol size={32} name="arrow.clockwise.circle.fill" color="#3aaa35" />
          <Text style={styles.bigButtonText}>MEMBERSHIP{'\n'}REVALIDATION</Text>
        </TouchableOpacity>
      </View>

      {/* Section Label */}
      <Text style={styles.sectionLabel}>Other Services</Text>

      {/* Mini Boxes */}
      <View style={styles.grid}>
        {miniBoxes.map((box) => (
          <TouchableOpacity key={box.label} style={styles.miniBox}>
            <IconSymbol size={28} name={box.icon} color="#3aaa35" />
            <Text style={styles.miniBoxText}>{box.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 30 }} />
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
  headerText: {
    fontSize: 22,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  banner: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  bannerGreeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 13,
    color: '#888',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bigButtonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  bigButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#d4edd4',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  bigButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  miniBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#d4edd4',
    borderRadius: 12,
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  miniBoxText: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
    fontWeight: '600',
  },
});