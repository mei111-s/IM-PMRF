import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authStore } from '@/stores/auth-store';
import { MEMBERS, getDependentsByPin, getProfessionLabel } from '@/stores/member-data';

type ResultType = 'member' | 'service' | 'info';
type Result = { type: ResultType; title: string; subtitle: string; onPress: () => void; };

const SERVICES = [
  { title: 'New Membership Registration Form', subtitle: 'Register as a new PhilHealth member', route: '/(tabs)/form' },
  { title: 'Update Membership Record',         subtitle: 'Update your existing membership info', route: '/(tabs)/revalidation' },
  { title: 'View Membership Record',           subtitle: 'View your submitted membership form', route: '/(tabs)/revalidation' },
  { title: 'View or Print MDR',                subtitle: 'Download or print your Member Data Record', route: '/(tabs)/revalidation' },
  { title: 'Benefits',                         subtitle: 'View your PhilHealth benefit packages', route: '/(tabs)/benefits' },
  { title: 'FAQs',                             subtitle: 'Frequently asked questions about PhilHealth', route: '/(tabs)/faqs' },
  { title: 'Contact Us',                       subtitle: 'Get in touch with PhilHealth support', route: '/(tabs)/contactus' },
  { title: 'Member Portal',                    subtitle: 'Access your records, contributions and MDR', route: '/(tabs)/revalidation' },
  { title: 'Case Rates Search',                subtitle: 'Find PhilHealth benefit packages and case rates', route: '/(tabs)/benefits' },
  { title: 'Accredited Hospitals',             subtitle: 'Find PhilHealth-accredited health facilities', route: '/(tabs)/contactus' },
];

