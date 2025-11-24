import { useState } from 'react';
import { ScopeParams, ScopeType } from '../types';

interface ScopeSelectorProps {
  onScopeChange: (params: ScopeParams) => void;
}

const ScopeSelector = ({ onScopeChange }: ScopeSelectorProps) => {
  const [scopeType, setScopeType] = useState<ScopeType | ''>('');
  const [scopeValue, setScopeValue] = useState('');

  const handleApply = () => {
    if (scopeType && scopeValue) {
      onScopeChange({ scope: scopeType, value: scopeValue });
    } else {
      onScopeChange({});
    }
  };

  const handleReset = () => {
    setScopeType('');
    setScopeValue('');
    onScopeChange({});
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Scope</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="scope-type" className="block text-sm font-medium text-gray-700 mb-2">
            Scope Type
          </label>
          <select
            id="scope-type"
            value={scopeType}
            onChange={(e) => setScopeType(e.target.value as ScopeType | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="department">Department</option>
            <option value="professor">Professor</option>
            <option value="course">Course</option>
          </select>
        </div>

        <div>
          <label htmlFor="scope-value" className="block text-sm font-medium text-gray-700 mb-2">
            Value
          </label>
          <input
            id="scope-value"
            type="text"
            value={scopeValue}
            onChange={(e) => setScopeValue(e.target.value)}
            placeholder="Enter filter value"
            disabled={!scopeType}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScopeSelector;
