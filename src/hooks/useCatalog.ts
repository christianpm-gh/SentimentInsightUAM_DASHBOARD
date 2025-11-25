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
      try {
        console.log('Fetching professors...');
        const response = await apiClient.get<Professor[]>('/catalog/professors');
        console.log('Professors fetched:', response.data.length);
        // Ordenar alfabéticamente por nombre
        return response.data.sort((a, b) => 
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );
      } catch (error) {
        console.error('Error fetching professors:', error);
        throw error;
      }
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export const useCourses = () => {
  return useQuery<Course[]>(
    ['courses'],
    async () => {
      try {
        console.log('Fetching courses...');
        const response = await apiClient.get<Course[]>('/catalog/courses');
        console.log('Courses fetched:', response.data.length);
        // Ordenar alfabéticamente por nombre
        return response.data.sort((a, b) => 
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );
      } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
    },
    {
      staleTime: 10 * 60 * 1000, // 10 minutos
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};
