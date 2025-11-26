# Flujos Críticos del Sistema

Este documento describe los flujos críticos de la aplicación SentimentInsight UAM Dashboard, proporcionando una comprensión detallada de cómo funcionan las interacciones principales.

## Tabla de Contenidos

- [Flujo de Inicialización](#flujo-de-inicialización)
- [Flujo de Filtrado Jerárquico](#flujo-de-filtrado-jerárquico)
- [Flujo de Obtención de Métricas](#flujo-de-obtención-de-métricas)
- [Flujo de Cambio de Tema](#flujo-de-cambio-de-tema)
- [Flujo de Manejo de Errores](#flujo-de-manejo-de-errores)
- [Flujo de Cache de Datos](#flujo-de-cache-de-datos)
- [Flujo de Renderizado Condicional](#flujo-de-renderizado-condicional)

---

## Flujo de Inicialización

### Descripción
Secuencia de eventos desde que el usuario abre la aplicación hasta que ve la interfaz lista.

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuario abre http://localhost:5173              │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 2. Vite sirve index.html                           │
│    - Carga script principal                         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 3. main.tsx ejecuta                                │
│    - ReactDOM.createRoot()                          │
│    - StrictMode wrapper                             │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 4. App.tsx monta                                   │
│    - ThemeProvider envuelve Dashboard               │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 5. ThemeProvider inicializa                        │
│    - Lee localStorage ('theme')                     │
│    - Lee preferencia del sistema si no hay guardada │
│    - Aplica clase al <html>                         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 6. Dashboard monta                                 │
│    - useState: scopeParams = {}                     │
│    - useMetrics(scopeParams) ejecuta                │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 7. useMetrics evalúa params                        │
│    - params está vacío ({})                         │
│    - No ejecuta fetch (no scope válido)             │
│    - Retorna: { data: null, isLoading: false }      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 8. Dashboard renderiza                             │
│    - Header con logo y ThemeToggle                  │
│    - ScopeSelector (carga catálogos)                │
│    - EmptyState (no hay datos seleccionados)        │
│    - Footer                                         │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 9. ScopeSelector inicializa                        │
│    - useDepartments() ejecuta                       │
│    - GET /catalog/departments                       │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 10. Usuario ve la UI completa                      │
│     - Tema aplicado (dark/light)                    │
│     - Selectores de filtros disponibles             │
│     - Mensaje: "No hay datos seleccionados"         │
└─────────────────────────────────────────────────────┘
```

### Código Relevante

**main.tsx:**
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**App.tsx:**
```typescript
function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
```

**Dashboard (en App.tsx):**
```typescript
function Dashboard() {
  const [scopeParams, setScopeParams] = useState<ScopeParams>({});
  const { data: metrics, isLoading, isError } = useMetrics(scopeParams);
  
  // Render logic...
}
```

### Tiempo Típico
- **Inicial (sin cache)**: ~500-800ms
- **Con cache**: ~200-400ms
- **Con backend lento**: Variable (depende de red)

---

## Flujo de Filtrado Jerárquico

### Descripción
Proceso de filtrado en cascada: Departamento → Profesor → Materia.

### Diagrama de Flujo Completo

```
┌──────────────────────────────────────────────────────────┐
│ Estado Inicial: Dashboard con EmptyState                │
│ - scopeParams = {}                                       │
│ - departamentos cargados en selector                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ PASO 1: Usuario selecciona Departamento "Sistemas"      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ ScopeSelector.handleDepartmentChange("Sistemas")         │
│ - setSelectedDepartment("Sistemas")                      │
│ - setSelectedProfessor(undefined)                        │
│ - setSelectedCourse(undefined)                           │
│ - onScopeChange({                                        │
│     scope: 'department',                                 │
│     value: 'Sistemas'                                    │
│   })                                                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useProfessorsByDepartment("Sistemas") activa             │
│ - enabled: true (hay departamento)                       │
│ - GET /catalog/departments/Sistemas/professors           │
│ - React Query cachea resultado                           │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ Dashboard.setScopeParams actualiza                       │
│ - scopeParams = {                                        │
│     scope: 'department',                                 │
│     value: 'Sistemas'                                    │
│   }                                                      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useMetrics detecta cambio en dependencia                 │
│ - Query key cambia: ['metrics', { scope: 'department',   │
│                                   value: 'Sistemas' }]   │
│ - Cancela request anterior (si existe)                   │
│ - Ejecuta nueva query                                    │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ GET /metrics/department/Sistemas                         │
│ - Backend procesa                                        │
│ - Retorna stats, trends, word_cloud, categories          │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useMetrics transforma datos                              │
│ - Mapea API response → DashboardMetrics                  │
│ - React Query actualiza cache                            │
│ - data, isLoading, isError actualizados                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ Dashboard re-renderiza                                   │
│ - Muestra KPICards con métricas                          │
│ - Muestra gráficos (SentimentPie, TrendChart)            │
│ - Muestra CategoryPies (si hay categorías)               │
│ - Muestra WordCloud                                      │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ ScopeSelector muestra selector de Profesores            │
│ - Lista de profesores del departamento "Sistemas"        │
│ - Usuario puede seleccionar un profesor                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ PASO 2: Usuario selecciona Profesor "Dr. Juan" (id: 5)  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ ScopeSelector.handleProfessorChange(5)                   │
│ - setSelectedProfessor(5)                                │
│ - setSelectedCourse(undefined)                           │
│ - onScopeChange({                                        │
│     scope: 'professor',                                  │
│     value: 5                                             │
│   })                                                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useCoursesByProfessor(5) activa                          │
│ - enabled: true (hay professor_id)                       │
│ - GET /catalog/professors/5/courses                      │
│ - React Query cachea resultado                           │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useMetrics actualiza con nuevo scope                     │
│ - GET /metrics/professor/5                               │
│ - Dashboard muestra métricas del profesor                │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ ScopeSelector muestra selector de Materias              │
│ - Lista de materias del profesor                         │
│ - Usuario puede seleccionar una materia                  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ PASO 3: Usuario selecciona Materia "Programación" (101) │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ ScopeSelector.handleCourseChange(101)                    │
│ - setSelectedCourse(101)                                 │
│ - onScopeChange({                                        │
│     scope: 'course',                                     │
│     value: 101                                           │
│   })                                                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│ useMetrics actualiza con scope de materia                │
│ - GET /metrics/course/101                                │
│ - Dashboard muestra métricas de la materia               │
└──────────────────────────────────────────────────────────┘
```

### Estados del Selector

```typescript
interface ScopeSelectorState {
  selectedDepartment?: string;
  selectedProfessor?: number;
  selectedCourse?: number;
}

// Ejemplo de transiciones:
// Estado 1: { }
// Estado 2: { selectedDepartment: "Sistemas" }
// Estado 3: { selectedDepartment: "Sistemas", selectedProfessor: 5 }
// Estado 4: { selectedDepartment: "Sistemas", selectedProfessor: 5, selectedCourse: 101 }
```

### Reglas de Validación

1. **Departamento** → Habilita selector de Profesores
2. **Profesor seleccionado** → Habilita selector de Materias
3. **Cambio de Departamento** → Resetea Profesor y Materia
4. **Cambio de Profesor** → Resetea Materia

---

## Flujo de Obtención de Métricas

### Descripción
Proceso detallado de cómo se obtienen y procesan las métricas desde la API.

### Diagrama de Secuencia

```
┌──────────┐         ┌─────────────┐         ┌────────────┐         ┌─────────┐
│ Dashboard│         │  useMetrics │         │React Query │         │   API   │
└────┬─────┘         └──────┬──────┘         └─────┬──────┘         └────┬────┘
     │                      │                      │                     │
     │ useMetrics(params)   │                      │                     │
     │─────────────────────>│                      │                     │
     │                      │                      │                     │
     │                      │ useQuery(['metrics', params], fn, config)  │
     │                      │─────────────────────>│                     │
     │                      │                      │                     │
     │                      │                      │ ¿Cache válido?      │
     │                      │                      │──────┐              │
     │                      │                      │      │              │
     │                      │                      │<─────┘              │
     │                      │                      │                     │
     │                      │                      │ No → Ejecutar query │
     │                      │                      │─────────────────────>
     │                      │                      │                     │
     │                      │                      │   GET /metrics/X    │
     │                      │                      │                     │
     │                      │                      │<────────────────────│
     │                      │                      │   Response (JSON)   │
     │                      │                      │                     │
     │                      │<─────────────────────│                     │
     │                      │  raw response        │                     │
     │                      │                      │                     │
     │ Transform data       │                      │                     │
     │<─────────────────────│                      │                     │
     │                      │                      │                     │
     │                      │ Update cache         │                     │
     │                      │─────────────────────>│                     │
     │                      │                      │                     │
     │ { data, isLoading }  │                      │                     │
     │<─────────────────────│                      │                     │
     │                      │                      │                     │
     │ Re-render           │                      │                     │
     │──────┐              │                      │                     │
     │      │              │                      │                     │
     │<─────┘              │                      │                     │
     │                     │                      │                     │
```

### Transformación de Datos

**Backend Response:**
```json
{
  "stats": {
    "total_opinions": 150,
    "average_rating": 4.2,
    "sentiment_distribution": {
      "positive": 100,
      "neutral": 30,
      "negative": 20
    }
  },
  "trends": [
    {
      "date": "2024-01",
      "sentiment_score": 4.1,
      "count": 45
    }
  ],
  "word_cloud": [
    { "text": "excelente", "value": 45 }
  ],
  "categories": {
    "calidad_didactica": { /* ... */ }
  }
}
```

**Frontend Model (después de transformación):**
```typescript
{
  total_comments: 150,
  average_sentiment_score: 4.2,
  sentiment_distribution: [
    { sentiment: 'positive', count: 100 },
    { sentiment: 'neutral', count: 30 },
    { sentiment: 'negative', count: 20 }
  ],
  sentiment_trends: [
    { date: "2024-01", sentiment_score: 4.1, count: 45 }
  ],
  top_words: [
    { text: "excelente", value: 45 }
  ],
  categories: { /* ... */ }
}
```

### Código de Transformación

```typescript
// src/hooks/useMetrics.ts
return useQuery<DashboardMetrics>(
  ['metrics', params],
  async () => {
    const response = await apiClient.get(url);
    const data = response.data;

    return {
      total_comments: data.stats.total_opinions,
      average_sentiment_score: data.stats.average_rating,
      sentiment_distribution: [
        { sentiment: 'positive', count: data.stats.sentiment_distribution.positive },
        { sentiment: 'neutral', count: data.stats.sentiment_distribution.neutral },
        { sentiment: 'negative', count: data.stats.sentiment_distribution.negative },
      ],
      categories: data.categories,
      sentiment_trends: data.trends,
      top_words: data.word_cloud,
    };
  }
);
```

---

## Flujo de Cambio de Tema

### Descripción
Proceso de alternar entre modo oscuro y claro con persistencia.

### Diagrama de Flujo

```
┌──────────────────────────────────────────────────┐
│ Usuario hace click en ThemeToggle                │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│ ThemeToggle.onClick ejecuta                      │
│ - const { toggleTheme } = useTheme()             │
│ - toggleTheme()                                  │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│ ThemeContext.toggleTheme ejecuta                 │
│ - setTheme(prev => prev === 'dark' ? 'light' :   │
│                                      'dark')     │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│ useEffect([theme]) detecta cambio                │
│ 1. const root = document.documentElement         │
│ 2. root.classList.remove('light', 'dark')        │
│ 3. root.classList.add(theme)                     │
│ 4. localStorage.setItem('theme', theme)          │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│ CSS de Tailwind reacciona                        │
│ - Clases .dark:* ahora activas/inactivas         │
│ - Transición CSS suave (transition-colors)       │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│ Toda la UI actualiza con nuevo tema              │
│ - Backgrounds, text, borders, etc.               │
│ - Animación suave de colores                     │
└──────────────────────────────────────────────────┘
```

### Inicialización del Tema

```typescript
// ThemeContext.tsx
const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window !== 'undefined') {
    // 1. Preferencia guardada
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    
    // 2. Preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
  return 'light';
});
```

### Persistencia

- **Guardar**: `localStorage.setItem('theme', theme)`
- **Leer**: `localStorage.getItem('theme')`
- **Duración**: Permanente (hasta que usuario limpie storage)

---

## Flujo de Manejo de Errores

### Descripción
Cómo se manejan y muestran errores de la API.

### Diagrama de Estados

```
┌─────────────────────────────────────────────────────┐
│                   Estado Inicial                    │
│  isLoading: false, isError: false, data: undefined  │
└────────────────────┬────────────────────────────────┘
                     │
                     │ useMetrics ejecuta
                     ▼
┌─────────────────────────────────────────────────────┐
│                  Estado Cargando                    │
│  isLoading: true, isError: false, data: undefined   │
│  ┌────────────────────────────────────────────┐    │
│  │ Muestra: <LoadingSpinner />                 │    │
│  └────────────────────────────────────────────┘    │
└────────┬──────────────────────────────┬─────────────┘
         │                              │
         │ Success                      │ Error
         ▼                              ▼
┌────────────────────┐        ┌──────────────────────────┐
│   Estado Success   │        │     Estado Error         │
│ isLoading: false   │        │ isLoading: false         │
│ isError: false     │        │ isError: true            │
│ data: {...}        │        │ error: Error object      │
│  ┌──────────────┐ │        │  ┌────────────────────┐ │
│  │ Muestra:     │ │        │  │ Muestra:           │ │
│  │ <Dashboard/> │ │        │  │ <ErrorMessage />   │ │
│  └──────────────┘ │        │  │ + Botón reintentar │ │
└────────────────────┘        │  └────────────────────┘ │
                              │                          │
                              │ Usuario click "Reintentar"
                              │         ▼                │
                              │    refetch()             │
                              │         │                │
                              └─────────┴────────────────┘
                                        │
                                        │
                                        ▼
                              Vuelve a Estado Cargando
```

### Tipos de Errores

#### 1. Network Error
```typescript
// Error sin respuesta del servidor
{
  message: "Network Error",
  config: {...},
  code: "ERR_NETWORK"
}
```

**Causas:**
- Backend no está corriendo
- URL incorrecta
- Problemas de red

**Solución mostrada al usuario:**
```
"Error de conexión. Verifica que la API esté funcionando."
```

#### 2. HTTP Error (4xx, 5xx)
```typescript
// Error con respuesta del servidor
{
  message: "Request failed with status code 404",
  response: {
    status: 404,
    data: {...}
  }
}
```

**Causas:**
- Recurso no encontrado (404)
- Error interno del servidor (500)
- Permisos (403)

**Solución mostrada al usuario:**
```
"Error al cargar los datos. Código: 404"
```

### Retry Logic

```typescript
{
  retry: 1,  // Reintentar 1 vez automáticamente
  retryDelay: 1000,  // Esperar 1 segundo
}
```

---

## Flujo de Cache de Datos

### Descripción
Cómo React Query gestiona el cache de datos de la API.

### Ciclo de Vida del Cache

```
┌──────────────────────────────────────────────────────┐
│ 1. Primera Request                                   │
│    Query key: ['metrics', { scope: 'dept', ... }]    │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 2. React Query verifica cache                        │
│    ¿Existe entry para esta key?                      │
│    → No existe                                        │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 3. Ejecuta fetch                                     │
│    GET /metrics/department/Sistemas                  │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 4. Guarda en cache                                   │
│    Cache['metrics', {...}] = {                       │
│      data: {...},                                    │
│      timestamp: now,                                 │
│      staleTime: 5min                                 │
│    }                                                 │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 5. Segunda request (mismo scope)                     │
│    Query key: ['metrics', { scope: 'dept', ... }]    │
│    (mismo key que antes)                             │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 6. React Query verifica cache                        │
│    ¿Existe entry? → Sí                               │
│    ¿Está fresh? (< 5min desde timestamp)             │
│    → Sí, está fresh                                  │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 7. Retorna datos cacheados                           │
│    No hace request HTTP                              │
│    Retorna inmediatamente                            │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 8. Después de 5 minutos                              │
│    Datos se marcan como "stale"                      │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 9. Tercera request (misma key, después de 5min)     │
│    ¿Existe entry? → Sí                               │
│    ¿Está fresh? → No (stale)                         │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│ 10. Retorna datos stale + Background refetch         │
│     UI muestra datos viejos inmediatamente           │
│     En background: nueva request HTTP                │
│     Cuando completa: actualiza cache y UI            │
└──────────────────────────────────────────────────────┘
```

### Configuración de Cache

```typescript
{
  staleTime: 5 * 60 * 1000,    // 5 minutos - Cuándo marcar como stale
  cacheTime: 10 * 60 * 1000,   // 10 minutos - Cuánto mantener en memoria
  refetchOnWindowFocus: false, // No refetch al hacer focus en ventana
}
```

### Invalidación Manual

```typescript
import { useQueryClient } from 'react-query';

const queryClient = useQueryClient();

// Invalidar todas las queries de métricas
queryClient.invalidateQueries(['metrics']);

// Invalidar query específica
queryClient.invalidateQueries(['metrics', specificParams]);
```

---

## Flujo de Renderizado Condicional

### Descripción
Lógica de decisión para qué mostrar en el dashboard según el estado.

### Árbol de Decisión

```
                    ┌──────────────┐
                    │  Dashboard   │
                    └──────┬───────┘
                           │
                           ▼
                    ¿isLoading?
                           │
              ┌────────────┴────────────┐
              │ Sí                      │ No
              ▼                         ▼
      ┌───────────────┐         ¿isError?
      │ LoadingState  │                │
      │ - Spinner     │     ┌──────────┴──────────┐
      │ - Mensaje     │     │ Sí                  │ No
      └───────────────┘     ▼                     ▼
                    ┌───────────────┐      ¿data existe?
                    │  ErrorState   │            │
                    │ - Icono error │  ┌─────────┴─────────┐
                    │ - Mensaje     │  │ No                │ Sí
                    └───────────────┘  ▼                   ▼
                              ┌────────────────┐   ┌────────────────┐
                              │  EmptyState    │   │ DashboardData  │
                              │ - Icono        │   │ - KPICards     │
                              │ - "Selecciona  │   │ - Charts       │
                              │    filtros"    │   │ - WordCloud    │
                              └────────────────┘   └────────────────┘
```

### Código de Implementación

```typescript
function Dashboard() {
  const { data: metrics, isLoading, isError } = useMetrics(scopeParams);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="loader mb-4" />
        <p>Cargando datos del análisis...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="card p-6 bg-danger-50 dark:bg-danger-900/30">
        <h3>Error al cargar los datos</h3>
        <p>Por favor verifica que la API esté funcionando.</p>
      </div>
    );
  }

  // Empty state
  if (!metrics) {
    return (
      <div className="text-center py-16">
        <h3>No hay datos seleccionados</h3>
        <p>Utiliza los filtros para seleccionar un departamento, 
           profesor o materia.</p>
      </div>
    );
  }

  // Success state - Render dashboard
  return (
    <div className="space-y-8">
      <KPICards metrics={metrics} />
      <SentimentPie data={metrics.sentiment_distribution} />
      {/* ... más componentes */}
    </div>
  );
}
```

---

## Resumen de Flujos Críticos

| Flujo | Trigger | Duración Típica | Componentes Involucrados |
|-------|---------|-----------------|-------------------------|
| **Inicialización** | Usuario abre app | 500-800ms | main, App, ThemeProvider, Dashboard |
| **Filtrado Jerárquico** | Usuario selecciona filtro | 200-500ms por nivel | ScopeSelector, hooks de catálogo |
| **Obtención Métricas** | Cambio de scopeParams | 300-1000ms | useMetrics, React Query, apiClient |
| **Cambio de Tema** | Click en ThemeToggle | <100ms | ThemeContext, CSS |
| **Manejo de Errores** | Request falla | Inmediato | useMetrics, Dashboard |
| **Cache** | Request repetido | <10ms (instantáneo) | React Query |
| **Renderizado Condicional** | Cambio de estado | <50ms | Dashboard |

---

**Última actualización:** Noviembre 2024
