import ReactWordcloud from 'react-wordcloud';
import { WordFrequency } from '../types';

interface WordCloudCompProps {
  words: WordFrequency[];
}

const WordCloudComp = ({ words }: WordCloudCompProps) => {
  const options = {
    rotations: 2,
    rotationAngles: [0, 90] as [number, number],
    fontSizes: [20, 80] as [number, number],
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Words</h2>
      <div style={{ height: '400px', width: '100%' }}>
        {words && words.length > 0 ? (
          <ReactWordcloud words={words} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No word data available
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCloudComp;
