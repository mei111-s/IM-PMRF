import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import { authStore } from '@/stores/auth-store';
import { fetchMember } from '@/stores/api';

// ── Image Carousel Component ──────────────────────────────────
const BANNER_IMAGES = [
  require('@/assets/images/slide_1.png'),
  require('@/assets/images/slide_2.png'),
  require('@/assets/images/slide_3.png'),
  require('@/assets/images/slide_4.png'),
  require('@/assets/images/slide_5.png'),
  require('@/assets/images/slide_6.png'),
  require('@/assets/images/slide_7.png'),
  require('@/assets/images/slide_8.png'),
  require('@/assets/images/slide_9.png'),
  require('@/assets/images/slide_10.png'),
];

function ImageCarousel() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemWidth = width - 32;

  const goToPrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : BANNER_IMAGES.length - 1;
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({ x: newIndex * itemWidth, animated: true });
  };

  const goToNext = () => {
    const newIndex = currentIndex < BANNER_IMAGES.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({ x: newIndex * itemWidth, animated: true });
  };

  const onMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    setCurrentIndex(Math.min(Math.max(index, 0), BANNER_IMAGES.length - 1));
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={itemWidth}
        snapToAlignment="center">
        {BANNER_IMAGES.map((img, i) => (
          <Image key={i} source={img} style={[styles.carouselSlide, { width: itemWidth }]} />
        ))}
      </ScrollView>

      <View style={styles.carouselArrows} pointerEvents="box-none">
        <TouchableOpacity style={styles.arrowBtn} onPress={goToPrev}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn} onPress={goToNext}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dotsRow}>
        {BANNER_IMAGES.map((_, i) => (
          <View key={i} style={i === currentIndex ? styles.dotActive : styles.dot} />
        ))}
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch member from API
  useEffect(() => {
    if (pin) {
      fetchMember(pin).then(data => {
        if (!data.error) setMember(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [pin]);

  const getProfessionLabel = (profID: string) => {
    const map: Record<string, string> = {
      'P001': 'Employed Private',
      'P002': 'Employed Government',
      'P003': 'Self-Earning Individual',
      'P004': 'Sole Proprietor',
      'P005': 'Professional Practitioner',
    };
    return map[profID] || profID || '—';
  };

  const firstName = member?.MemberName?.split(' ')[0] ?? '';
  const lastName = member?.MemberName?.split(' ').slice(1).join(' ') ?? '';
  const professionLabel = member ? getProfessionLabel(member.ProfessionID) : '';

  const membershipActions = [
    { icon: 'file-document-edit-outline', label: 'New Membership\nRegistration Form', onPress: () => router.push('/(tabs)/form') },
    { icon: 'heart-pulse',                label: 'Benefits',             onPress: () => router.push('/(tabs)/benefits' as any) },
    { icon: 'credit-card-outline',        label: 'Contributions',        onPress: () => {} },
    { icon: 'card-account-details-outline', label: 'Member\nPortal',     onPress: () => router.push('/(tabs)/revalidation' as any) },
    { icon: 'stethoscope',                label: 'Case Rates\nSearch',   onPress: () => {} },
    { icon: 'hospital-marker',            label: 'Accredited\nHospitals',onPress: () => {} },
    { icon: 'frequently-asked-questions', label: 'FAQs',                 onPress: () => router.push('/(tabs)/faqs' as any) },
  ];

  const initials = member?.MemberName?.split(' ').map((w: string) => w[0]).slice(0, 2).join('') ?? '?';

  if (loading) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3aaa35" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Slide-out Menu Drawer */}
      <Modal visible={menuOpen} animationType="none" transparent onRequestClose={() => setMenuOpen(false)}>
        <TouchableOpacity style={styles.drawerOverlay} activeOpacity={1} onPress={() => setMenuOpen(false)}>
          <View style={styles.drawer}>
            <LinearGradient
              colors={['#3aaa35', '#7dc142', '#c8e04a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>{initials}</Text>
              </View>
              <View style={styles.drawerUserInfo}>
                <Text style={styles.drawerUserName}>{member?.MemberName ?? '—'}</Text>
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
              { icon: 'help-circle-outline',   label: 'PhilHealth Webpage', route: null },
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
        {/* Header + Welcome merged into gradient */}
        <LinearGradient
          colors={['#2d8f2a', '#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.welcomeSection}>
          <View style={styles.headerInner}>
            <TouchableOpacity onPress={() => setMenuOpen(true)}>
              <Ionicons name="menu" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitleWhite}>PhilHealth</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/inbox' as any)}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeGreeting}>Mabuhay {firstName}{'\n'}{lastName}!</Text>
          <Text style={styles.welcomeSub}>Welcome to your PhilHealth Dashboard!</Text>
          <Text style={styles.locationText}>
            📍 {member?.PermanentAddress ?? ''}
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
            <Text style={styles.memberStripValue}>{member?.Purpose ?? '—'}</Text>
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

        {/* Hero Banner Carousel */}
        <ImageCarousel />

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
              <Text style={styles.activityName}>{member?.MemberName}</Text>
              <Text style={styles.activityPurpose}>{member?.Purpose}</Text>
            </View>
            <View style={[styles.purposeBadge, member?.Purpose === 'Updating/Amendment' && styles.purposeBadgeAmend]}>
              <Text style={styles.purposeBadgeText}>{member?.Purpose === 'Updating/Amendment' ? 'Update' : 'Registration'}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {[
            { icon: 'grid',    label: 'Menu',    active: false, route: null, action: () => setMenuOpen(true) },
            { icon: 'search',  label: 'Search',  active: false, route: '/(tabs)/search' },
            { icon: 'home',    label: 'Home',    active: true,  route: null },
            { icon: 'person',  label: 'Profile', active: false, route: '/(tabs)/profile' },
            { icon: 'mail',    label: 'Inbox',   active: false, route: '/(tabs)/inbox' },
          ].map((item, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.navItem, item.active && styles.navItemActive]} 
              onPress={item.action ? item.action : item.route ? () => router.push(item.route as any) : undefined}>
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

  // Drawer
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' },
  drawer: { 
    width: 280, 
    backgroundColor: '#fff', 
    marginTop: 50,
    marginLeft: 12,
    marginBottom: 20,
    borderRadius: 20,
    paddingTop: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  drawerHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 18, 
    paddingVertical: 18, 
    gap: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerAvatar: { 
    width: 46, 
    height: 46, 
    borderRadius: 23, 
    backgroundColor: 'rgba(255,255,255,0.25)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 2, 
    borderColor: 'rgba(255,255,255,0.5)' 
  },
  drawerAvatarText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  drawerUserInfo: { flex: 1 },
  drawerUserName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  drawerUserPin: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 1 },
  drawerDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  drawerItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    paddingHorizontal: 18, 
    paddingVertical: 13,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  drawerItemText: { fontSize: 14, color: '#333', fontWeight: '500' },
  drawerBottom: { 
    marginTop: 'auto', 
    padding: 14, 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0' 
  },
  drawerViewMDR: { 
    borderRadius: 12, 
    paddingVertical: 13, 
    alignItems: 'center',
    backgroundColor: '#3aaa35',
  },
  drawerViewMDRText: { fontSize: 13, color: '#fff', fontWeight: '700' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 52, paddingBottom: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333', letterSpacing: 0.5 },
  headerInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 52, paddingBottom: 12 },
  headerTitleWhite: { fontSize: 16, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  welcomeSection: { paddingHorizontal: 20, paddingBottom: 20 },
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

  // Carousel styles
  carouselContainer: { marginHorizontal: 16, marginTop: 16, borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  carouselSlide: { width: '100%', height: 180, resizeMode: 'cover' },
  carouselArrows: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8 },
  arrowBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(58,170,53,0.9)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  arrowText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingVertical: 10, backgroundColor: '#fff' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd' },
  dotActive: { width: 20, height: 8, borderRadius: 4, backgroundColor: '#3aaa35' },

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

  // Bottom Nav
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