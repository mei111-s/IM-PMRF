import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { authStore } from '@/stores/auth-store';
import { MEMBERS, getDependentsByPin, getProfessionLabel } from '@/stores/member-data';

export default function ProfileScreen() {
  const router = useRouter();
  const pin = authStore.getPin();
  const member = MEMBERS[pin];
  const dependents = getDependentsByPin(pin);
  const [activeTab, setActiveTab] = useState<'personal' | 'settings'>('personal');

  const dobFormatted = member?.dateOfBirth
    ? new Date(member.dateOfBirth).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  return (
    <View style={styles.root}>
      {/* Header bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/inbox' as any)}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Green → Yellow gradient banner matching Figma */}
        <LinearGradient
          colors={['#2d8f2a', '#3aaa35', '#7dc142', '#c8e04a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={40} color="rgba(255,255,255,0.7)" />
            </View>
          </View>
          <Text style={styles.bannerName}>{member?.memberName ?? '—'}</Text>
          <View style={styles.bannerEmailRow}>
            <Text style={styles.bannerEmail}>{member?.emailAddress ?? '—'}</Text>
            <Ionicons name="pencil-outline" size={13} color="rgba(255,255,255,0.8)" style={{ marginLeft: 4 }} />
          </View>
          <View style={styles.bannerMetaRow}>
            <Text style={styles.bannerMetaText}>PhilHealth Member</Text>
            <Text style={styles.bannerMetaDot}>  ·  </Text>
            <Text style={styles.bannerMetaText}>{member?.permanentAddress ?? '—'}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'personal' && styles.tabActive]}
            onPress={() => setActiveTab('personal')}>
            <Text style={[styles.tabText, activeTab === 'personal' && styles.tabTextActive]}>
              Personal Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'settings' && styles.tabActive]}
            onPress={() => setActiveTab('settings')}>
            <Text style={[styles.tabText, activeTab === 'settings' && styles.tabTextActive]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info */}
        {activeTab === 'personal' && (
          <View style={styles.infoSection}>
            <InfoRow label="PhilHealth PIN" value={pin} />
            <InfoRow label="Date of Birth" value={dobFormatted} />
            <InfoRow label="Place of Birth" value={member?.placeOfBirth} />
            <InfoRow label="Sex" value={member?.sex} />
            <InfoRow label="Civil Status" value={member?.civilStatus} />
            <InfoRow label="Citizenship" value={member?.citizenship} />
            <InfoRow label="Phone Number" value={member?.mobileNum ? `0${member.mobileNum}` : '—'} />
            <InfoRow label="Home Phone" value={member?.homePhoneNum} />
            <InfoRow label="Current Address" value={member?.permanentAddress} />
            <InfoRow label="Mailing Address" value={member?.mailingAddress} />
            <InfoRow label="Email Address" value={member?.emailAddress} />
            <InfoRow label="Philsys ID Number" value={member?.philSysIDNum} />
            <InfoRow label="TIN" value={member?.tin} />
            <InfoRow label="Member Type" value={getProfessionLabel(member?.professionID ?? '')} />
            <InfoRow label="Monthly Income" value={member?.monthlyIncome ? `₱${parseFloat(member.monthlyIncome).toLocaleString()}` : '—'} />
            <InfoRow label="Profession" value={member?.profession && member.profession !== 'N/A' ? member.profession : '—'} />
            <InfoRow label="Proof of Income" value={member?.proofOfIncome} />

            {dependents.length > 0 && (
              <>
                <Text style={styles.depHeading}>Dependents</Text>
                {dependents.map((dep, i) => (
                  <View key={i} style={styles.depCard}>
                    <Text style={styles.depName}>{dep.dependentName}</Text>
                    <Text style={styles.depDetail}>{dep.dependentRelationship} · Born {dep.dependentDOB}</Text>
                    <Text style={styles.depDetail}>Citizenship: {dep.dependentCitizenship}</Text>
                    {dep.dependentPermanentDisability === 'Yes' && (
                      <View style={styles.disabilityBadge}>
                        <Text style={styles.disabilityText}>With Permanent Disability</Text>
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <View style={styles.infoSection}>
            {[
              { icon: 'lock-closed-outline',      label: 'Change Password' },
              { icon: 'shield-checkmark-outline',  label: 'Privacy & Security' },
              { icon: 'notifications-outline',     label: 'Notification preferences' },
              { icon: 'help-circle-outline',       label: 'Help & Support' },
              { icon: 'language-outline',          label: 'Language' },
              { icon: 'log-out-outline',           label: 'Logout', danger: true },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.settingsRow}
                onPress={item.label === 'Logout' ? () => router.push('/(tabs)' as any) : undefined}>
                <View style={[styles.settingsIcon, (item as any).danger && styles.settingsIconDanger]}>
                  <Ionicons name={item.icon as any} size={18} color={(item as any).danger ? '#e53935' : '#555'} />
                </View>
                <Text style={[styles.settingsLabel, (item as any).danger && styles.settingsLabelDanger]}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Nav — compact rounded style */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {[
            { icon: 'grid-outline',   label: 'Menu',    route: '/(tabs)/explore' },
            { icon: 'search-outline', label: 'Search',  route: '/(tabs)/search' },
            { icon: 'home-outline',   label: 'Home',    route: '/(tabs)/home' },
            { icon: 'person',         label: 'Profile', route: null, active: true },
            { icon: 'mail-outline',   label: 'Inbox',   route: '/(tabs)/inbox' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.navItem, (item as any).active && styles.navItemActive]}
              onPress={item.route ? () => router.push(item.route as any) : undefined}>
              <Ionicons name={item.icon as any} size={20} color={(item as any).active ? '#fff' : '#888'} />
              <Text style={[styles.navLabel, (item as any).active && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { flex: 1 },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  topBarTitle: { fontSize: 16, fontWeight: '700', color: '#333' },

  banner: {
    paddingTop: 28, paddingBottom: 28, paddingHorizontal: 20,
    alignItems: 'center', gap: 6,
  },
  avatarOuter: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  bannerName: { fontSize: 24, fontWeight: '800', color: '#fff' },
  bannerEmailRow: { flexDirection: 'row', alignItems: 'center' },
  bannerEmail: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  bannerMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, flexWrap: 'wrap', justifyContent: 'center' },
  bannerMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  bannerMetaDot: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  editProfileBtn: {
    marginTop: 12, paddingHorizontal: 28, paddingVertical: 9,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
  },
  editProfileText: { fontSize: 13, color: '#fff', fontWeight: '600' },

  tabRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  tab: {
    flex: 1, paddingVertical: 14, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#3aaa35' },
  tabText: { fontSize: 14, color: '#aaa', fontWeight: '600' },
  tabTextActive: { color: '#3aaa35' },

  infoSection: { paddingHorizontal: 16, paddingTop: 8 },
  infoRow: {
    backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 14,
    marginTop: 8,
  },
  infoLabel: { fontSize: 11, color: '#aaa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  infoValue: { fontSize: 15, color: '#222', fontWeight: '500' },

  depHeading: { fontSize: 13, fontWeight: '800', color: '#333', marginTop: 20, marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' },
  depCard: {
    backgroundColor: '#fff', borderRadius: 10,
    padding: 14, marginTop: 8,
    borderLeftWidth: 3, borderLeftColor: '#3aaa35',
  },
  depName: { fontSize: 15, fontWeight: '700', color: '#222' },
  depDetail: { fontSize: 12, color: '#777', marginTop: 2 },
  disabilityBadge: {
    marginTop: 6, alignSelf: 'flex-start',
    backgroundColor: '#fff3e0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
  },
  disabilityText: { fontSize: 11, color: '#e65100', fontWeight: '600' },

  settingsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 14, marginTop: 8,
  },
  settingsIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center',
  },
  settingsIconDanger: { backgroundColor: '#fff0f0' },
  settingsLabel: { flex: 1, fontSize: 14, color: '#333', fontWeight: '500' },
  settingsLabelDanger: { color: '#e53935' },

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