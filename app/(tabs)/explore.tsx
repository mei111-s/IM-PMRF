import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { authStore } from '@/stores/auth-store';
import { MEMBERS, getProfessionLabel } from '@/stores/member-data';

export default function DashboardScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const member = MEMBERS[pin];
  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = member?.memberName.split(' ')[0] ?? '';
  const lastName = member?.memberName.split(' ').slice(1).join(' ') ?? '';
  const professionLabel = member ? getProfessionLabel(member.professionID) : '';

  const membershipActions = [
    { icon: 'file-document-edit-outline', label: 'New Membership\nRegistration Form', onPress: () => router.push('/(tabs)/form') },
    { icon: 'heart-pulse',                label: 'Benefits',             onPress: () => router.push('/(tabs)/benefits' as any) },
    { icon: 'credit-card-outline',        label: 'Contributions',        onPress: () => {} },
    { icon: 'card-account-details-outline', label: 'Member\nPortal',     onPress: () => router.push('/(tabs)/revalidation' as any) },
    { icon: 'stethoscope',                label: 'Case Rates\nSearch',   onPress: () => {} },
    { icon: 'hospital-marker',            label: 'Accredited\nHospitals',onPress: () => {} },
    { icon: 'frequently-asked-questions', label: 'FAQs',                 onPress: () => router.push('/(tabs)/faqs' as any) },
  ];

  const initials = member?.memberName.split(' ').map(w => w[0]).slice(0, 2).join('') ?? '?';

  return (
    <View style={styles.root}>
      {/* Slide-out Menu Drawer */}
      <Modal visible={menuOpen} animationType="none" transparent onRequestClose={() => setMenuOpen(false)}>
        <TouchableOpacity style={styles.drawerOverlay} activeOpacity={1} onPress={() => setMenuOpen(false)}>
          <View style={styles.drawer}>
            {/* User strip with gradient */}
            <LinearGradient
              colors={['#3aaa35', '#7dc142', '#c8e04a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.drawerUserStrip}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>{initials}</Text>
              </View>
              <View style={styles.drawerUserInfo}>
                <Text style={styles.drawerUserName}>{member?.memberName ?? '—'}</Text>
                <Text style={styles.drawerUserPin}>{pin}</Text>
              </View>
            </LinearGradient>

            <View style={styles.drawerDivider} />

            {[
              { icon: 'home-outline',         label: 'Homepage',   route: '/(tabs)/home' },
              { icon: 'person-outline',        label: 'Profile',    route: '/(tabs)/profile' },
              { icon: 'settings-outline',      label: 'App Settings', route: null },
              { icon: 'document-text-outline', label: 'Form',       route: '/(tabs)/form' },
              { icon: 'globe-outline',         label: 'PhilHealth Online Services', route: null },
              { icon: 'browser-outline',       label: 'PhilHealth Webpage', route: null },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.drawerItem}
                onPress={() => { setMenuOpen(false); if (item.route) router.push(item.route as any); }}>
                <Ionicons name={item.icon as any} size={20} color="#555" />
                <Text style={styles.drawerItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.drawerBottom}>
              <TouchableOpacity 
                style={styles.drawerViewMDR}
                onPress={() => { setMenuOpen(false); router.push('/(tabs)/revalidation' as any); }}>
                <Text style={styles.drawerViewMDRText}>View Membership Record</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            <Ionicons name="menu" size={26} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PhilHealth</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/inbox' as any)}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Welcome — gradient background matching Figma */}
        <LinearGradient
          colors={['#2d8f2a', '#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.welcomeSection}>
          <Text style={styles.welcomeGreeting}>Mabuhay {firstName}{'\n'}{lastName}!</Text>
          <Text style={styles.welcomeSub}>Welcome to your PhilHealth Dashboard!</Text>
          <Text style={styles.locationText}>
            📍 {member?.permanentAddress ?? ''}
          </Text>
        </LinearGradient>

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
            <TextInput
              style={styles.searchInput}
              placeholder="Search for PhilHealth Services..."
              placeholderTextColor="#aaa"
            />
          </View>
          <TouchableOpacity style={styles.searchAction} onPress={() => router.push('/(tabs)/form' as any)}>
            <Text style={styles.searchActionText}>Membership Registration</Text>
          </TouchableOpacity>
        </View>

        {/* Icon Grid Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconRow} contentContainerStyle={styles.iconRowContent}>
          {membershipActions.map((item, i) => (
            <Pressable
              key={i}
              style={({ pressed, hovered }: any) => [styles.iconItem, (pressed || hovered) && styles.iconItemHover]}
              onPress={item.onPress}>
              {({ pressed, hovered }: any) => (
                <>
                  <View style={[styles.iconCircle, (pressed || hovered) && styles.iconCircleHover]}>
                    <MaterialCommunityIcons name={item.icon as any} size={22} color="#3aaa35" />
                  </View>
                  <Text style={[styles.iconLabel, (pressed || hovered) && styles.iconLabelHover]}>{item.label}</Text>
                </>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* Hero Banner — gradient */}
        <LinearGradient
          colors={['#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroBanner}>
          <View style={styles.heroBannerInner}>
            <View style={styles.heroBannerBadge}>
              <Text style={styles.heroBannerBadgeText}>Ika-31{'\n'}Anibersaryo{'\n'}ng PhilHealth</Text>
            </View>
            <Text style={styles.heroBannerText}>Naglilingkod{'\n'}para sa Bawat{'\n'}Pilipino</Text>
          </View>
        </LinearGradient>

        {/* Membership Form section */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>MEMBERSHIP FORM</Text>
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
                style={({ pressed, hovered }: any) => [styles.memberBtn, (pressed || hovered) && styles.memberBtnHover]}
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

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav — compact rounded style matching pic 2 */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {[
            { icon: 'grid',    label: 'Menu',    active: true,  route: null },
            { icon: 'search',  label: 'Search',  active: false, route: '/(tabs)/search' },
            { icon: 'home',    label: 'Home',    active: false, route: '/(tabs)/home' },
            { icon: 'person',  label: 'Profile', active: false, route: '/(tabs)/profile' },
            { icon: 'mail',    label: 'Inbox',   active: false, route: '/(tabs)/inbox' },
          ].map((item, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.navItem, item.active && styles.navItemActive]} 
              onPress={item.route ? () => router.push(item.route as any) : () => setMenuOpen(true)}>
              <Ionicons name={item.icon as any} size={20} color={item.active ? '#fff' : '#888'} />
              <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fafafa' },
  container: { flex: 1 },

  // Drawer — updated to match pic 4 (floating card style)
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' },
  drawer: { 
    width: 260, 
    backgroundColor: '#fff', 
    marginTop: 60,
    marginLeft: 12,
    marginBottom: 20,
    borderRadius: 16,
    paddingTop: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  drawerUserStrip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    gap: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  drawerAvatar: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: 'rgba(255,255,255,0.25)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 2, 
    borderColor: 'rgba(255,255,255,0.5)' 
  },
  drawerAvatarText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  drawerUserInfo: { flex: 1 },
  drawerUserName: { fontSize: 14, fontWeight: '700', color: '#fff' },
  drawerUserPin: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 1 },
  drawerDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  drawerItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  drawerItemText: { fontSize: 14, color: '#333', fontWeight: '500' },
  drawerBottom: { 
    marginTop: 'auto', 
    padding: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  drawerViewMDR: { 
    borderRadius: 10, 
    paddingVertical: 12, 
    alignItems: 'center',
    backgroundColor: '#3aaa35',
  },
  drawerViewMDRText: { fontSize: 13, color: '#fff', fontWeight: '700' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333', letterSpacing: 0.5 },

  welcomeSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  welcomeGreeting: { fontSize: 28, fontWeight: '800', color: '#fff', lineHeight: 34 },
  welcomeSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  locationText: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

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

  heroBanner: { marginHorizontal: 16, marginTop: 16, borderRadius: 14, height: 120, overflow: 'hidden' },
  heroBannerInner: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 20 },
  heroBannerText: { fontSize: 16, fontWeight: '700', color: '#fff', lineHeight: 22 },
  heroBannerBadge: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  heroBannerBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 16 },

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

  // Bottom Nav — compact rounded style matching pic 2
  bottomNavContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    gap: 4,
  },
  navItem: { 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 52,
  },
  navItemActive: {
    backgroundColor: '#3aaa35',
  },
  navLabel: { 
    fontSize: 10, 
    color: '#888',
    marginTop: 2,
  },
  navLabelActive: { 
    color: '#fff', 
    fontWeight: '600',
  },
});