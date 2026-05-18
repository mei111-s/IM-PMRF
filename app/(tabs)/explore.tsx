import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
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
        <Text style={styles.bannerText}>WELCOME TO YOUR PHILHEALTH PORTAL</Text>
      </View>

      {/* Two Big Buttons */}
      <View style={styles.bigButtonRow}>
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.bigButtonText}>NEW MEMBERSHIP FORM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton}>
          <Text style={styles.bigButtonText}>REVALIDATION</Text>
        </TouchableOpacity>
      </View>

      {/* Mini Boxes */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>Benefits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>Hospitals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>Contributions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniBox}>
          <Text style={styles.miniBoxText}>FAQs</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#e0f0e8',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 13,
    color: '#006B3F',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  bigButtonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bigButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  bigButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  miniBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBoxText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});