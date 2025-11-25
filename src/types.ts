export interface SentimentCount {
  sentiment: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  sentiment_score: number;
  count: number;
}

export interface WordFrequency {
  text: string;
  value: number;
}

export interface CategoryDistribution {
  category_name: string;
  category_label: string;
  positive: number;
  negative: number;
  neutral: number;
  not_analyzed: number;
  total: number;
}

export interface CategoriesMetrics {
  calidad_didactica: CategoryDistribution;
  empatia: CategoryDistribution;
  metodo_evaluacion: CategoryDistribution;
}

export interface DashboardMetrics {
  total_comments: number;
  average_sentiment_score: number;
  sentiment_distribution: SentimentCount[];
  categories?: CategoriesMetrics;
  sentiment_trends: TrendPoint[];
  top_words: WordFrequency[];
}

export type ScopeType = 'department' | 'professor' | 'course';

export interface ScopeParams {
  scope?: ScopeType;
  value?: string;
  // Parámetros adicionales para filtrado jerárquico
  department?: string;
  professor_id?: number;
}

// Tipos para el catálogo jerárquico
export interface DepartmentItem {
  name: string;
  professor_count: number;
}

export interface ProfessorItem {
  id: number;
  name: string;
  department: string;
}

export interface CourseItem {
  id: number;
  name: string;
  department?: string;
}

export interface DepartmentWithProfessors {
  name: string;
  professors: ProfessorItem[];
}

export interface HierarchyData {
  departments: DepartmentWithProfessors[];
}
