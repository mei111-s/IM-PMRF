import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

export default function ContactUsScreen() {
  const router = useRouter();

  const contacts = [
    {
      icon: 'phone.fill',
      title: 'Main Hotline',
      value: '(02) 8662-2588',
      subtitle: 'Available 24/7 including weekends and holidays',
      action: () => Linking.openURL('tel:028662258'),
    },
    {
      icon: 'antenna.radiowaves.left.and.right',
      title: 'Smart Mobile',
      value: '0998-857-2957',
      subtitle: '0968-865-4670 • Available 24/7',
      action: () => Linking.openURL('tel:09988572957'),
    },
    {
      icon: 'antenna.radiowaves.left.and.right',
      title: 'Globe Mobile',
      value: '0917-127-5987',
      subtitle: '0917-110-9812 • Available 24/7',
      action: () => Linking.openURL('tel:09171275987'),
    },
    {
      icon: 'envelope.fill',
      title: 'Email',
      value: 'actioncenter@philhealth.gov.ph',
      subtitle: 'For inquiries and concerns',
      action: () => Linking.openURL('mailto:actioncenter@philhealth.gov.ph'),
    },
    {
      icon: 'globe',
      title: 'Website',
      value: 'www.philhealth.gov.ph',
      subtitle: 'Official PhilHealth website',
      action: () => Linking.openURL('https://www.philhealth.gov.ph'),
    },
    {
      icon: 'mappin.circle.fill',
      title: 'Head Office',
      value: 'Citystate Centre',
      subtitle: '709 Shaw Boulevard, Pasig City',
      action: () => Linking.openURL('https://maps.google.com/?q=Citystate+Centre+709+Shaw+Boulevard+Pasig+City'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONTACT US</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.heroBanner}>
        <IconSymbol size={40} name="headphones" color="#fff" />
        <Text style={styles.heroTitle}>We're here to help</Text>
        <Text style={styles.heroSubtitle}>Reach us anytime through any of the channels below</Text>
      </View>

      <Text style={styles.sectionLabel}>Contact Channels</Text>

      {contacts.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={item.action}>
          <View style={styles.iconBox}>
            <IconSymbol size={22} name={item.icon} color="#3aaa35" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.callbackBox}>
        <Text style={styles.callbackTitle}>📞 Request a Callback</Text>
        <Text style={styles.callbackText}>
          Text <Text style={styles.bold}>PHICallback [space] your mobile number [space] your concern</Text> to any of the mobile hotlines above.
        </Text>
        <Text style={styles.callbackNote}>Callback schedule: 8AM – 8PM, 7 days a week</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 11, color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardValue: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 2 },
  cardSubtitle: { fontSize: 12, color: '#888', marginTop: 2 },
  arrow: { fontSize: 22, color: '#ccc', marginLeft: 8 },
  callbackBox: {
    backgroundColor: '#fff8e1',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC200',
  },
  callbackTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  callbackText: { fontSize: 13, color: '#555', lineHeight: 20 },
  callbackNote: { fontSize: 12, color: '#888', marginTop: 8 },
  bold: { fontWeight: 'bold', color: '#333' },
});