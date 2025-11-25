import { useState, useMemo } from 'react';
import { ScopeParams, ScopeType } from '../types';
import { useProfessors, useCourses } from '../hooks/useCatalog';

interface ScopeSelectorProps {
  onScopeChange: (params: ScopeParams) => void;
}

const ScopeSelector = ({ onScopeChange }: ScopeSelectorProps) => {
  const [scopeType, setScopeType] = useState<ScopeType | ''>('');
  const [scopeValue, setScopeValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: professors = [], isLoading: loadingProfs } = useProfessors();
  const { data: courses = [], isLoading: loadingCourses } = useCourses();

  // Filtrar profesores/cursos basado en búsqueda
  const filteredProfessors = useMemo(() => {
    if (!searchTerm) return professors;
    return professors.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [professors, searchTerm]);

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return courses;
    return courses.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const handleScopeTypeChange = (type: ScopeType | '') => {
    setScopeType(type);
    setScopeValue('');
    setSearchTerm('');
  };

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
    setSearchTerm('');
    onScopeChange({});
  };

  const scopeTypeLabels: Record<string, string> = {
    '': 'Todos',
    department: 'Departamento',
    professor: 'Profesor',
    course: 'Materia',
  };

  return (
    <div className="card p-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 
                        flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Filtros de Búsqueda
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Selecciona el alcance del análisis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tipo de Filtro */}
        <div className="space-y-2">
          <label htmlFor="scope-type" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">
            Tipo de Filtro
          </label>
          <select
            id="scope-type"
            value={scopeType}
            onChange={(e) => handleScopeTypeChange(e.target.value as ScopeType | '')}
            className="select-field"
          >
            <option value="">Todos</option>
            <option value="department">🏢 Departamento</option>
            <option value="professor">👨‍🏫 Profesor</option>
            <option value="course">📚 Materia</option>
          </select>
        </div>

        {/* Selector dinámico basado en tipo */}
        <div className="lg:col-span-2 space-y-2">
          <label htmlFor="scope-value" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">
            {scopeType === 'professor' ? 'Seleccionar Profesor' : 
             scopeType === 'course' ? 'Seleccionar Materia' : 
             scopeType === 'department' ? 'Nombre del Departamento' : 'Valor'}
          </label>
          
          {scopeType === 'professor' ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="🔍 Buscar profesor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
              <select
                id="scope-value"
                value={scopeValue}
                onChange={(e) => setScopeValue(e.target.value)}
                className="select-field"
                disabled={loadingProfs}
              >
                <option value="">
                  {loadingProfs ? 'Cargando profesores...' : '-- Selecciona un profesor --'}
                </option>
                {filteredProfessors.map((prof) => (
                  <option key={prof.id} value={prof.id.toString()}>
                    {prof.name} {prof.department && `(${prof.department})`}
                  </option>
                ))}
              </select>
              {filteredProfessors.length === 0 && !loadingProfs && searchTerm && (
                <p className="text-sm text-warning-600 dark:text-warning-400">
                  No se encontraron profesores con ese nombre
                </p>
              )}
            </div>
          ) : scopeType === 'course' ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="🔍 Buscar materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
              <select
                id="scope-value"
                value={scopeValue}
                onChange={(e) => setScopeValue(e.target.value)}
                className="select-field"
                disabled={loadingCourses}
              >
                <option value="">
                  {loadingCourses ? 'Cargando materias...' : '-- Selecciona una materia --'}
                </option>
                {filteredCourses.map((course) => (
                  <option key={course.id} value={course.id.toString()}>
                    {course.name}
                  </option>
                ))}
              </select>
              {filteredCourses.length === 0 && !loadingCourses && searchTerm && (
                <p className="text-sm text-warning-600 dark:text-warning-400">
                  No se encontraron materias con ese nombre
                </p>
              )}
            </div>
          ) : (
            <input
              id="scope-value"
              type="text"
              value={scopeValue}
              onChange={(e) => setScopeValue(e.target.value)}
              placeholder={scopeType ? `Ingresa el ${scopeTypeLabels[scopeType].toLowerCase()}...` : 'Selecciona un tipo primero'}
              disabled={!scopeType}
              className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
            />
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex items-end gap-3">
          <button
            onClick={handleApply}
            disabled={!scopeType || !scopeValue}
            className="btn-primary flex-1 flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicador de filtro activo */}
      {scopeType && scopeValue && (
        <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-200 dark:border-primary-700 
                        animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="text-sm text-primary-700 dark:text-primary-300">
            Filtro activo: <strong>{scopeTypeLabels[scopeType]}</strong> 
            {' → '} 
            <strong>
              {scopeType === 'professor' ? professors.find(p => p.id.toString() === scopeValue)?.name : 
               scopeType === 'course' ? courses.find(c => c.id.toString() === scopeValue)?.name : 
               scopeValue}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default ScopeSelector;
