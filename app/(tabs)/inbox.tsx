import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { authStore } from '@/stores/auth-store';
import { MEMBERS } from '@/stores/member-data';

type MessageCategory = 'all' | 'unread' | 'system' | 'reminders';

const MESSAGES = [
  {
    id: 1,
    from: 'PhilHealth System',
    subject: 'Membership Registration Confirmed',
    body: 'Your PhilHealth membership registration has been successfully submitted and is now under review. Your PIN is your unique identifier for all transactions.',
    date: 'Jun 1, 2026',
    time: '10:32 AM',
    read: true,
    category: 'system',
    icon: 'checkmark-circle',
    iconColor: '#3aaa35',
  },
  {
    id: 2,
    from: 'PhilHealth Reminders',
    subject: 'Contribution Due This Month',
    body: 'This is a reminder that your PhilHealth premium contribution is due this month. Please ensure timely payment to maintain your membership benefits.',
    date: 'May 30, 2026',
    time: '8:00 AM',
    read: false,
    category: 'reminders',
    icon: 'alert-circle',
    iconColor: '#ff9800',
  },
  {
    id: 3,
    from: 'PhilHealth Advisory',
    subject: '2026 Premium Rate Advisory',
    body: 'The premium contribution rate for 2026 remains at 5% of Monthly Basic Salary. The minimum monthly contribution is ₱500 and the maximum is ₱5,000.',
    date: 'May 28, 2026',
    time: '9:15 AM',
    read: false,
    category: 'system',
    icon: 'information-circle',
    iconColor: '#1976d2',
  },
  {
    id: 4,
    from: 'PhilHealth Benefits',
    subject: 'Konsulta Package Now Available',
    body: 'You are now eligible to avail of the Konsultasyong Sulit at Tama (KonSulTa) package. Visit any accredited KonSulTa provider for free primary care consultations.',
    date: 'May 15, 2026',
    time: '2:00 PM',
    read: true,
    category: 'system',
    icon: 'medkit',
    iconColor: '#e91e63',
  },
  {
    id: 5,
    from: 'PhilHealth Reminders',
    subject: 'Update Your Member Information',
    body: 'Please make sure your membership information is up to date. Outdated information may cause delays in benefit claims. Log in to update your details.',
    date: 'May 10, 2026',
    time: '11:00 AM',
    read: true,
    category: 'reminders',
    icon: 'create',
    iconColor: '#9c27b0',
  },
  {
    id: 6,
    from: 'PhilHealth Advisory',
    subject: 'No Balance Billing Policy',
    body: 'Reminder: Under the No Balance Billing policy, indigent and sponsored members confined in government hospital wards shall not be charged additional fees.',
    date: 'April 30, 2026',
    time: '3:45 PM',
    read: true,
    category: 'system',
    icon: 'shield-checkmark',
    iconColor: '#00acc1',
  },
];

