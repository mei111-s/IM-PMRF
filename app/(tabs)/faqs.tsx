import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const faqs = [
  {
    q: 'Who can be a PhilHealth member?',
    a: 'All Filipino citizens are covered under the Universal Health Care Act (RA 11223). This includes employed workers, self-earning individuals, OFWs, indigents, and senior citizens.',
  },
  {
    q: 'How much is the PhilHealth contribution in 2026?',
    a: 'The premium rate is 5% of your Monthly Basic Salary, with a floor of ₱10,000 and ceiling of ₱100,000. Monthly contributions range from ₱500 to ₱5,000. For employed members, the cost is split equally — 2.5% each for employee and employer.',
  },
  {
    q: 'Who can be listed as a dependent?',
    a: 'Dependents include: legal spouse, unmarried children below 21 years old, parents who are 60 years old and above, and children with disabilities regardless of age.',
  },
  {
    q: 'What is the Konsulta (KonSulTa) package?',
    a: 'The Konsultasyong Sulit at Tama (KonSulTa) package provides free primary care consultations at accredited providers. It covers 75 essential medicines, 13 lab tests, and 6 cancer screening tests.',
  },
  {
    q: 'What is the No Balance Billing (NBB) policy?',
    a: 'Under NBB, no additional charges shall be billed to indigent and sponsored members when confined in government hospitals in ward accommodations. All hospital and professional fees are fully covered.',
  },
  {
    q: 'How do I know if a hospital is PhilHealth-accredited?',
    a: 'You can check the list of accredited hospitals on the PhilHealth website at philhealth.gov.ph or call the hotline at (02) 8662-2588.',
  },
  {
    q: 'What are Z-Benefits?',
    a: 'Z-Benefits cover catastrophic and expensive illnesses like cancer, kidney transplant, HIV treatment, and other serious conditions. Coverage can exceed ₱1,000,000. It requires pre-authorization from PhilHealth.',
  },
  {
    q: 'How do I update my membership information?',
    a: 'You can update your information through the Revalidation feature in this app, visit any PhilHealth office, or log in to the PhilHealth member portal at philhealth.gov.ph.',
  },
  {
    q: 'What is the PhilHealth PIN?',
    a: 'The PhilHealth Identification Number (PIN) is your unique membership number. It is sent to your registered email address upon registration and is used to access your membership records.',
  },
  {
    q: 'How do I file a PhilHealth claim?',
    a: 'For inpatient claims, your hospital will file the claim directly on your behalf. For outpatient claims, present your PhilHealth ID or PIN to the accredited provider. You may also file manually at any PhilHealth office.',
  },
];

export default function FAQsScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.heroBanner}>
        <Text style={styles.heroEmoji}>❓</Text>
        <Text style={styles.heroTitle}>Frequently Asked Questions</Text>
        <Text style={styles.heroSubtitle}>Everything you need to know about PhilHealth</Text>
      </View>

      <Text style={styles.sectionLabel}>Tap a question to see the answer</Text>

      {faqs.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => setExpanded(expanded === index ? null : index)}>
          <View style={styles.cardHeader}>
            <View style={styles.numberBox}>
              <Text style={styles.number}>{index + 1}</Text>
            </View>
            <Text style={styles.question}>{faq.q}</Text>
            <Text style={styles.expandIcon}>{expanded === index ? '▲' : '▼'}</Text>
          </View>
          {expanded === index && (
            <View style={styles.answerBox}>
              <Text style={styles.answer}>{faq.a}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.moreBox}>
        <Text style={styles.moreTitle}>Still have questions?</Text>
        <Text style={styles.moreText}>Contact us at actioncenter@philhealth.gov.ph or call (02) 8662-2588 available 24/7.</Text>
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
  heroEmoji: { fontSize: 40 },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  heroSubtitle: { fontSize: 13, color: '#c8f0c8', textAlign: 'center' },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginHorizontal: 16,
    marginTop: 20,
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  numberBox: {
    width: 28,
    height: 28,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { fontSize: 12, fontWeight: 'bold', color: '#3aaa35' },
  question: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333', lineHeight: 20 },
  expandIcon: { fontSize: 12, color: '#aaa' },
  answerBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answer: { fontSize: 13, color: '#555', lineHeight: 22 },
  moreBox: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3aaa35',
    elevation: 2,
  },
  moreTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  moreText: { fontSize: 13, color: '#555', lineHeight: 20 },
});