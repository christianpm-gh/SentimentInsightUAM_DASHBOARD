import { useQuery } from 'react-query';
import apiClient from '../api/client';

export interface Professor {
  id: number;
  name: string;
  department: string;
}

export interface Course {
  id: number;
  name: string;
}

export const useProfessors = () => {
  return useQuery<Professor[]>(
    ['professors'],
    async () => {
      const response = await apiClient.get<Professor[]>('/catalog/professors');
      // Ordenar alfabéticamente por nombre
      return response.data.sort((a, b) => 
        a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
      );
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: false,
    }
  );
};

export const useCourses = () => {
  return useQuery<Course[]>(
    ['courses'],
    async () => {
      const response = await apiClient.get<Course[]>('/catalog/courses');
      // Ordenar alfabéticamente por nombre
      return response.data.sort((a, b) => 
        a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
      );
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: false,
    }
  );
};
