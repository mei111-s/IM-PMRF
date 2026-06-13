import { authStore } from '@/stores/auth-store';
import { MEMBERS, getDependentsByPin, getProfessionLabel } from '@/stores/member-data';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ANNOUNCEMENTS = [
  {
    date: 'May 28, 2026',
    title: '2026 Premium Contribution Rate',
    body: 'The premium rate remains at 5% of the Monthly Basic Salary, with a floor of ₱500 and ceiling of ₱5,000 per month.',
    tag: 'Advisory',
    tagColor: '#1976d2',
  },
  {
    date: 'May 15, 2026',
    title: 'Konsulta (YAKAP) Package Now Available',
    body: 'All PhilHealth members and dependents may now avail of the free primary care consultations at accredited KonSulTa providers.',
    tag: 'Update',
    tagColor: '#3aaa35',
  },
  {
    date: 'April 30, 2026',
    title: 'No Balance Billing Policy Reminder',
    body: 'Indigent and sponsored members confined in government hospitals in ward accommodations shall not be charged any additional fees.',
    tag: 'Reminder',
    tagColor: '#e65100',
  },
  {
    date: 'April 10, 2026',
    title: 'Z-Benefit Program for Catastrophic Illnesses',
    body: 'PhilHealth Z-Benefits now cover HIV treatment, cancer care, and kidney transplants. Coverage can exceed ₱1,000,000. Pre-authorization required.',
    tag: 'Advisory',
    tagColor: '#1976d2',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const member = MEMBERS[pin];
  const dependents = getDependentsByPin(pin);
  const monthlyIncome = member ? parseFloat(member.monthlyIncome) : 0;
  const contribution = Math.min(Math.max(monthlyIncome * 0.05, 500), 5000);
  const memberShare = contribution / 2;

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Home</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/inbox' as any)}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Member summary card — gradient */}
        <LinearGradient
          colors={['#2d8f2a', '#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryGreeting}>Good day,</Text>
            <Text style={styles.summaryName}>{member?.memberName ?? '—'}</Text>
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeBadgeText}>Active Member</Text>
            </View>
          </View>
          <View style={styles.summaryRight}>
            <MaterialCommunityIcons name="shield-check" size={52} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₱{contribution.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Monthly{'\n'}Contribution</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₱{memberShare.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Your Share{'\n'}(50%)</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{dependents.length}</Text>
            <Text style={styles.statLabel}>Registered{'\n'}Dependents</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getProfessionLabel(member?.professionID ?? '').split(' ')[0]}</Text>
            <Text style={styles.statLabel}>Member{'\n'}Type</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionLabel}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {[
            { icon: 'file-document-edit-outline', label: 'New\nMembership',  color: '#3aaa35', route: '/(tabs)/form' },
            { icon: 'heart-pulse',                label: 'Benefits',         color: '#e91e63', route: '/(tabs)/benefits' },
            { icon: 'account-edit-outline',       label: 'Update\nRecord',   color: '#1976d2', route: '/(tabs)/revalidation' },
            { icon: 'frequently-asked-questions', label: 'FAQs',             color: '#ff9800', route: '/(tabs)/faqs' },
            { icon: 'phone',                      label: 'Contact\nUs',      color: '#9c27b0', route: '/(tabs)/contactus' },
            { icon: 'magnify',                    label: 'Search',           color: '#00acc1', route: '/(tabs)/search' },
          ].map((item, i) => (
            <Pressable
              key={i}
              style={({ pressed, hovered }: any) => [styles.quickCard, (pressed || hovered) && styles.quickCardHover]}
              onPress={() => router.push(item.route as any)}>
              <View style={[styles.quickIcon, { backgroundColor: item.color + '18' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Announcements */}
        <Text style={styles.sectionLabel}>Latest Announcements</Text>
        {ANNOUNCEMENTS.map((a, i) => (
          <View key={i} style={styles.announcementCard}>
            <View style={styles.announcementTop}>
              <View style={[styles.tagBadge, { backgroundColor: a.tagColor + '18' }]}>
                <Text style={[styles.tagText, { color: a.tagColor }]}>{a.tag}</Text>
              </View>
              <Text style={styles.announcementDate}>{a.date}</Text>
            </View>
            <Text style={styles.announcementTitle}>{a.title}</Text>
            <Text style={styles.announcementBody}>{a.body}</Text>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Nav — gradient */}
      <LinearGradient
        colors={['#3aaa35', '#7dc142', '#c8e04a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bottomNav}>
        {[
          { icon: 'grid-outline',   label: 'Menu',    route: '/(tabs)/explore' },
          { icon: 'search-outline', label: 'Search',  route: '/(tabs)/search' },
          { icon: 'home',           label: 'Home',    route: null, active: true },
          { icon: 'person-outline', label: 'Profile', route: '/(tabs)/profile' },
          { icon: 'mail-outline',   label: 'Inbox',   route: '/(tabs)/inbox' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={item.route ? () => router.push(item.route as any) : undefined}>
            <Ionicons name={item.icon as any} size={22} color={(item as any).active ? '#FFC200' : 'rgba(255,255,255,0.8)'} />
            <Text style={[styles.navLabel, (item as any).active && styles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  topBarTitle: { fontSize: 16, fontWeight: '700', color: '#333' },

  summaryCard: { margin: 16, borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLeft: { flex: 1 },
  summaryGreeting: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  summaryName: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 2, marginBottom: 10 },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#a8ff78' },
  activeBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  summaryRight: { marginLeft: 8 },

  statsRow: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statCard: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 15, fontWeight: '800', color: '#3aaa35' },
  statLabel: { fontSize: 10, color: '#aaa', textAlign: 'center', marginTop: 3, lineHeight: 14 },
  statDivider: { width: 1, height: 36, backgroundColor: '#eee' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginHorizontal: 16, marginTop: 20, marginBottom: 10 },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  quickCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, width: '30%', alignItems: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  quickCardHover: { shadowColor: '#3aaa35', shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  quickIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 10, color: '#444', textAlign: 'center', fontWeight: '600', lineHeight: 14 },

  announcementCard: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  announcementTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tagText: { fontSize: 10, fontWeight: '700' },
  announcementDate: { fontSize: 11, color: '#aaa' },
  announcementTitle: { fontSize: 14, fontWeight: '700', color: '#222', marginBottom: 6 },
  announcementBody: { fontSize: 13, color: '#666', lineHeight: 20 },

  bottomNav: { flexDirection: 'row', paddingBottom: 20, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  navLabelActive: { color: '#FFC200', fontWeight: '600' },
});