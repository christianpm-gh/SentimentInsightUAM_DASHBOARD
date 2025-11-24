export interface SentimentCount {
  sentiment: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface WordFrequency {
  text: string;
  value: number;
}

export interface DashboardMetrics {
  total_comments: number;
  average_sentiment_score: number;
  sentiment_distribution: SentimentCount[];
  sentiment_trends: TrendPoint[];
  top_words: WordFrequency[];
}

export type ScopeType = 'department' | 'professor' | 'course';

export interface ScopeParams {
  scope?: ScopeType;
  value?: string;
}
