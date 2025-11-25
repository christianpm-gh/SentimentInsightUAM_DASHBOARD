import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SentimentCount } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SentimentPieProps {
  data: SentimentCount[];
}

const COLORS: Record<string, { light: string; dark: string }> = {
  positive: { light: '#10b981', dark: '#34d399' },
  neutral: { light: '#f59e0b', dark: '#fbbf24' },
  negative: { light: '#ef4444', dark: '#f87171' },
};

const LABELS: Record<string, string> = {
  positive: 'Positivo',
  neutral: 'Neutro',
  negative: 'Negativo',
};

const SentimentPie = ({ data }: SentimentPieProps) => {
  const { isDark } = useTheme();

  const chartData = data.map(item => ({
    ...item,
    name: LABELS[item.sentiment] || item.sentiment,
    fill: isDark ? COLORS[item.sentiment]?.dark : COLORS[item.sentiment]?.light || '#8884d8',
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / total) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">
            {data.count.toLocaleString('es-MX')} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-semibold text-sm"
        style={{ fontFamily: 'JetBrains Mono' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="card p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-500 via-warning-500 to-danger-500 
                        flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Distribución de Sentimientos
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Análisis por tipo de opinión
          </p>
        </div>
      </div>

      <div className="w-full h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            innerRadius={60}
            paddingAngle={3}
            dataKey="count"
            nameKey="name"
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                stroke={isDark ? '#1e293b' : '#ffffff'}
                strokeWidth={2}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-dark-700 dark:text-dark-300 font-medium">
                {value}
              </span>
            )}
          />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda detallada */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-dark-100 dark:border-dark-700">
        {chartData.map((item) => (
          <div key={item.sentiment} className="text-center">
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: item.fill }}
            />
            <p className="text-xs text-dark-500 dark:text-dark-400">{item.name}</p>
            <p className="font-bold text-dark-900 dark:text-white">
              {item.count.toLocaleString('es-MX')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentPie;
