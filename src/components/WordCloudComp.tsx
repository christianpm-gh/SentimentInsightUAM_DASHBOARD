import ReactWordcloud from 'react-wordcloud';
import { WordFrequency } from '../types';
import { useTheme } from '../context/ThemeContext';

interface WordCloudCompProps {
  words: WordFrequency[];
}

const WordCloudComp = ({ words }: WordCloudCompProps) => {
  const { isDark } = useTheme();

  const lightColors = [
    '#0ea5e9', // primary
    '#d946ef', // accent
    '#f59e0b', // warning
    '#10b981', // success
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
  ];

  const darkColors = [
    '#38bdf8', // primary light
    '#e879f9', // accent light
    '#fbbf24', // warning light
    '#34d399', // success light
    '#a78bfa', // violet light
    '#f472b6', // pink light
    '#22d3ee', // cyan light
  ];

  const options = {
    rotations: 2,
    rotationAngles: [0, 90] as [number, number],
    fontSizes: [16, 72] as [number, number],
    fontFamily: 'JetBrains Mono',
    fontWeight: 'bold',
    colors: isDark ? darkColors : lightColors,
    enableOptimizations: true,
    deterministic: true,
    padding: 4,
    scale: 'sqrt' as const,
    spiral: 'archimedean' as const,
  };

  return (
    <div className="card p-6 animate-fade-in-up hover-lift" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-warning-500 
                        flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Palabras Más Frecuentes
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Términos destacados en las opiniones
          </p>
        </div>
      </div>

      <div className="wordcloud-container bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-800 dark:to-dark-900 rounded-xl p-4">
        <div style={{ height: '400px', width: '100%' }}>
          {words && words.length > 0 ? (
            <ReactWordcloud words={words} options={options} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-dark-400">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-lg font-medium">Sin palabras disponibles</p>
              <p className="text-sm">Selecciona un filtro para ver los términos</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats de palabras */}
      {words && words.length > 0 && (
        <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-700">
          <div className="flex flex-wrap gap-2">
            {words.slice(0, 5).map((word, index) => (
              <span 
                key={word.text}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                           bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50
                           text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700
                           transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-xs text-dark-400">#{index + 1}</span>
                {word.text}
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/50 dark:bg-dark-800/50">
                  {word.value}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCloudComp;
