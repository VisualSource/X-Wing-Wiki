import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}>
      <Tabs.Screen
        name="rules-search"
        options={{
          title: 'Rules',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "search" : "search-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loadout-search"
        options={{
          title: 'Loadouts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "book" : "book-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
