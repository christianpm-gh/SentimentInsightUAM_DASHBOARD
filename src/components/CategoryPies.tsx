import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { CategoryDistribution, CategoriesMetrics } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CategoryPieProps {
  categories: CategoriesMetrics;
}

const COLORS: Record<string, { light: string; dark: string }> = {
  positive: { light: '#10b981', dark: '#34d399' },
  neutral: { light: '#f59e0b', dark: '#fbbf24' },
  negative: { light: '#ef4444', dark: '#f87171' },
  not_analyzed: { light: '#9ca3af', dark: '#6b7280' },
};

const LABELS: Record<string, string> = {
  positive: 'Positivo',
  neutral: 'Neutro',
  negative: 'Negativo',
  not_analyzed: 'Sin Analizar',
};

interface SingleCategoryPieProps {
  category: CategoryDistribution;
  isDark: boolean;
}

const SingleCategoryPie = ({ category, isDark }: SingleCategoryPieProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const chartData = [
    { name: LABELS.positive, value: category.positive, key: 'positive' },
    { name: LABELS.neutral, value: category.neutral, key: 'neutral' },
    { name: LABELS.negative, value: category.negative, key: 'negative' },
  ].filter(item => item.value > 0);

  const total = category.positive + category.neutral + category.negative;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-dark-400 dark:text-dark-500">
        <p className="text-sm">Sin datos analizados</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm">{data.value.toLocaleString('es-MX')} ({percentage}%)</p>
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

    if (percent < 0.08) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-semibold text-xs"
        style={{ fontFamily: 'JetBrains Mono' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent } = props;
    const RADIAN = Math.PI / 180;
    const expandOffset = 6;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const mx = cx + expandOffset * cos;
    const my = cy + expandOffset * sin;
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5 + expandOffset;
    const labelX = cx + labelRadius * cos;
    const labelY = cy + labelRadius * sin;

    return (
      <g>
        <Sector
          cx={mx}
          cy={my}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 3}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke={isDark ? '#1e293b' : '#ffffff'}
          strokeWidth={2}
          style={{ filter: 'drop-shadow(0 3px 4px rgba(0, 0, 0, 0.15))' }}
        />
        {percent >= 0.08 && (
          <text
            x={labelX}
            y={labelY}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-semibold text-xs"
            style={{ fontFamily: 'JetBrains Mono' }}
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        )}
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={activeIndex === undefined ? renderCustomLabel : undefined}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            outerRadius={70}
            innerRadius={35}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            animationBegin={0}
            animationDuration={600}
            animationEasing="ease-out"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isDark ? COLORS[entry.key]?.dark : COLORS[entry.key]?.light}
                stroke={isDark ? '#1e293b' : '#ffffff'}
                strokeWidth={2}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease-out' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const CategoryPies = ({ categories }: CategoryPieProps) => {
  const { isDark } = useTheme();

  const categoryList = [
    { key: 'calidad_didactica', data: categories.calidad_didactica, icon: '📚', color: 'from-blue-500 to-indigo-500' },
    { key: 'empatia', data: categories.empatia, icon: '💝', color: 'from-pink-500 to-rose-500' },
    { key: 'metodo_evaluacion', data: categories.metodo_evaluacion, icon: '📝', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="card p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Análisis por Categorías</h2>
          <p className="text-sm text-dark-500 dark:text-dark-400">Distribución de sentimientos por dimensión</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryList.map(({ key, data, icon, color }) => (
          <div key={key} className="bg-dark-50 dark:bg-dark-800/50 rounded-xl p-4 border border-dark-100 dark:border-dark-700">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                <span className="text-sm">{icon}</span>
              </div>
              <h3 className="font-semibold text-dark-900 dark:text-white text-sm">{data.category_label}</h3>
            </div>
            
            <SingleCategoryPie category={data} isDark={isDark} />
            
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-dark-200 dark:border-dark-600">
              <div className="text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: isDark ? COLORS.positive.dark : COLORS.positive.light }} />
                <p className="text-xs text-dark-500 dark:text-dark-400">Positivo</p>
                <p className="font-bold text-sm text-dark-900 dark:text-white">{data.positive}</p>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: isDark ? COLORS.neutral.dark : COLORS.neutral.light }} />
                <p className="text-xs text-dark-500 dark:text-dark-400">Neutro</p>
                <p className="font-bold text-sm text-dark-900 dark:text-white">{data.neutral}</p>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: isDark ? COLORS.negative.dark : COLORS.negative.light }} />
                <p className="text-xs text-dark-500 dark:text-dark-400">Negativo</p>
                <p className="font-bold text-sm text-dark-900 dark:text-white">{data.negative}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda general */}
      <div className="mt-6 pt-4 border-t border-dark-100 dark:border-dark-700">
        <div className="flex flex-wrap justify-center gap-6">
          {Object.entries(LABELS).filter(([key]) => key !== 'not_analyzed').map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: isDark ? COLORS[key].dark : COLORS[key].light }} />
              <span className="text-sm text-dark-600 dark:text-dark-300">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPies;
