import { useState } from 'react';
import { useMetrics } from './hooks/useMetrics';
import { ScopeParams } from './types';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ScopeSelector from './components/ScopeSelector';
import KPICards from './components/KPICards';
import SentimentPie from './components/SentimentPie';
import CategoryPies from './components/CategoryPies';
import TrendChart from './components/TrendChart';
import WordCloudComp from './components/WordCloudComp';

function Dashboard() {
  const [scopeParams, setScopeParams] = useState<ScopeParams>({});
  const { data: metrics, isLoading, isError } = useMetrics(scopeParams);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50/30 to-accent-50/30 
                    dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 
                    transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-dark-900/80 
                         border-b border-dark-100 dark:border-dark-800 shadow-sm">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-warning-500 
                              flex items-center justify-center shadow-lg shadow-primary-500/30 
                              animate-gradient bg-300% transform hover:scale-105 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  <span className="gradient-text">SentimentInsight</span>
                  <span className="text-dark-900 dark:text-white"> UAM</span>
                </h1>
                <p className="text-sm text-dark-500 dark:text-dark-400 hidden sm:block">
                  Dashboard de Análisis de Sentimientos
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Indicador de estado */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full 
                              bg-success-100 dark:bg-success-900/30 border border-success-200 dark:border-success-800">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs font-medium text-success-700 dark:text-success-400">
                  En línea
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Filtros */}
        <section className="mb-8">
          <ScopeSelector onScopeChange={setScopeParams} />
        </section>

        {/* Estado de carga */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
            <div className="loader mb-4" />
            <p className="text-dark-500 dark:text-dark-400 font-medium animate-pulse">
              Cargando datos del análisis...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="animate-fade-in-up">
            <div className="card p-6 bg-danger-50 dark:bg-danger-900/30 border-danger-200 dark:border-danger-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-danger-100 dark:bg-danger-800 
                                flex items-center justify-center">
                  <svg className="w-6 h-6 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-danger-800 dark:text-danger-200">
                    Error al cargar los datos
                  </h3>
                  <p className="text-sm text-danger-600 dark:text-danger-400">
                    Por favor verifica que la API esté funcionando correctamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {!metrics && !isLoading && !isError && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 
                            dark:from-primary-900/30 dark:to-accent-900/30 
                            flex items-center justify-center">
              <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
              No hay datos seleccionados
            </h3>
            <p className="text-dark-500 dark:text-dark-400 max-w-md mx-auto">
              Utiliza los filtros de arriba para seleccionar un departamento, profesor o materia 
              y visualizar las métricas de análisis de sentimientos.
            </p>
          </div>
        )}

        {/* Dashboard con datos */}
        {metrics && !isLoading && (
          <div className="space-y-8">
            {/* KPIs */}
            <section>
              <KPICards metrics={metrics} />
            </section>

            {/* Gráficos principales */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              <SentimentPie data={metrics.sentiment_distribution} />
              <TrendChart data={metrics.sentiment_trends} />
            </section>

            {/* Gráficas de Categorías (Calidad Didáctica, Empatía, Método de Evaluación) */}
            {metrics.categories && (
              <section>
                <CategoryPies categories={metrics.categories} />
              </section>
            )}

            {/* Nube de palabras */}
            <section>
              <WordCloudComp words={metrics.top_words} />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-100 dark:border-dark-800 mt-12">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-500 dark:text-dark-400">
              © 2024 SentimentInsight UAM. Análisis de sentimientos para la mejora continua.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-dark-400 dark:text-dark-500 flex items-center gap-2">
                Desarrollado con
                <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                usando React + FastAPI
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
