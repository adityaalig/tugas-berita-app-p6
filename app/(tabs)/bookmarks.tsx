import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { NewsCard } from '../../components/NewsCard';
import { useApp } from '../../context/AppContext';

export default function BookmarksScreen() {
  const { bookmarks, isDarkMode } = useApp();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }]}>
      <View style={[styles.header, { 
        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
        borderBottomColor: isDarkMode ? '#334155' : '#E2E8F0',
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 16, 
      }]}>
        <Text style={[styles.title, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]}>Tersimpan</Text>
      </View>

      {bookmarks?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
            Belum ada berita yang lo simpan nih.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16 }
});