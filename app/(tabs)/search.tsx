import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  ActivityIndicator, 
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewsCard } from '../../components/NewsCard';
import { useNewsSearch } from '../../hooks/useSearch';
import { useApp } from '../../context/AppContext';

// Ganti sumber berita dengan Kategori
const AVAILABLE_CATEGORIES = [
  { id: 'general', name: 'Umum' },
  { id: 'business', name: 'Bisnis' },
  { id: 'technology', name: 'Teknologi' },
  { id: 'sports', name: 'Olahraga' },
  { id: 'health', name: 'Kesehatan' }
];

const getDateRange = (range: string) => {
  const today = new Date();
  const to = today.toISOString().split('T')[0];
  
  if (range === 'today') return { from: to, to };
  
  const from = new Date();
  if (range === 'week') from.setDate(today.getDate() - 7);
  if (range === 'month') from.setMonth(today.getMonth() - 1);
  
  return { from: from.toISOString().split('T')[0], to };
};

export default function SearchScreen() {
  const { isDarkMode } = useApp(); 
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // State untuk Kategori, bukan lagi Source
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | undefined>();

  const dates = dateRange ? getDateRange(dateRange) : { from: undefined, to: undefined };
  
  // Kirim selectedCategory ke hook pencarian
  const { data, isLoading } = useNewsSearch(query, selectedCategory, dates.from, dates.to); 
  const articles = data?.articles || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }]}>
      <View style={[styles.header, { 
        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
        borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 16,
        paddingHorizontal: 16,
        paddingBottom: 16
      }]}>
        <Text style={[styles.title, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>Eksplor Berita</Text>
        
        <View style={styles.searchRow}>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}>
            <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}
              placeholder="Ketik topik (min. 3 huruf)..."
              placeholderTextColor="#94A3B8"
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, showFilters && styles.filterButtonActive]} 
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={24} color={showFilters ? "white" : "#089182"} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={[styles.filterArea, { borderTopColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
            {/* Ubah Label dari Sumber ke Kategori */}
            <Text style={styles.filterLabel}>Kategori Topik:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {AVAILABLE_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.chip, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }, selectedCategory === cat.id && styles.chipActive]}
                  onPress={() => setSelectedCategory(selectedCategory === cat.id ? undefined : cat.id)}
                >
                  <Text style={[styles.chipText, selectedCategory === cat.id && styles.chipTextActive]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>Rentang Waktu:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {[{ id: 'today', label: 'Hari Ini' }, { id: 'week', label: 'Minggu Ini' }, { id: 'month', label: 'Bulan Ini' }].map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[styles.chip, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }, dateRange === range.id && styles.chipActive]}
                  onPress={() => setDateRange(dateRange === range.id ? undefined : range.id as any)}
                >
                  <Text style={[styles.chipText, dateRange === range.id && styles.chipTextActive]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#089182" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item, index) => item.url + index}
          ListEmptyComponent={
            (query.length >= 3 || selectedCategory || dateRange) ? (
              <Text style={styles.emptyText}>Tidak ada hasil yang cocok dengan filter.</Text>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="newspaper-outline" size={60} color={isDarkMode ? '#334155' : '#CBD5E1'} />
                <Text style={[styles.emptyStartText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>Mulai cari berita terbaru.</Text>
              </View>
            )
          }
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'center' },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, marginRight: 10 },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, height: 48, fontSize: 16 },
  filterButton: { padding: 12, borderRadius: 12, backgroundColor: '#F0FDFA', borderWidth: 1, borderColor: '#CCFBF1' },
  filterButtonActive: { backgroundColor: '#089182', borderColor: '#089182' },
  filterArea: { marginTop: 16, borderTopWidth: 1, paddingTop: 16 },
  filterLabel: { fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  chipScroll: { marginBottom: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'transparent' },
  chipActive: { backgroundColor: '#F0FDFA', borderColor: '#089182' },
  chipText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  chipTextActive: { color: '#089182', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#64748B' },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyStartText: { marginTop: 16, fontSize: 16 }
});