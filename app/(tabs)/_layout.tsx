import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFC200',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#3aaa35',
          borderTopColor: '#2d8f2a',
        },
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
        }}
      />
      <Tabs.Screen
        name="form"
        options={{
          title: 'Form',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="revalidation"
        options={{
          title: 'Revalidation',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.clockwise.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}