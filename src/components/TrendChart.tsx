import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendPoint } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TrendChartProps {
  data: TrendPoint[];
}

const TrendChart = ({ data }: TrendChartProps) => {
  const { isDark } = useTheme();

  // Formatear fechas para mostrar
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('es-MX', {
      month: 'short',
      year: '2-digit'
    }),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="font-semibold mb-1">
            {new Date(point.date).toLocaleDateString('es-MX', {
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <p className="text-sm">
            <span className="text-primary-400">Puntuación:</span>{' '}
            <span className="font-bold">{point.sentiment_score.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-accent-400">Comentarios:</span>{' '}
            <span className="font-bold">{point.count.toLocaleString('es-MX')}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="card p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 
                        flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Tendencias en el Tiempo
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Evolución del sentimiento mensual
          </p>
        </div>
      </div>

      {formattedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9"/>
                <stop offset="50%" stopColor="#d946ef"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor}
              vertical={false}
            />
            <XAxis 
              dataKey="formattedDate" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12, fontFamily: 'JetBrains Mono' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12, fontFamily: 'JetBrains Mono' }}
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sentiment_score"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              fill="url(#colorSentiment)"
              dot={{
                fill: isDark ? '#1e293b' : '#ffffff',
                stroke: '#0ea5e9',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: '#d946ef',
                stroke: isDark ? '#1e293b' : '#ffffff',
                strokeWidth: 2,
                r: 6,
              }}
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center h-[320px] text-dark-400">
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-lg font-medium">Sin datos de tendencias</p>
          <p className="text-sm">Selecciona un filtro para ver la evolución</p>
        </div>
      )}

      {/* Indicadores de referencia */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-dark-100 dark:border-dark-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-xs text-dark-500 dark:text-dark-400">Positivo (+1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-xs text-dark-500 dark:text-dark-400">Neutro (0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger-500" />
          <span className="text-xs text-dark-500 dark:text-dark-400">Negativo (-1)</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
