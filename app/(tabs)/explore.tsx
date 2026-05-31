import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authStore } from '@/stores/auth-store';
import { MEMBERS, getProfessionLabel } from '@/stores/member-data';

export default function DashboardScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const member = MEMBERS[pin];

  const firstName = member?.memberName.split(' ')[0] ?? '';
  const lastName = member?.memberName.split(' ').slice(1).join(' ') ?? '';
  const professionLabel = member ? getProfessionLabel(member.professionID) : '';
  const location = member?.permanentAddress ?? '';

  const membershipActions = [
    { icon: 'file-document-edit-outline', label: 'New Membership\nRegistration Form', onPress: () => router.push('/(tabs)/form') },
    { icon: 'account-edit-outline',       label: 'Member Hold\nEmployment Update',    onPress: () => {} },
    { icon: 'file-replace-outline',       label: 'Electronic Group\nEnrollment/Update', onPress: () => {} },
    { icon: 'heart-pulse',                label: 'Benefits',       onPress: () => router.push('/(tabs)/benefits' as any) },
    { icon: 'credit-card-outline',        label: 'Contributions',  onPress: () => {} },
    { icon: 'calculator-variant-outline', label: 'Calculator',     onPress: () => {} },
    { icon: 'file-check-outline',         label: 'Accreditations', onPress: () => {} },
  ];

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity><Ionicons name="menu" size={26} color="#333" /></TouchableOpacity>
          <Text style={styles.headerTitle}>PhilHealth</Text>
          <TouchableOpacity><Ionicons name="notifications-outline" size={24} color="#333" /></TouchableOpacity>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeGreeting}>Mabuhay {firstName}{'\n'}{lastName}!</Text>
          <Text style={styles.welcomeSub}>Welcome to your PhilHealth Dashboard!</Text>
          <Text style={styles.locationText}>
            📍 {location}
          </Text>
        </View>

        {/* Member info strip */}
        <View style={styles.memberStrip}>
          <View style={styles.memberStripItem}>
            <Text style={styles.memberStripLabel}>PIN</Text>
            <Text style={styles.memberStripValue}>{pin}</Text>
          </View>
          <View style={styles.memberStripDivider} />
          <View style={styles.memberStripItem}>
            <Text style={styles.memberStripLabel}>Member Type</Text>
            <Text style={styles.memberStripValue} numberOfLines={1}>{professionLabel}</Text>
          </View>
          <View style={styles.memberStripDivider} />
          <View style={styles.memberStripItem}>
            <Text style={styles.memberStripLabel}>Purpose</Text>
            <Text style={styles.memberStripValue}>{member?.purpose ?? '—'}</Text>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color="#aaa" style={{ marginRight: 8 }} />
            <TextInput style={styles.searchInput} placeholder="Search for PhilHealth Services..." placeholderTextColor="#aaa" />
          </View>
          <TouchableOpacity style={styles.searchAction}>
            <Text style={styles.searchActionText}>Membership Registration</Text>
          </TouchableOpacity>
        </View>

        {/* Icon Grid Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconRow} contentContainerStyle={styles.iconRowContent}>
          {membershipActions.map((item, i) => (
            <Pressable
              key={i}
              style={({ pressed, hovered }: any) => [
                styles.iconItem,
                (pressed || hovered) && styles.iconItemHover,
              ]}
              onPress={item.onPress}>
              {({ pressed, hovered }: any) => (
                <>
                  <View style={[styles.iconCircle, (pressed || hovered) && styles.iconCircleHover]}>
                    <MaterialCommunityIcons name={item.icon as any} size={26} color="#3aaa35" />
                  </View>
                  <Text style={[styles.iconLabel, (pressed || hovered) && styles.iconLabelHover]}>{item.label}</Text>
                </>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* Hero banner */}
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
            {[
              { label: 'New Membership\nRegistration Form', onPress: () => router.push('/(tabs)/form') },
              { label: 'Update Membership\nRecord',         onPress: () => router.push('/(tabs)/revalidation') },
              { label: 'View Membership\nRecord',           onPress: () => router.push('/(tabs)/revalidation') },
              { label: 'Online Payment',                    onPress: () => {} },
              { label: 'View or Print MDR',                 onPress: () => router.push('/(tabs)/revalidation') },
            ].map((item, i) => (
              <Pressable
                key={i}
                style={({ pressed, hovered }: any) => [
                  styles.memberBtn,
                  (pressed || hovered) && styles.memberBtnHover,
                ]}
                onPress={item.onPress}>
                {({ pressed, hovered }: any) => (
                  <Text style={[styles.memberBtnText, (pressed || hovered) && styles.memberBtnTextHover]}>
                    {item.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Activity History */}
        <View style={styles.sectionBlock}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Your Activity History</Text>
            <TouchableOpacity><Text style={styles.viewAllText}>View All ▾</Text></TouchableOpacity>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <Text style={styles.activityPin}>{pin}</Text>
              <Text style={styles.activityName}>{member?.memberName}</Text>
              <Text style={styles.activityPurpose}>{member?.purpose}</Text>
            </View>
            <View style={[styles.purposeBadge, member?.purpose === 'Updating/Amendment' && styles.purposeBadgeAmend]}>
              <Text style={styles.purposeBadgeText}>{member?.purpose === 'Updating/Amendment' ? 'Update' : 'Registration'}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: 'grid',    label: 'Menu',    active: true,  route: null },
          { icon: 'search',  label: 'Search',  active: false, route: '/(tabs)/search' },
          { icon: 'home',    label: 'Home',    active: false, route: '/(tabs)/explore' },
          { icon: 'person',  label: 'Profile', active: false, route: '/(tabs)/profile' },
          { icon: 'mail',    label: 'Inbox',   active: false, route: null },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={item.route ? () => router.push(item.route as any) : undefined}>
            <Ionicons name={item.icon as any} size={22} color={item.active ? '#3aaa35' : '#aaa'} />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fafafa' },
  container: { flex: 1 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333', letterSpacing: 0.5 },

  welcomeSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4, backgroundColor: '#fff' },
  welcomeGreeting: { fontSize: 28, fontWeight: '800', color: '#111', lineHeight: 34 },
  welcomeSub: { fontSize: 13, color: '#888', marginTop: 4 },
  locationText: { fontSize: 12, color: '#3aaa35', marginTop: 4, marginBottom: 12 },

  memberStrip: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  memberStripItem: { alignItems: 'center', flex: 1 },
  memberStripLabel: { fontSize: 10, color: '#aaa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  memberStripValue: { fontSize: 12, fontWeight: '700', color: '#333', textAlign: 'center' },
  memberStripDivider: { width: 1, height: 30, backgroundColor: '#eee' },

  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff', gap: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  searchInput: { flex: 1, fontSize: 13, color: '#333' },
  searchAction: { backgroundColor: '#f4f4f4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  searchActionText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },

  iconRow: { backgroundColor: '#fff', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  iconRowContent: { paddingHorizontal: 14, gap: 6 },
  iconItem: { alignItems: 'center', width: 72 },
  iconCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#f0f7f0', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  iconLabel: { fontSize: 10, color: '#555', textAlign: 'center', lineHeight: 13, fontWeight: '500' },
  iconItemHover: {},
  iconCircleHover: { backgroundColor: '#d4edda', shadowColor: '#3aaa35', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  iconLabelHover: { color: '#3aaa35', fontWeight: '700' },

  heroBanner: { backgroundColor: '#3aaa35', marginHorizontal: 16, marginTop: 16, borderRadius: 14, height: 120, overflow: 'hidden' },
  heroBannerInner: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 20 },
  heroBannerText: { fontSize: 16, fontWeight: '700', color: '#fff', lineHeight: 22 },

  sectionBlock: { marginHorizontal: 16, marginTop: 20, backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#333', letterSpacing: 1, marginBottom: 12 },
  memberGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  memberBtn: { backgroundColor: '#f4f4f4', borderRadius: 10, padding: 14, width: '47%', minHeight: 60, justifyContent: 'center' },
  memberBtnHover: { backgroundColor: '#fff', shadowColor: '#3aaa35', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 8, elevation: 6 },
  memberBtnText: { fontSize: 12, color: '#444', fontWeight: '600', lineHeight: 17 },
  memberBtnTextHover: { color: '#3aaa35', fontWeight: '800' },

  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAllText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },
  activityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 10, padding: 12 },
  activityLeft: { flex: 1 },
  activityPin: { fontSize: 13, fontWeight: '700', color: '#333' },
  activityName: { fontSize: 12, color: '#555', marginTop: 2 },
  activityPurpose: { fontSize: 11, color: '#aaa', marginTop: 2 },
  purposeBadge: { backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  purposeBadgeAmend: { backgroundColor: '#fff8e1' },
  purposeBadgeText: { fontSize: 11, color: '#3aaa35', fontWeight: '700' },

  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingBottom: 20, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10, color: '#aaa' },
  navLabelActive: { color: '#3aaa35', fontWeight: '600' },
});