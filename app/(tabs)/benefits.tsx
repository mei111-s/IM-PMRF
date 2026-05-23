import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const benefits = [
  {
    icon: 'building.2.fill',
    title: 'Inpatient Benefits',
    color: '#3aaa35',
    items: [
      'Case rates increased by 50% as of January 2025',
      'Covers room, medicines, laboratory, and professional fees',
      'Must be admitted to a PhilHealth-accredited hospital',
      'Dengue Fever, Pneumonia, and other common illnesses covered',
      'No Balance Billing policy for indigent members',
    ],
  },
  {
    icon: 'cross.case.fill',
    title: 'Konsulta Package (YAKAP)',
    color: '#2196F3',
    items: [
      'Free primary care consultations at accredited KonSulTa providers',
      'Covers 75 essential medicines',
      'Includes 13 laboratory tests',
      '6 cancer screening tests included',
      'Available to all PhilHealth members and dependents',
    ],
  },
  {
    icon: 'heart.fill',
    title: 'Maternity Benefits',
    color: '#E91E63',
    items: [
      'Normal Spontaneous Delivery (NSD) covered',
      'Cesarean Section (CS) delivery covered',
      'Coverage up to ₱37,050 for maternity packages',
      'Newborn care packages included',
      'Pre-natal and post-natal care covered',
    ],
  },
  {
    icon: 'staroflife.fill',
    title: 'Z-Benefits',
    color: '#9C27B0',
    items: [
      'Coverage for catastrophic illnesses like cancer and kidney disease',
      'Coverage can exceed ₱1,000,000',
      'Requires pre-authorization from PhilHealth',
      'Kidney transplant and dialysis covered',
      'HIV treatment covered',
    ],
  },
  {
    icon: 'drop.fill',
    title: 'Dialysis Coverage',
    color: '#FF5722',
    items: [
      'Up to 156 dialysis sessions per year',
      'Both hemodialysis and peritoneal dialysis covered',
      'Available at accredited dialysis centers',
    ],
  },
  {
    icon: 'mouth.fill',
    title: 'Dental Benefits',
    color: '#795548',
    items: [
      'Up to ₱1,000 per year for dental services',
      'Tooth extraction, oral prophylaxis covered',
      'Available at accredited dental clinics',
    ],
  },
];

export default function BenefitsScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BENEFITS</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.heroBanner}>
        <IconSymbol size={40} name="heart.text.square.fill" color="#fff" />
        <Text style={styles.heroTitle}>Your Health Coverage</Text>
        <Text style={styles.heroSubtitle}>5% of monthly salary • ₱500 – ₱5,000/month</Text>
      </View>

      <View style={styles.contributionCard}>
        <Text style={styles.contributionTitle}>2026 Contribution Rate</Text>
        <View style={styles.contributionRow}>
          <View style={styles.contributionItem}>
            <Text style={styles.contributionValue}>5%</Text>
            <Text style={styles.contributionLabel}>Premium Rate</Text>
          </View>
          <View style={styles.contributionDivider} />
          <View style={styles.contributionItem}>
            <Text style={styles.contributionValue}>₱500</Text>
            <Text style={styles.contributionLabel}>Minimum/month</Text>
          </View>
          <View style={styles.contributionDivider} />
          <View style={styles.contributionItem}>
            <Text style={styles.contributionValue}>₱5,000</Text>
            <Text style={styles.contributionLabel}>Maximum/month</Text>
          </View>
        </View>
        <Text style={styles.contributionNote}>For employed members, cost is split equally between employee and employer (2.5% each)</Text>
      </View>

      <Text style={styles.sectionLabel}>Benefit Packages</Text>

      {benefits.map((benefit, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => setExpanded(expanded === index ? null : index)}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: benefit.color + '20' }]}>
              <IconSymbol size={22} name={benefit.icon} color={benefit.color} />
            </View>
            <Text style={styles.cardTitle}>{benefit.title}</Text>
            <Text style={styles.expandIcon}>{expanded === index ? '▲' : '▼'}</Text>
          </View>
          {expanded === index && (
            <View style={styles.itemList}>
              {benefit.items.map((item, i) => (
                <View key={i} style={styles.itemRow}>
                  <Text style={[styles.bullet, { color: benefit.color }]}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>💡 Tap each benefit to expand details. Benefits are subject to change. Always verify at philhealth.gov.ph.</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f7f0' },
  header: {
    backgroundColor: '#3aaa35',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backBtn: { color: '#fff', fontSize: 14, fontWeight: '600', width: 50 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  heroBanner: {
    backgroundColor: '#2d8f2a',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  heroSubtitle: { fontSize: 13, color: '#c8f0c8' },
  contributionCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  contributionTitle: { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 12, textAlign: 'center' },
  contributionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  contributionItem: { alignItems: 'center' },
  contributionValue: { fontSize: 20, fontWeight: 'bold', color: '#3aaa35' },
  contributionLabel: { fontSize: 11, color: '#888', marginTop: 2, textAlign: 'center' },
  contributionDivider: { width: 1, height: 40, backgroundColor: '#eee' },
  contributionNote: { fontSize: 12, color: '#888', marginTop: 12, textAlign: 'center', lineHeight: 18 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333' },
  expandIcon: { fontSize: 12, color: '#aaa' },
  itemList: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  itemRow: { flexDirection: 'row', marginBottom: 8, gap: 8 },
  bullet: { fontSize: 16, lineHeight: 20 },
  itemText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },
  noteBox: {
    backgroundColor: '#e8f5e9',
    margin: 16,
    borderRadius: 12,
    padding: 14,
  },
  noteText: { fontSize: 12, color: '#555', lineHeight: 18 },
});