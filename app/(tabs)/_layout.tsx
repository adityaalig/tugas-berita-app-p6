import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#089182',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarStyle: { 
        height: 75,           // ⬆️ Tinggikan bar-nya (dari 65 ke 75 atau 80)
        paddingBottom: 80,    // ⬆️ Ini yang ngangkat ikon ke atas menjauhi bezel bawah HP
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