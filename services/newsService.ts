import api from './api';

// Definisi kategori berita yang tersedia 
export type Category = 'general' | 'technology' | 'sports' | 'business' | 'health';

export const newsService = {
  // 1. Ambil berita utama (Trik khusus Indonesia pakai /everything)
  getTopHeadlines: async (category: Category = 'general', page = 1) => {
    const { data } = await api.get('/everything', {
      params: { 
        // Paksa cari berita yang ada hubungannya dengan Indonesia & kategorinya
        q: `Indonesia AND ${category === 'general' ? 'berita' : category}`,
        language: 'id', // Wajib bahasa Indonesia
        sortBy: 'publishedAt', // Urutkan dari yang paling baru
        page, 
        pageSize: 10 
      } 
    });
    return { articles: data.articles, totalResults: data.totalResults }; 
  },

  // 2. Pencarian berita (Tugas Poin 2)
  searchArticles: async (query: string, page = 1) => {
    const { data } = await api.get('/everything', {
      params: {
        q: query || 'indonesia', // Default 'indonesia' kalau input kosong biar API nggak error
        language: 'id', // Fokus ke bahasa Indonesia
        sortBy: 'publishedAt',
        page,
        pageSize: 10,
      }
    });
    return { articles: data.articles, totalResults: data.totalResults }; 
  },

  // 3. Ambil daftar sumber berita lokal
  getSources: async (category?: Category) => {
    const { data } = await api.get('/top-headlines/sources', {
      params: { country: 'id', category } // Tarik sumber khusus dari Indonesia (id)
    });
    return data.sources; 
  },

  // 4. Tambahan untuk Tugas Poin 3 (Filter berdasarkan sumber berita dan rentang tanggal)
  getFilteredNews: async (source?: string, fromDate?: string, toDate?: string, page = 1) => {
    const { data } = await api.get('/everything', {
      params: {
        q: 'indonesia', // Endpoint /everything mewajibkan ada parameter 'q' atau 'sources'
        sources: source,
        from: fromDate,
        to: toDate,
        language: 'id', // Diubah dari 'en' ke 'id' biar hasilnya tetap lokal
        sortBy: 'publishedAt',
        page,
        pageSize: 10,
      }
    });
    return { articles: data.articles, totalResults: data.totalResults };
  }
};