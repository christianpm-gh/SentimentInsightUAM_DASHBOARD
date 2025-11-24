import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SentimentCount } from '../types';

interface SentimentPieProps {
  data: SentimentCount[];
}

const COLORS: Record<string, string> = {
  positive: '#10b981',
  neutral: '#f59e0b',
  negative: '#ef4444',
};

const SentimentPie = ({ data }: SentimentPieProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ sentiment, percent }) => 
              `${sentiment}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            nameKey="sentiment"
          >
            {data.map((entry) => (
              <Cell key={entry.sentiment} fill={COLORS[entry.sentiment] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPie;
