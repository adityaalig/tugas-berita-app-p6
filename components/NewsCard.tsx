import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Share, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export function NewsCard({ article }: { article: any }) {
  const { toggleBookmark, bookmarks } = useApp();
  const isBookmarked = bookmarks?.some((b: any) => b.url === article.url);
  
  // Deteksi tema langsung di level komponen
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleShare = async () => {
    try {
      await Share.share({ message: `Baca berita ini: ${article.title}\n${article.url}` });
    } catch (error) {
      console.log("Gagal membagikan:", error);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
      <Image source={{ uri: article.urlToImage ?? 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkMode ? '#F8FAFC' : '#0F172A' }]} numberOfLines={2}>
          {article.title}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleBookmark(article)}>
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color="#089182" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={{ marginLeft: 15 }}>
            <Ionicons name="share-social-outline" size={24} color="#089182" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 10, borderRadius: 12, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 180 },
  content: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }
});