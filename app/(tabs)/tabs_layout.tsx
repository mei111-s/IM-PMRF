import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFC200',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { display: 'none' }, // hidden by default; each screen manages its own nav
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="lock.fill" color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          title: 'Form',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="revalidation"
        options={{
          title: 'Revalidation',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.clockwise.circle.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="contactus"
        options={{
          title: 'Contact Us',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="phone.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: 'Benefits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
      <Tabs.Screen
        name="faqs"
        options={{
          title: 'FAQs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="questionmark.circle.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />
    </Tabs>
  );
}