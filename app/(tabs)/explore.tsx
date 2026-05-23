import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerTitle}>PhilHealth</Text>
        <Ionicons name="person-circle-outline" size={28} color="#FFC200" />
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeLeft}>
          <Text style={styles.welcomeGreeting}>Welcome!</Text>
          <Text style={styles.welcomeSub}>What would you like to do today?</Text>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeBadgeText}>Active Member</Text>
          </View>
        </View>
        <View style={styles.welcomeRight}>
          <MaterialCommunityIcons name="hospital-building" size={64} color="rgba(255,255,255,0.3)" />
        </View>
      </View>

      {/* Membership Services */}
      <Text style={styles.sectionLabel}>Membership Services</Text>
      <View style={styles.bigButtonRow}>
        <TouchableOpacity
          style={[styles.bigButton, { borderTopColor: '#3aaa35' }]}
          onPress={() => router.push('/(tabs)/form')}>
          <MaterialCommunityIcons name="file-document-edit-outline" size={32} color="#3aaa35" />
          <Text style={styles.bigButtonTitle}>New Membership</Text>
          <Text style={styles.bigButtonSub}>Register as a member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bigButton, { borderTopColor: '#FFC200' }]}
          onPress={() => router.push('/(tabs)/revalidation')}>
          <MaterialCommunityIcons name="refresh-circle" size={32} color="#FFC200" />
          <Text style={styles.bigButtonTitle}>Revalidation</Text>
          <Text style={styles.bigButtonSub}>Update your info</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Info Strip */}
      <View style={styles.infoStrip}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>5%</Text>
          <Text style={styles.infoLabel}>Premium Rate</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>₱500</Text>
          <Text style={styles.infoLabel}>Min/Month</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>24/7</Text>
          <Text style={styles.infoLabel}>Support</Text>
        </View>
      </View>

      {/* Other Services */}
      <Text style={styles.sectionLabel}>Other Services</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.miniBox}
          onPress={() => router.push('/(tabs)/contactus' as any)}>
          <MaterialCommunityIcons name="phone" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.miniBox}>
          <MaterialCommunityIcons name="newspaper-variant-outline" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>News</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.miniBox}
          onPress={() => router.push('/(tabs)/benefits' as any)}>
          <MaterialCommunityIcons name="heart-pulse" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>Benefits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.miniBox}>
          <MaterialCommunityIcons name="hospital-marker" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>Hospitals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.miniBox}>
          <MaterialCommunityIcons name="credit-card-outline" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>Contributions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.miniBox}
          onPress={() => router.push('/(tabs)/faqs' as any)}>
          <MaterialCommunityIcons name="frequently-asked-questions" size={28} color="#3aaa35" />
          <Text style={styles.miniBoxText}>FAQs</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#3aaa35" />
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Philippine Health Insurance Corporation</Text>
          <Text style={styles.footerSub}>Your Partner in Health</Text>
        </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  welcomeCard: {
    backgroundColor: '#3aaa35',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#3aaa35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  welcomeLeft: { flex: 1 },
  welcomeGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 13,
    color: '#c8f0c8',
    marginBottom: 14,
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#a8ff78',
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  welcomeRight: { marginLeft: 8 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  bigButtonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  bigButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderTopWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    gap: 6,
  },
  bigButtonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  bigButtonSub: {
    fontSize: 11,
    color: '#888',
  },
  infoStrip: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  infoItem: { alignItems: 'center' },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3aaa35',
  },
  infoLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  infoDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#eee',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  miniBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  miniBoxText: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 1,
  },
  footerTextContainer: { alignItems: 'center' },
  footerText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  footerSub: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
    fontStyle: 'italic',
  },
});