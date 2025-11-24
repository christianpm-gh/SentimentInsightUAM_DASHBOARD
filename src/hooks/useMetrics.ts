import { useQuery } from 'react-query';
import apiClient from '../api/client';
import { DashboardMetrics, ScopeParams } from '../types';

export const useMetrics = (params: ScopeParams = {}) => {
  return useQuery<DashboardMetrics>(
    ['metrics', params],
    async () => {
      const queryParams = new URLSearchParams();
      if (params.scope && params.value) {
        queryParams.append('scope', params.scope);
        queryParams.append('value', params.value);
      }
      
      const url = `/api/dashboard/metrics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get<DashboardMetrics>(url);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};
