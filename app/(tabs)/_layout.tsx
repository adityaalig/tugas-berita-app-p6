import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#089182',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarStyle: { 
        height: 75,           
        paddingBottom: 80,    
        paddingTop: 10 
      }
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Berita',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{
          title: 'Cari',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="bookmarks" 
        options={{
          title: 'Tersimpan',
          tabBarIcon: ({ color }) => <Ionicons name="bookmark" size={24} color={color} />,
        }} 
      />
    </Tabs>
  );
}