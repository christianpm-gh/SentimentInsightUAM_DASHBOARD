import { useState, useMemo, useEffect } from 'react';
import { ScopeParams, ScopeType } from '../types';
import { 
  useDepartments, 
  useProfessorsByDepartment, 
  useCoursesByProfessor,
  useCourses 
} from '../hooks/useCatalog';

interface ScopeSelectorProps {
  onScopeChange: (params: ScopeParams) => void;
}

const ScopeSelector = ({ onScopeChange }: ScopeSelectorProps) => {
  const [scopeType, setScopeType] = useState<ScopeType | ''>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProfessorId, setSelectedProfessorId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: departments = [], isLoading: loadingDepts, isError: errorDepts } = useDepartments();
  const { data: professors = [], isLoading: loadingProfs, isError: errorProfs, refetch: refetchProfs } = useProfessorsByDepartment(selectedDepartment || undefined);
  const { data: courses = [], isLoading: loadingCourses, isError: errorCourses } = useCoursesByProfessor(selectedProfessorId || undefined);
  const { data: allCourses = [], isLoading: loadingAllCourses, isError: errorAllCourses } = useCourses();

  useEffect(() => {
    if (scopeType === 'department') {
      setSelectedProfessorId(null);
      setSelectedCourseId(null);
    } else if (scopeType === 'professor') {
      setSelectedCourseId(null);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  }, [scopeType]);

  useEffect(() => {
    setSelectedProfessorId(null);
    setSelectedCourseId(null);
  }, [selectedDepartment]);

  useEffect(() => {
    setSelectedCourseId(null);
  }, [selectedProfessorId]);

  const filteredProfessors = useMemo(() => {
    if (!searchTerm) return professors;
    return professors.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [professors, searchTerm]);

  const availableCourses = scopeType === 'course' && !selectedProfessorId ? allCourses : courses;
  const filteredCourses = useMemo(() => {
    if (!searchTerm) return availableCourses;
    return availableCourses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [availableCourses, searchTerm]);

  const handleScopeTypeChange = (type: ScopeType | '') => {
    setScopeType(type);
    setSelectedDepartment('');
    setSelectedProfessorId(null);
    setSelectedCourseId(null);
    setSearchTerm('');
  };

  const handleApply = () => {
    if (scopeType === 'department' && selectedDepartment) {
      onScopeChange({ scope: 'department', value: selectedDepartment });
    } else if (scopeType === 'professor' && selectedProfessorId) {
      onScopeChange({ scope: 'professor', value: selectedProfessorId.toString() });
    } else if (scopeType === 'course' && selectedCourseId) {
      onScopeChange({ scope: 'course', value: selectedCourseId.toString() });
    } else {
      onScopeChange({});
    }
  };

  const handleReset = () => {
    setScopeType('');
    setSelectedDepartment('');
    setSelectedProfessorId(null);
    setSelectedCourseId(null);
    setSearchTerm('');
    onScopeChange({});
  };

  const isApplyEnabled = () => {
    if (scopeType === 'department') return !!selectedDepartment;
    if (scopeType === 'professor') return !!selectedProfessorId;
    if (scopeType === 'course') return !!selectedCourseId;
    return false;
  };

  const getSelectedProfessorName = () => professors.find(p => p.id === selectedProfessorId)?.name || '';
  const getSelectedCourseName = () => availableCourses.find(c => c.id === selectedCourseId)?.name || '';

  return (
    <div className="card p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-dark-900 dark:text-white">Filtros de Búsqueda</h2>
          <p className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">Selecciona el alcance del análisis de forma jerárquica</p>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {/* Primera fila: Tipo de filtro y Departamento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="scope-type" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">Tipo de Filtro</label>
            <select id="scope-type" value={scopeType} onChange={(e) => handleScopeTypeChange(e.target.value as ScopeType | '')} className="select-field">
              <option value="">Selecciona un tipo</option>
              <option value="department">Departamento</option>
              <option value="professor">Profesor</option>
              <option value="course">Materia</option>
            </select>
          </div>

          {scopeType && (
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">
                Departamento {scopeType !== 'department' && <span className="text-dark-400 font-normal">(opcional)</span>}
              </label>
              {errorDepts ? (
                <div className="text-sm text-red-500">Error cargando departamentos</div>
              ) : (
                <select id="department" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="select-field" disabled={loadingDepts}>
                  <option value="">{loadingDepts ? 'Cargando...' : '-- Todos --'}</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>{dept.name} ({dept.professor_count})</option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

          {(scopeType === 'professor' || scopeType === 'course') && (
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="professor" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">
                Profesor {scopeType === 'course' && <span className="text-dark-400 font-normal">(opcional)</span>}
              </label>
              {errorProfs ? (
                <div className="text-sm text-red-500 flex items-center gap-2">
                  <span>Error cargando profesores</span>
                  <button onClick={() => refetchProfs()} className="text-primary-600 hover:underline text-xs">Reintentar</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder={selectedDepartment ? "Buscar profesor..." : "Selecciona departamento primero"}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10 w-full"
                      disabled={!selectedDepartment && scopeType === 'professor'}
                    />
                  </div>
                  <div className="relative">
                    {isDropdownOpen && <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>}
                    <button
                      type="button"
                      onClick={() => !loadingProfs && selectedDepartment && setIsDropdownOpen(!isDropdownOpen)}
                      disabled={loadingProfs || (!selectedDepartment && scopeType === 'professor')}
                      className="w-full text-left bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed min-h-[46px]"
                    >
                      {loadingProfs ? (
                        <span className="text-dark-400 text-sm">Cargando...</span>
                      ) : !selectedDepartment && scopeType === 'professor' ? (
                        <span className="text-dark-400 text-sm">Primero selecciona departamento</span>
                      ) : selectedProfessorId ? (
                        <span className="truncate text-sm text-dark-900 dark:text-white font-medium">{getSelectedProfessorName()}</span>
                      ) : (
                        <span className="text-dark-400 text-sm">-- Selecciona profesor --</span>
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
                              onClick={() => { setSelectedProfessorId(prof.id); setIsDropdownOpen(false); setSearchTerm(''); }}
                              className={`px-4 py-3 hover:bg-dark-50 dark:hover:bg-dark-700 cursor-pointer border-b border-dark-100 dark:border-dark-700 last:border-0 transition-colors ${selectedProfessorId === prof.id ? 'bg-primary-50 dark:bg-primary-900/30' : ''}`}
                            >
                              <span className="text-sm text-dark-700 dark:text-dark-200">{prof.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-dark-400 text-sm text-center">
                            {professors.length === 0 ? 'No hay profesores' : 'No encontrado'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        {scopeType === 'course' && (
          <div className="space-y-2">
            <label htmlFor="course" className="block text-sm font-semibold text-dark-700 dark:text-dark-200">Materia</label>
            {(errorCourses || errorAllCourses) ? (
              <div className="text-sm text-red-500">Error cargando materias</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="Buscar materia..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10 w-full" />
                </div>
                <div>
                  <select id="course" value={selectedCourseId?.toString() || ''} onChange={(e) => setSelectedCourseId(e.target.value ? parseInt(e.target.value) : null)} className="select-field w-full" disabled={loadingCourses || loadingAllCourses}>
                    <option value="">{loadingCourses || loadingAllCourses ? 'Cargando...' : '-- Selecciona materia --'}</option>
                    {filteredCourses.map((course) => (
                      <option key={course.id} value={course.id.toString()}>{course.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {selectedProfessorId && courses.length === 0 && !loadingCourses && (
              <p className="text-sm text-warning-600 dark:text-warning-400">Este profesor no tiene materias registradas.</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-dark-100 dark:border-dark-700">
          <div className="flex gap-3 sm:ml-auto">
            <button onClick={handleReset} className="btn-secondary flex items-center justify-center gap-2 px-4 sm:px-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Limpiar</span>
            </button>
            <button onClick={handleApply} disabled={!isApplyEnabled()} className="btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Aplicar Filtro
            </button>
          </div>
        </div>
      </div>

      {isApplyEnabled() && (
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl border border-primary-200 dark:border-primary-700 animate-fade-in flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Filtro configurado:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {scopeType === 'department' && selectedDepartment && (
              <span className="px-3 py-1.5 bg-white dark:bg-dark-800 rounded-lg shadow-sm text-sm font-semibold text-dark-900 dark:text-white">Departamento: {selectedDepartment}</span>
            )}
            {scopeType === 'professor' && selectedProfessorId && (
              <>
                {selectedDepartment && <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-md text-xs text-purple-800 dark:text-purple-300">{selectedDepartment}</span>}
                <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="px-3 py-1.5 bg-white dark:bg-dark-800 rounded-lg shadow-sm text-sm font-semibold text-dark-900 dark:text-white">{getSelectedProfessorName()}</span>
              </>
            )}
            {scopeType === 'course' && selectedCourseId && (
              <>
                {selectedDepartment && <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-md text-xs text-purple-800 dark:text-purple-300">{selectedDepartment}</span>}
                {selectedProfessorId && (
                  <>
                    <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-md text-xs text-blue-800 dark:text-blue-300">{getSelectedProfessorName()}</span>
                  </>
                )}
                <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="px-3 py-1.5 bg-white dark:bg-dark-800 rounded-lg shadow-sm text-sm font-semibold text-dark-900 dark:text-white">{getSelectedCourseName()}</span>
              </>
            )}
          </div>
          <button onClick={handleReset} className="ml-auto p-1.5 text-dark-400 hover:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/30 rounded-lg transition-colors" title="Quitar filtro">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ScopeSelector;
