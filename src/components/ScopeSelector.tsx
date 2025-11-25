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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { 
    data: professors = [], 
    isLoading: loadingProfs, 
    isError: errorProfs,
    refetch: refetchProfs 
  } = useProfessors();
  
  const { 
    data: courses = [], 
    isLoading: loadingCourses, 
    isError: errorCourses,
    refetch: refetchCourses 
  } = useCourses();

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
    <div className="card p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 
                        flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 dark:text-white">
            Filtros de Búsqueda
          </h2>
          <p className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">
            Selecciona el alcance del análisis
          </p>
        </div>
      </div>

      {/* Filtros en layout flexible */}
      <div className="space-y-6">
        {/* Primera fila: Tipo de filtro y Selector de valor */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Tipo de Filtro */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-2">
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
              <option value="department">Departamento</option>
              <option value="professor">Profesor</option>
              <option value="course">Materia</option>
            </select>
          </div>

          {/* Selector dinámico basado en tipo */}
          <div className="flex-1 min-w-0 space-y-2">
            <label htmlFor="scope-value" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">
              {scopeType === 'professor' ? 'Seleccionar Profesor' : 
               scopeType === 'course' ? 'Seleccionar Materia' : 
               scopeType === 'department' ? 'Nombre del Departamento' : 'Valor'}
            </label>
            
            {scopeType === 'professor' ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar profesor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex-1">
                  {errorProfs ? (
                    <div className="h-full flex items-center text-sm text-red-500 gap-2">
                      <span>Error cargando profesores</span>
                      <button 
                        onClick={() => refetchProfs()}
                        className="text-primary-600 hover:underline text-xs"
                      >
                        Reintentar
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                        {/* Backdrop for closing */}
                        {isDropdownOpen && (
                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        )}
                        
                        <button 
                            type="button"
                            onClick={() => !loadingProfs && setIsDropdownOpen(!isDropdownOpen)}
                            disabled={loadingProfs}
                            className="w-full text-left bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed min-h-[46px]"
                        >
                            {loadingProfs ? (
                                <span className="text-dark-400">Cargando profesores...</span>
                            ) : scopeValue ? (
                                <div className="flex items-center gap-2 overflow-hidden">
                                     {(() => {
                                         const selected = professors.find(p => p.id.toString() === scopeValue);
                                         if (!selected) return <span>Seleccionado no encontrado</span>;
                                         return (
                                             <>
                                                <span className="truncate px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                    {selected.name}
                                                </span>
                                                {selected.department && (
                                                    <span className="truncate px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800 max-w-[120px] sm:max-w-none">
                                                        {selected.department}
                                                    </span>
                                                )}
                                             </>
                                         )
                                     })()}
                                </div>
                            ) : (
                                <span className="text-dark-400">-- Selecciona un profesor --</span>
                            )}
                            <svg className={`w-5 h-5 text-dark-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} flex-shrink-0 ml-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-20 mt-1 w-full bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl shadow-lg max-h-60 overflow-auto">
                                {filteredProfessors.length > 0 ? (
                                    filteredProfessors.map((prof) => (
                                        <div 
                                            key={prof.id}
                                            onClick={() => {
                                                setScopeValue(prof.id.toString());
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-4 py-3 hover:bg-dark-50 dark:hover:bg-dark-700 cursor-pointer border-b border-dark-100 dark:border-dark-700 last:border-0 flex items-center gap-2 transition-colors overflow-hidden"
                                        >
                                            <span className="truncate px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                {prof.name}
                                            </span>
                                            {prof.department && (
                                                <span className="truncate px-2 py-0.5 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0 max-w-[40%]">
                                                    {prof.department}
                                                </span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-dark-400 text-sm text-center">
                                        No se encontraron resultados
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            ) : scopeType === 'course' ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar materia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex-1">
                  {errorCourses ? (
                    <div className="h-full flex items-center text-sm text-red-500 gap-2">
                      <span>Error cargando materias</span>
                      <button 
                        onClick={() => refetchCourses()}
                        className="text-primary-600 hover:underline text-xs"
                      >
                        Reintentar
                      </button>
                    </div>
                  ) : (
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
                  )}
                </div>
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
            
            {/* Mensajes de búsqueda vacía */}
            {scopeType === 'professor' && filteredProfessors.length === 0 && !loadingProfs && !errorProfs && searchTerm && (
              <p className="text-sm text-warning-600 dark:text-warning-400 mt-2">
                No se encontraron profesores con ese nombre
              </p>
            )}
            {scopeType === 'course' && filteredCourses.length === 0 && !loadingCourses && !errorCourses && searchTerm && (
              <p className="text-sm text-warning-600 dark:text-warning-400 mt-2">
                No se encontraron materias con ese nombre
              </p>
            )}
          </div>
        </div>

        {/* Segunda fila: Botones de acción */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-dark-100 dark:border-dark-700">
          <div className="flex gap-3 sm:ml-auto">
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center justify-center gap-2 px-4 sm:px-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="sm:inline">Limpiar</span>
            </button>
            <button
              onClick={handleApply}
              disabled={!scopeType || !scopeValue}
              className="btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Aplicar Filtro
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de filtro activo */}
      {scopeType && scopeValue && (
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-200 dark:border-primary-700 
                        animate-fade-in flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Filtro activo:
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-dark-800 rounded-lg shadow-sm">
            <span className="text-sm text-dark-600 dark:text-dark-300">
              {scopeTypeLabels[scopeType]}
            </span>
            <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-semibold text-dark-900 dark:text-white">
              {scopeType === 'professor' ? professors.find(p => p.id.toString() === scopeValue)?.name : 
               scopeType === 'course' ? courses.find(c => c.id.toString() === scopeValue)?.name : 
               scopeValue}
            </span>
          </div>
          <button 
            onClick={handleReset}
            className="ml-auto p-1.5 text-dark-400 hover:text-danger-500 hover:bg-danger-50 
                       dark:hover:bg-danger-900/30 rounded-lg transition-colors"
            title="Quitar filtro"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScopeSelector;