const QUICK_SEARCHES = [
  'Benefits', 'MDR', 'Membership', 'Dependents', 'Contact', 'FAQs', 'Case Rates', 'Hospitals',
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const pin = authStore.getPin();
  const member = MEMBERS[pin];
  const dependents = getDependentsByPin(pin);

  const results = useMemo<Result[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matched: Result[] = [];

    // Search services
    SERVICES.forEach(s => {
      if (s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)) {
        matched.push({ type: 'service', title: s.title, subtitle: s.subtitle, onPress: () => router.push(s.route as any) });
      }
    });

    // Search member fields
    if (member) {
      const fields: { label: string; value: string }[] = [
        { label: 'Member Name',       value: member.memberName },
        { label: 'PIN',               value: member.pin },
        { label: 'Email Address',     value: member.emailAddress },
        { label: 'Mobile Number',     value: member.mobileNum },
        { label: 'Permanent Address', value: member.permanentAddress },
        { label: 'Civil Status',      value: member.civilStatus },
        { label: 'Citizenship',       value: member.citizenship },
        { label: 'Member Type',       value: getProfessionLabel(member.professionID) },
        { label: 'Profession',        value: member.profession },
        { label: 'Place of Birth',    value: member.placeOfBirth },
        { label: 'KonSulTa Provider', value: member.konSulTaProvider },
      ];
      fields.forEach(f => {
        if (f.value && f.value.toLowerCase().includes(q) && f.value !== 'N/A') {
          matched.push({ type: 'member', title: f.label, subtitle: f.value, onPress: () => router.push('/(tabs)/profile' as any) });
        }
      });

      // Search dependents
      dependents.forEach(dep => {
        if (dep.dependentName.toLowerCase().includes(q) || dep.dependentRelationship.toLowerCase().includes(q)) {
          matched.push({ type: 'member', title: `Dependent: ${dep.dependentName}`, subtitle: `${dep.dependentRelationship} · ${dep.dependentDOB}`, onPress: () => router.push('/(tabs)/profile' as any) });
        }
      });
    }

    return matched;
  }, [query]);

  const iconForType = (type: ResultType) => {
    if (type === 'service') return 'grid-outline';
    if (type === 'member') return 'person-outline';
    return 'information-circle-outline';
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="chevron-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Search</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Search input */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#3aaa35" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services, your info..."
            placeholderTextColor="#bbb"
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* No query — show quick searches + all services */}
        {!query.trim() && (
          <>
            <Text style={styles.sectionLabel}>Quick Searches</Text>
            <View style={styles.quickRow}>
              {QUICK_SEARCHES.map((q, i) => (
                <TouchableOpacity key={i} style={styles.quickChip} onPress={() => setQuery(q)}>
                  <Text style={styles.quickChipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>All Services</Text>
            {SERVICES.map((s, i) => (
              <Pressable
                key={i}
                style={({ pressed, hovered }: any) => [styles.resultCard, (pressed || hovered) && styles.resultCardHover]}
                onPress={() => router.push(s.route as any)}>
                <View style={styles.resultIcon}>
                  <Ionicons name="grid-outline" size={18} color="#3aaa35" />
                </View>
                <View style={styles.resultText}>
                  <Text style={styles.resultTitle}>{s.title}</Text>
                  <Text style={styles.resultSubtitle}>{s.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#ccc" />
              </Pressable>
            ))}
          </>
        )}

        {/* Results */}
        {query.trim().length > 0 && results.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#ddd" />
            <Text style={styles.emptyTitle}>No results for "{query}"</Text>
            <Text style={styles.emptySubtitle}>Try searching for a service name, your address, or member type.</Text>
          </View>
        )}

        {results.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</Text>
            {results.map((r, i) => (
              <Pressable
                key={i}
                style={({ pressed, hovered }: any) => [styles.resultCard, (pressed || hovered) && styles.resultCardHover]}
                onPress={r.onPress}>
                <View style={[styles.resultIcon, r.type === 'member' && styles.resultIconMember]}>
                  <Ionicons name={iconForType(r.type) as any} size={18} color={r.type === 'member' ? '#1976d2' : '#3aaa35'} />
                </View>
                <View style={styles.resultText}>
                  <Text style={styles.resultTitle}>{r.title}</Text>
                  <Text style={styles.resultSubtitle}>{r.subtitle}</Text>
                </View>
                <View style={[styles.typeBadge, r.type === 'member' && styles.typeBadgeMember]}>
                  <Text style={[styles.typeBadgeText, r.type === 'member' && styles.typeBadgeTextMember]}>
                    {r.type === 'member' ? 'Your Info' : 'Service'}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav — compact rounded style */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {[
            { icon: 'grid-outline',   label: 'Menu',    route: '/(tabs)/explore' },
            { icon: 'search',         label: 'Search',  route: null, active: true },
            { icon: 'home-outline',   label: 'Home',    route: '/(tabs)/home' },
            { icon: 'person-outline', label: 'Profile', route: '/(tabs)/profile' },
            { icon: 'mail-outline',   label: 'Inbox',   route: '/(tabs)/inbox' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={[styles.navItem, (item as any).active && styles.navItemActive]} onPress={item.route ? () => router.push(item.route as any) : undefined}>
              <Ionicons name={item.icon as any} size={20} color={(item as any).active ? '#fff' : '#888'} />
              <Text style={[styles.navLabel, (item as any).active && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { flex: 1 },

  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  topBarTitle: { fontSize: 16, fontWeight: '700', color: '#333' },

  searchWrap: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1.5, borderColor: '#e0e0e0' },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginHorizontal: 16, marginTop: 20, marginBottom: 8 },

  quickRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  quickChip: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1.5, borderColor: '#e0e0e0' },
  quickChipText: { fontSize: 13, color: '#555', fontWeight: '500' },

  resultCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 8, borderRadius: 12, padding: 14, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  resultCardHover: { shadowColor: '#3aaa35', shadowOpacity: 0.15, shadowRadius: 8, elevation: 5, backgroundColor: '#f8fff8' },
  resultIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#e8f5e9', alignItems: 'center', justifyContent: 'center' },
  resultIconMember: { backgroundColor: '#e3f2fd' },
  resultText: { flex: 1 },
  resultTitle: { fontSize: 14, fontWeight: '600', color: '#222' },
  resultSubtitle: { fontSize: 12, color: '#888', marginTop: 2 },

  typeBadge: { backgroundColor: '#e8f5e9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  typeBadgeMember: { backgroundColor: '#e3f2fd' },
  typeBadgeText: { fontSize: 10, color: '#3aaa35', fontWeight: '700' },
  typeBadgeTextMember: { color: '#1976d2' },

  emptyState: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#ccc', marginTop: 16, textAlign: 'center' },
  emptySubtitle: { fontSize: 13, color: '#bbb', marginTop: 8, textAlign: 'center', lineHeight: 20 },

  // Bottom Nav — compact rounded style
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