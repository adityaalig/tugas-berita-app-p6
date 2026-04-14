import api from './api';

export type Category = 'general' | 'technology' | 'sports' | 'business' | 'health';

export const newsService = {
  getTopHeadlines: async (category: Category = 'general', page = 1) => {
    const { data } = await api.get('/everything', {
      params: { 
        q: `Indonesia AND ${category === 'general' ? 'berita' : category}`,
        language: 'id',
        sortBy: 'publishedAt', 
        page, 
        pageSize: 10 
      } 
    });
    return { articles: data.articles, totalResults: data.totalResults }; 
  },


  searchArticles: async (query: string, page = 1) => {
    const { data } = await api.get('/everything', {
      params: {
        q: query || 'indonesia', 
        language: 'id', 
        sortBy: 'publishedAt',
        page,
        pageSize: 10,
      }
    });
    return { articles: data.articles, totalResults: data.totalResults }; 
  },

  getSources: async (category?: Category) => {
    const { data } = await api.get('/top-headlines/sources', {
      params: { country: 'id', category }
    });
    return data.sources; 
  },

  getFilteredNews: async (source?: string, fromDate?: string, toDate?: string, page = 1) => {
    const { data } = await api.get('/everything', {
      params: {
        q: 'indonesia', 
        sources: source,
        from: fromDate,
        to: toDate,
        language: 'id',
        sortBy: 'publishedAt',
        page,
        pageSize: 10,
      }
    });
    return { articles: data.articles, totalResults: data.totalResults };
  }
};