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
      title: 'Total Comments',
      value: metrics.total_comments.toLocaleString(),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Avg Sentiment Score',
      value: metrics.average_sentiment_score.toFixed(2),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Positive',
      value: positiveCount.toLocaleString(),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Neutral',
      value: neutralCount.toLocaleString(),
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Negative',
      value: negativeCount.toLocaleString(),
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.title} className={`${kpi.bgColor} rounded-lg p-6 shadow-sm`}>
          <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
          <p className={`text-3xl font-bold ${kpi.textColor} mt-2`}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
