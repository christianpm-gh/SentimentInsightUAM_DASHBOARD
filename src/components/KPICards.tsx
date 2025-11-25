import { DashboardMetrics } from '../types';

interface KPICardsProps {
  metrics: DashboardMetrics;
}

const KPICards = ({ metrics }: KPICardsProps) => {
  const positiveCount = metrics.sentiment_distribution.find(s => s.sentiment === 'positive')?.count || 0;
  const neutralCount = metrics.sentiment_distribution.find(s => s.sentiment === 'neutral')?.count || 0;
  const negativeCount = metrics.sentiment_distribution.find(s => s.sentiment === 'negative')?.count || 0;

  const kpis = [
    {
      title: 'Total Comentarios',
      value: metrics.total_comments.toLocaleString('es-MX'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/30',
      textColor: 'text-primary-600 dark:text-primary-400',
      borderColor: 'border-primary-200 dark:border-primary-700',
    },
    {
      title: 'Puntuación Promedio',
      value: metrics.average_sentiment_score.toFixed(2),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      gradient: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/30',
      textColor: 'text-accent-600 dark:text-accent-400',
      borderColor: 'border-accent-200 dark:border-accent-700',
    },
    {
      title: 'Positivos',
      value: positiveCount.toLocaleString('es-MX'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50 dark:bg-success-900/30',
      textColor: 'text-success-600 dark:text-success-400',
      borderColor: 'border-success-200 dark:border-success-700',
    },
    {
      title: 'Neutros',
      value: neutralCount.toLocaleString('es-MX'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-warning-500 to-warning-600',
      bgColor: 'bg-warning-50 dark:bg-warning-900/30',
      textColor: 'text-warning-600 dark:text-warning-400',
      borderColor: 'border-warning-200 dark:border-warning-700',
    },
    {
      title: 'Negativos',
      value: negativeCount.toLocaleString('es-MX'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-danger-500 to-danger-600',
      bgColor: 'bg-danger-50 dark:bg-danger-900/30',
      textColor: 'text-danger-600 dark:text-danger-400',
      borderColor: 'border-danger-200 dark:border-danger-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {kpis.map((kpi, index) => (
        <div 
          key={kpi.title} 
          className={`stat-card ${kpi.bgColor} border ${kpi.borderColor} 
                     animate-fade-in-up hover-lift group cursor-default`}
          style={{ 
            animationDelay: `${index * 100}ms`,
            // @ts-ignore
            '--stat-color-start': kpi.gradient.includes('primary') ? '#0ea5e9' :
                                  kpi.gradient.includes('accent') ? '#d946ef' :
                                  kpi.gradient.includes('success') ? '#10b981' :
                                  kpi.gradient.includes('warning') ? '#f59e0b' : '#ef4444',
            '--stat-color-end': kpi.gradient.includes('primary') ? '#0284c7' :
                                kpi.gradient.includes('accent') ? '#c026d3' :
                                kpi.gradient.includes('success') ? '#059669' :
                                kpi.gradient.includes('warning') ? '#d97706' : '#dc2626',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.gradient} text-white
                            shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              {kpi.icon}
            </div>
          </div>
          <p className="text-sm font-medium text-dark-500 dark:text-dark-400 mb-1">
            {kpi.title}
          </p>
          <p className={`text-3xl font-bold ${kpi.textColor} 
                        group-hover:scale-105 transition-transform duration-300`}>
            {kpi.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
