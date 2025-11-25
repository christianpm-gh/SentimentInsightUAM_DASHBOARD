import { useQuery } from 'react-query';
import apiClient from '../api/client';
import { DashboardMetrics, ScopeParams, CategoriesMetrics } from '../types';

export const useMetrics = (params: ScopeParams = {}) => {
  return useQuery<DashboardMetrics>(
    ['metrics', params],
    async () => {
      let url = '';
      if (params.scope === 'professor' && params.value) {
        url = `/metrics/professor/${params.value}`;
      } else if (params.scope === 'department' && params.value) {
        url = `/metrics/department/${params.value}`;
      } else if (params.scope === 'course' && params.value) {
        url = `/metrics/course/${params.value}`;
      } else {
        // No valid scope selected, return null or handle as needed
        return null as unknown as DashboardMetrics;
      }
      
      const response = await apiClient.get<any>(url);
      const data = response.data;

      // Mapear las categorías si existen
      let categories: CategoriesMetrics | undefined = undefined;
      if (data.categories) {
        categories = data.categories;
      }

      return {
        total_comments: data.stats.total_opinions,
        average_sentiment_score: data.stats.average_rating,
        sentiment_distribution: [
          { sentiment: 'positive', count: data.stats.sentiment_distribution.positive },
          { sentiment: 'neutral', count: data.stats.sentiment_distribution.neutral },
          { sentiment: 'negative', count: data.stats.sentiment_distribution.negative },
        ],
        categories,
        sentiment_trends: data.trends,
        top_words: data.word_cloud,
      } as DashboardMetrics;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};
