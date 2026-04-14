import React, { useState, useMemo } from 'react';
import { 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl, 
  View, 
  Text,
  TouchableOpacity,
  Platform,
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { NewsCard } from '../../components/NewsCard';
import { useNews } from '../../hooks/useNews';
import { useApp } from '../../context/AppContext'; 

export default function HomeScreen() {
  const [category, setCategory] = useState('general');
  const router = useRouter();
  
  const { isDarkMode } = useApp();

  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useNews(category as any);
  const articles = useMemo(() => data?.pages.flatMap(p => p.articles) ?? [], [data]);

  if (isLoading && !isFetchingNextPage) {
    return (
      <View style={[styles.center, { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }]}>
        <ActivityIndicator size="large" color="#089182" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }]}>
        <Text style={styles.errorText}>Waduh, gagal ambil data!</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }}>
      <View style={{ 
        paddingHorizontal: 16, 
        paddingBottom: 16,
 
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 16,
        borderBottomWidth: 1, 
        borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0', 
        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF'   
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDarkMode ? '#F8FAFC' : '#0F172A' }}>
          Berita Utama
        </Text>
      </View>

      <FlatList
        data={articles}
        renderItem={({ item }) => <NewsCard article={item} />}
        keyExtractor={(item, index) => item.url + index}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} colors={['#089182']} />}
        onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, fontWeight: 'bold', color: '#EF4444', marginBottom: 8 },
  retryButton: { backgroundColor: '#089182', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }
});