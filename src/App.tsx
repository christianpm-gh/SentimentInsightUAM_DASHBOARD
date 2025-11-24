import { useState } from 'react';
import { useMetrics } from './hooks/useMetrics';
import { ScopeParams } from './types';
import ScopeSelector from './components/ScopeSelector';
import KPICards from './components/KPICards';
import SentimentPie from './components/SentimentPie';
import TrendChart from './components/TrendChart';
import WordCloudComp from './components/WordCloudComp';

function App() {
  const [scopeParams, setScopeParams] = useState<ScopeParams>({});
  const { data: metrics, isLoading, isError } = useMetrics(scopeParams);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            SentimentInsight UAM Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <ScopeSelector onScopeChange={setScopeParams} />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error loading dashboard data. Please make sure the API is running.</p>
          </div>
        )}

        {metrics && !isLoading && (
          <div className="space-y-8">
            <KPICards metrics={metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SentimentPie data={metrics.sentiment_distribution} />
              <TrendChart data={metrics.sentiment_trends} />
            </div>

            <WordCloudComp words={metrics.top_words} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
