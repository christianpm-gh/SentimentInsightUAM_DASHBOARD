import { useQuery } from 'react-query';
import apiClient from '../api/client';
import { 
  DepartmentItem, 
  ProfessorItem, 
  CourseItem, 
  HierarchyData 
} from '../types';

// Re-exportar tipos para compatibilidad
export type { ProfessorItem as Professor, CourseItem as Course };

export const useDepartments = () => {
  return useQuery<DepartmentItem[]>(
    ['departments'],
    async () => {
      try {
        console.log('Fetching departments...');
        const response = await apiClient.get<DepartmentItem[]>('/catalog/departments');
        console.log('Departments fetched:', response.data.length);
        return response.data;
      } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
      }
    },
    {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export const useHierarchy = () => {
  return useQuery<HierarchyData>(
    ['hierarchy'],
    async () => {
      try {
        console.log('Fetching hierarchy...');
        const response = await apiClient.get<HierarchyData>('/catalog/hierarchy');
        console.log('Hierarchy fetched:', response.data.departments.length, 'departments');
        return response.data;
      } catch (error) {
        console.error('Error fetching hierarchy:', error);
        throw error;
      }
    },
    {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export const useProfessors = (department?: string) => {
  return useQuery<ProfessorItem[]>(
    ['professors', department],
    async () => {
      try {
        console.log('Fetching professors...', department ? `for department: ${department}` : '');
        const params = department ? { department } : {};
        const response = await apiClient.get<ProfessorItem[]>('/catalog/professors', { params });
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

export const useProfessorsByDepartment = (departmentName: string | undefined) => {
  return useQuery<ProfessorItem[]>(
    ['professors-by-department', departmentName],
    async () => {
      if (!departmentName) return [];
      try {
        console.log(`Fetching professors for department: ${departmentName}`);
        const response = await apiClient.get<ProfessorItem[]>(
          `/catalog/departments/${encodeURIComponent(departmentName)}/professors`
        );
        console.log('Professors fetched:', response.data.length);
        return response.data.sort((a, b) => 
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );
      } catch (error) {
        console.error('Error fetching professors by department:', error);
        throw error;
      }
    },
    {
      enabled: !!departmentName,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export const useCoursesByProfessor = (professorId: number | undefined) => {
  return useQuery<CourseItem[]>(
    ['courses-by-professor', professorId],
    async () => {
      if (!professorId) return [];
      try {
        console.log(`Fetching courses for professor: ${professorId}`);
        const response = await apiClient.get<CourseItem[]>(
          `/catalog/professors/${professorId}/courses`
        );
        console.log('Courses fetched:', response.data.length);
        return response.data.sort((a, b) => 
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );
      } catch (error) {
        console.error('Error fetching courses by professor:', error);
        throw error;
      }
    },
    {
      enabled: !!professorId,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};

export const useCourses = (department?: string, professorId?: number) => {
  return useQuery<CourseItem[]>(
    ['courses', department, professorId],
    async () => {
      try {
        console.log('Fetching courses...');
        const params: Record<string, string | number> = {};
        if (department) params.department = department;
        if (professorId) params.professor_id = professorId;
        
        const response = await apiClient.get<CourseItem[]>('/catalog/courses', { params });
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
