import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MEMBER_DATA: Record<string, { name: string; location: string }> = {
  '0010-0123-0001': { name: 'Juan Dela Cruz', location: 'Quezon City, Metro Manila' },
  '0010-0123-0002': { name: 'Maria Eleanor Reyes', location: 'Mabalacat, Pampanga' },
  '0010-0123-0003': { name: 'Josephine Torre', location: 'Pasig City' },
  '0010-0123-0004': { name: 'Christine Lim', location: 'Intramuros, Manila' },
  '0010-0123-0005': { name: 'Mikko Santos', location: 'Bacoor, Cavite' },
  '0010-0123-0006': { name: 'Eduardo Pascua', location: 'Santa Rosa, Laguna' },
  '0010-0123-0007': { name: 'Lily Fernandez', location: 'Makati City' },
  '0010-0123-0008': { name: 'Carlo Mendoza', location: 'Quezon City' },
  '0010-0123-0009': { name: 'Angela Bautista', location: 'Davao City' },
  '0010-0123-0010': { name: 'Francis Villanueva', location: 'Iloilo City' },
};

// For demo: default to first member
const currentMember = MEMBER_DATA['0010-0123-0001'];

export default function DashboardScreen() {
  const router = useRouter();

  const membershipActions = [
    { icon: 'file-document-edit-outline', label: 'New Membership\nRegistration Form', onPress: () => router.push('/(tabs)/form') },
    { icon: 'account-edit-outline', label: 'Member Hold\nEmployment Update', onPress: () => {} },
    { icon: 'file-replace-outline', label: 'Electronic Group\nEnrollment/Update', onPress: () => {} },
    { icon: 'heart-pulse', label: 'Benefits', onPress: () => router.push('/(tabs)/benefits' as any) },
    { icon: 'credit-card-outline', label: 'Contributions', onPress: () => {} },
    { icon: 'calculator-variant-outline', label: 'Calculator', onPress: () => {} },
    { icon: 'file-check-outline', label: 'Accreditations', onPress: () => {} },
  ];

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PhilHealth</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeGreeting}>
            Mabuhay {currentMember.name.split(' ')[0]}{'\n'}{currentMember.name.split(' ').slice(1).join(' ')}!
          </Text>
          <Text style={styles.welcomeSub}>Welcome to your PhilHealth Dashboard!</Text>
          <Text style={styles.locationText}>
            <Ionicons name="location-outline" size={12} color="#3aaa35" />
            {'  '}{currentMember.location} · Tue May 24, 2026
          </Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color="#aaa" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for PhilHealth Services..."
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity style={styles.searchAction}>
            <Text style={styles.searchActionText}>Membership Registration</Text>
          </TouchableOpacity>
        </View>

        {/* Icon Grid Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconRow} contentContainerStyle={styles.iconRowContent}>
          {membershipActions.map((item, i) => (
            <TouchableOpacity key={i} style={styles.iconItem} onPress={item.onPress}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name={item.icon as any} size={26} color="#3aaa35" />
              </View>
              <Text style={styles.iconLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner / Hero Image placeholder */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBannerInner}>
            <MaterialCommunityIcons name="hospital-building" size={48} color="rgba(255,255,255,0.4)" />
            <Text style={styles.heroBannerText}>Philippine Health{'\n'}Insurance Corporation</Text>
          </View>
        </View>

        {/* Membership section */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>MEMBERSHIP</Text>

          <View style={styles.memberGrid}>
            <TouchableOpacity style={styles.memberBtn} onPress={() => router.push('/(tabs)/form')}>
              <Text style={styles.memberBtnText}>New Membership{'\n'}Registration Form</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memberBtn} onPress={() => router.push('/(tabs)/revalidation')}>
              <Text style={styles.memberBtnText}>Update Membership{'\n'}Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memberBtn}>
              <Text style={styles.memberBtnText}>View Membership{'\n'}Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memberBtn}>
              <Text style={styles.memberBtnText}>Online Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memberBtn}>
              <Text style={styles.memberBtnText}>View or Print MDR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity History */}
        <View style={styles.sectionBlock}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Your Activity History</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All ▾</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityPlaceholder}>
            <Text style={styles.activityEmpty}>No recent activity</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: 'grid', label: 'Menu', active: true },
          { icon: 'search', label: 'Search' },
          { icon: 'home', label: 'Home' },
          { icon: 'person', label: 'Profile' },
          { icon: 'mail', label: 'Inbox' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={item.active ? '#3aaa35' : '#aaa'}
            />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },

  // Welcome
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  welcomeGreeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    lineHeight: 34,
  },
  welcomeSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#3aaa35',
    marginTop: 6,
  },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  searchAction: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchActionText: {
    fontSize: 12,
    color: '#3aaa35',
    fontWeight: '600',
  },

  // Icon Row
  iconRow: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconRowContent: {
    paddingHorizontal: 14,
    gap: 6,
  },
  iconItem: {
    alignItems: 'center',
    width: 72,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconLabel: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
    fontWeight: '500',
  },

  // Hero banner
  heroBanner: {
    backgroundColor: '#3aaa35',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    height: 120,
    overflow: 'hidden',
  },
  heroBannerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: 20,
  },
  heroBannerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 22,
  },

  // Membership section
  sectionBlock: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 1,
    marginBottom: 12,
  },
  memberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  memberBtn: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 14,
    width: '47%',
    minHeight: 60,
    justifyContent: 'center',
  },
  memberBtnText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '600',
    lineHeight: 17,
  },

  // Activity
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 12,
    color: '#3aaa35',
    fontWeight: '600',
  },
  activityPlaceholder: {
    height: 80,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmpty: {
    fontSize: 13,
    color: '#bbb',
    fontStyle: 'italic',
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 10,
    color: '#aaa',
  },
  navLabelActive: {
    color: '#3aaa35',
    fontWeight: '600',
  },
});