import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Inisialisasi: Paksa ngambil status warna langsung dari API Appearance
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // 2. Pasang dua alat pendeteksi tema
  useEffect(() => {
    // Alat A: Listener resmi bawaan React Native
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    // Alat B (Sapu Jagat): Interval setiap 1 detik. 
    // Ini buat nembus "tembok" Samsung yang kadang nge-block listener di atas.
    const interval = setInterval(() => {
      const currentScheme = Appearance.getColorScheme();
      const isCurrentlyDark = currentScheme === 'dark';
      
      // Update state kalau ternyata ada perubahan yang kelewat
      setIsDarkMode((prevMode) => {
        if (prevMode !== isCurrentlyDark) return isCurrentlyDark;
        return prevMode;
      });
    }, 1000);

    // Bersihin alatnya kalau komponen mati
    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, []);

  // 3. Urusan Bookmarks (Kode lo yang udah jalan)
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const savedBookmarks = await AsyncStorage.getItem('bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  };

  const toggleBookmark = async (article: any) => {
    let newBookmarks = [...bookmarks];
    const index = newBookmarks.findIndex((b) => b.url === article.url);
    if (index > -1) {
      newBookmarks.splice(index, 1);
    } else {
      newBookmarks.push(article);
    }
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <AppContext.Provider value={{ isDarkMode, bookmarks, toggleBookmark }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);