import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

export const useNewsSearch = (query: string, category?: string, fromDate?: string, toDate?: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer); 
  }, [query]);

  return useQuery({
    queryKey: ['search', debouncedQuery, category, fromDate, toDate],
    queryFn: () => {
      if (category || fromDate || toDate) {
         return newsService.getFilteredNews(category, fromDate, toDate);
      }
      return newsService.searchArticles(debouncedQuery);
    },
    enabled: debouncedQuery.length >= 3 || !!category || !!fromDate || !!toDate,
  });
};