export default function InboxScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const member = MEMBERS[pin];
  const [activeTab, setActiveTab] = useState<MessageCategory>('all');
  const [readIds, setReadIds] = useState<Set<number>>(new Set(MESSAGES.filter(m => m.read).map(m => m.id)));
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = MESSAGES.filter(m => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !readIds.has(m.id);
    return m.category === activeTab;
  });

  const unreadCount = MESSAGES.filter(m => !readIds.has(m.id)).length;

  const openMessage = (id: number) => {
    setReadIds(prev => new Set([...prev, id]));
    setSelectedId(id);
  };

  const selectedMessage = MESSAGES.find(m => m.id === selectedId);

  // ── Message detail view ──
  if (selectedMessage) {
    return (
      <View style={styles.root}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setSelectedId(null)}>
            <Ionicons name="chevron-back" size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Message</Text>
          <View style={{ width: 22 }} />
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.messageDetail}>
            <View style={[styles.detailIconCircle, { backgroundColor: selectedMessage.iconColor + '18' }]}>
              <Ionicons name={selectedMessage.icon as any} size={28} color={selectedMessage.iconColor} />
            </View>
            <Text style={styles.detailSubject}>{selectedMessage.subject}</Text>
            <Text style={styles.detailFrom}>From: {selectedMessage.from}</Text>
            <Text style={styles.detailDate}>{selectedMessage.date} · {selectedMessage.time}</Text>
            <View style={styles.detailDivider} />
            <Text style={styles.detailBody}>{selectedMessage.body}</Text>
          </View>
        </ScrollView>
        <View style={styles.bottomNav}>
          {getNavItems(router).map((item, i) => (
            <TouchableOpacity key={i} style={styles.navItem} onPress={item.route ? () => router.push(item.route as any) : undefined}>
              <Ionicons name={item.icon as any} size={22} color={(item as any).active ? '#3aaa35' : '#aaa'} />
              <Text style={[styles.navLabel, (item as any).active && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </TouchableOpacity>
        <View style={styles.topBarCenter}>
          <Text style={styles.topBarTitle}>Inbox</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => setReadIds(new Set(MESSAGES.map(m => m.id)))}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Member context */}
      <View style={styles.memberBanner}>
        <Ionicons name="mail" size={16} color="#3aaa35" />
        <Text style={styles.memberBannerText}>Messages for {member?.memberName ?? pin}</Text>
      </View>

      {/* Category tabs */}
      <View style={styles.tabRow}>
        {([
          { key: 'all',       label: 'All' },
          { key: 'unread',    label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}` },
          { key: 'system',    label: 'System' },
          { key: 'reminders', label: 'Reminders' },
        ] as { key: MessageCategory; label: string }[]).map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}>
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="mail-open-outline" size={48} color="#ddd" />
            <Text style={styles.emptyTitle}>No messages</Text>
            <Text style={styles.emptySubtitle}>You're all caught up!</Text>
          </View>
        )}

        {filtered.map(msg => {
          const isRead = readIds.has(msg.id);
          return (
            <TouchableOpacity
              key={msg.id}
              style={[styles.messageCard, !isRead && styles.messageCardUnread]}
              onPress={() => openMessage(msg.id)}>
              <View style={[styles.msgIcon, { backgroundColor: msg.iconColor + '18' }]}>
                <Ionicons name={msg.icon as any} size={20} color={msg.iconColor} />
              </View>
              <View style={styles.msgContent}>
                <View style={styles.msgTopRow}>
                  <Text style={[styles.msgFrom, !isRead && styles.msgFromUnread]}>{msg.from}</Text>
                  <Text style={styles.msgDate}>{msg.date}</Text>
                </View>
                <Text style={[styles.msgSubject, !isRead && styles.msgSubjectUnread]} numberOfLines={1}>
                  {msg.subject}
                </Text>
                <Text style={styles.msgPreview} numberOfLines={1}>{msg.body}</Text>
              </View>
              {!isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        {getNavItems(router).map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={item.route ? () => router.push(item.route as any) : undefined}>
            <Ionicons name={item.icon as any} size={22} color={(item as any).active ? '#3aaa35' : '#aaa'} />
            <Text style={[styles.navLabel, (item as any).active && styles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function getNavItems(router: any) {
  return [
    { icon: 'grid-outline',   label: 'Menu',    route: '/(tabs)/explore' },
    { icon: 'search-outline', label: 'Search',  route: '/(tabs)/search' },
    { icon: 'home-outline',   label: 'Home',    route: '/(tabs)/home' },
    { icon: 'person-outline', label: 'Profile', route: '/(tabs)/profile' },
    { icon: 'mail',           label: 'Inbox',   route: null, active: true },
  ];
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { flex: 1 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  topBarCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  topBarTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  markAllText: { fontSize: 12, color: '#3aaa35', fontWeight: '600' },
  unreadBadge: { backgroundColor: '#e53935', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  unreadBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },

  memberBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f0f7f0', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e8f5e9' },
  memberBannerText: { fontSize: 12, color: '#3aaa35', fontWeight: '500' },

  tabRow: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#3aaa35' },
  tabText: { fontSize: 11, color: '#aaa', fontWeight: '600' },
  tabTextActive: { color: '#3aaa35' },

  messageCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 8, borderRadius: 12, padding: 14, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  messageCardUnread: { borderLeftWidth: 3, borderLeftColor: '#3aaa35', backgroundColor: '#f8fff8' },
  msgIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  msgContent: { flex: 1 },
  msgTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  msgFrom: { fontSize: 12, color: '#888', fontWeight: '500' },
  msgFromUnread: { color: '#3aaa35', fontWeight: '700' },
  msgDate: { fontSize: 10, color: '#bbb' },
  msgSubject: { fontSize: 14, color: '#555', fontWeight: '500', marginBottom: 2 },
  msgSubjectUnread: { color: '#222', fontWeight: '700' },
  msgPreview: { fontSize: 12, color: '#aaa' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3aaa35', flexShrink: 0 },

  messageDetail: { padding: 20 },
  detailIconCircle: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 16 },
  detailSubject: { fontSize: 20, fontWeight: '800', color: '#111', textAlign: 'center', marginBottom: 6 },
  detailFrom: { fontSize: 13, color: '#888', textAlign: 'center' },
  detailDate: { fontSize: 12, color: '#bbb', textAlign: 'center', marginTop: 2, marginBottom: 16 },
  detailDivider: { height: 1, backgroundColor: '#eee', marginBottom: 16 },
  detailBody: { fontSize: 15, color: '#444', lineHeight: 24 },

  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#ccc', marginTop: 12 },
  emptySubtitle: { fontSize: 13, color: '#bbb', marginTop: 4 },

  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingBottom: 20, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10, color: '#aaa' },
  navLabelActive: { color: '#3aaa35', fontWeight: '600' },
});