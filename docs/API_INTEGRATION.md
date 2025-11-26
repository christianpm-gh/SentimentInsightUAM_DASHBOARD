# Integración con la API

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Configuración](#configuración)
- [Cliente API (Axios)](#cliente-api-axios)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Hooks de React Query](#hooks-de-react-query)
- [Flujos de Datos](#flujos-de-datos)
- [Manejo de Errores](#manejo-de-errores)
- [Caché y Optimización](#caché-y-optimización)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## Visión General

El dashboard consume la API REST del backend **SentimentInsightUAM**, que proporciona:

- **Métricas de Sentimientos**: Análisis de opiniones estudiantiles
- **Catálogos**: Departamentos, profesores, y materias
- **Tendencias**: Evolución temporal de sentimientos
- **Categorías**: Análisis por calidad didáctica, empatía, y método de evaluación

### Diagrama de Integración

```
┌──────────────────────────────────────────────────┐
│           Frontend Dashboard                     │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │  React Query (Cache + Estado)              │ │
│  └──────────────────┬─────────────────────────┘ │
│                     │                            │
│  ┌──────────────────▼─────────────────────────┐ │
│  │  Axios Client (HTTP)                       │ │
│  └──────────────────┬─────────────────────────┘ │
└───────────────────┬─┴──────────────────────────┘
                    │ REST API
                    │ (JSON over HTTP)
┌───────────────────▼──────────────────────────────┐
│           Backend API                            │
│        (SentimentInsightUAM)                     │
│                                                  │
│  FastAPI + PostgreSQL                           │
│  - /metrics/*                                   │
│  - /catalog/*                                   │
└──────────────────────────────────────────────────┘
```

---

## Configuración

### Variables de Entorno

La URL base de la API se configura mediante variables de entorno de Vite:

```bash
# .env
VITE_API_BASE_URL=http://localhost:8001
```

**Notas:**
- El prefijo `VITE_` es obligatorio para que Vite exponga la variable al cliente
- Cambiar esta variable requiere reiniciar el dev server
- En producción, configurar según el dominio del backend

### Diferentes Entornos

```bash
# Desarrollo local
VITE_API_BASE_URL=http://localhost:8001

# Staging
VITE_API_BASE_URL=https://api-staging.sentimentinsight.uam

# Producción
VITE_API_BASE_URL=https://api.sentimentinsight.uam
```

---

## Cliente API (Axios)

### Configuración

**Ubicación:** `src/api/client.ts`

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

### Interceptors (Futura Extensión)

Para añadir autenticación, logging, o manejo de errores global:

```typescript
// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Añadir token de autenticación
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

---

## Endpoints Disponibles

### 1. Métricas

#### GET `/metrics/department/{department_name}`

Obtiene métricas para un departamento específico.

**Parámetros:**
- `department_name` (string, path): Nombre del departamento

**Respuesta:**
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
    {
      "text": "excelente",
      "value": 45
    }
  ],
  "categories": {
    "calidad_didactica": {
      "category_name": "calidad_didactica",
      "category_label": "Calidad Didáctica",
      "positive": 80,
      "neutral": 20,
      "negative": 10,
      "not_analyzed": 40,
      "total": 150
    },
    "empatia": { /* ... */ },
    "metodo_evaluacion": { /* ... */ }
  }
}
```

#### GET `/metrics/professor/{professor_id}`

Obtiene métricas para un profesor específico.

**Parámetros:**
- `professor_id` (number, path): ID del profesor

**Respuesta:** Mismo formato que `/metrics/department`

#### GET `/metrics/course/{course_id}`

Obtiene métricas para una materia específica.

**Parámetros:**
- `course_id` (number, path): ID de la materia

**Respuesta:** Mismo formato que `/metrics/department`

### 2. Catálogos

#### GET `/catalog/departments`

Lista todos los departamentos disponibles.

**Respuesta:**
```json
[
  {
    "name": "Ciencias Básicas",
    "professor_count": 25
  },
  {
    "name": "Sistemas",
    "professor_count": 18
  }
]
```

#### GET `/catalog/departments/{department_name}/professors`

Lista profesores de un departamento.

**Parámetros:**
- `department_name` (string, path): Nombre del departamento

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Dr. Juan Pérez",
    "department": "Ciencias Básicas"
  },
  {
    "id": 2,
    "name": "Dra. María García",
    "department": "Ciencias Básicas"
  }
]
```

#### GET `/catalog/professors/{professor_id}/courses`

Lista materias impartidas por un profesor.

**Parámetros:**
- `professor_id` (number, path): ID del profesor

**Respuesta:**
```json
[
  {
    "id": 101,
    "name": "Cálculo Diferencial",
    "department": "Ciencias Básicas"
  },
  {
    "id": 102,
    "name": "Álgebra Lineal",
    "department": "Ciencias Básicas"
  }
]
```

#### GET `/catalog/hierarchy`

Obtiene la jerarquía completa de departamentos con sus profesores.

**Respuesta:**
```json
{
  "departments": [
    {
      "name": "Ciencias Básicas",
      "professors": [
        {
          "id": 1,
          "name": "Dr. Juan Pérez",
          "department": "Ciencias Básicas"
        }
      ]
    }
  ]
}
```

---

## Hooks de React Query

### useMetrics

**Ubicación:** `src/hooks/useMetrics.ts`

**Propósito:** Obtener métricas según el alcance seleccionado.

**Firma:**
```typescript
export const useMetrics = (params: ScopeParams = {}) => 
  UseQueryResult<DashboardMetrics>
```

**Parámetros:**
```typescript
interface ScopeParams {
  scope?: 'department' | 'professor' | 'course';
  value?: string | number;
  department?: string;
  professor_id?: number;
}
```

**Uso:**
```typescript
const { data, isLoading, isError } = useMetrics({
  scope: 'department',
  value: 'Ciencias Básicas'
});
```

**Transformación de Datos:**

El hook transforma la respuesta de la API al formato interno:

```typescript
// API Response → Frontend Model
{
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
}
```

**Configuración de Cache:**
```typescript
{
  staleTime: 5 * 60 * 1000,      // 5 minutos
  refetchOnWindowFocus: false,   // No refetch al hacer focus
}
```

### useDepartments

**Ubicación:** `src/hooks/useCatalog.ts`

**Propósito:** Obtener lista de departamentos.

**Uso:**
```typescript
const { data: departments, isLoading } = useDepartments();

// departments es DepartmentItem[]
```

### useProfessorsByDepartment

**Ubicación:** `src/hooks/useCatalog.ts`

**Propósito:** Obtener profesores de un departamento.

**Uso:**
```typescript
const { data: professors } = useProfessorsByDepartment('Ciencias Básicas');

// professors es ProfessorItem[]
```

**Nota:** Solo hace request si `departmentName` es provisto (`enabled: !!departmentName`).

### useCoursesByProfessor

**Ubicación:** `src/hooks/useCatalog.ts`

**Propósito:** Obtener materias de un profesor.

**Uso:**
```typescript
const { data: courses } = useCoursesByProfessor(professorId);

// courses es CourseItem[]
```

**Nota:** Solo hace request si `professorId` es provisto.

### useHierarchy

**Ubicación:** `src/hooks/useCatalog.ts`

**Propósito:** Obtener jerarquía completa (menos usado actualmente).

**Uso:**
```typescript
const { data: hierarchy } = useHierarchy();

// hierarchy es HierarchyData
```

---

## Flujos de Datos

### Flujo 1: Selección de Departamento

```
Usuario selecciona "Ciencias Básicas"
         ↓
ScopeSelector.onChange({
  scope: 'department',
  value: 'Ciencias Básicas'
})
         ↓
App actualiza scopeParams
         ↓
useMetrics detecta cambio en dependency
         ↓
React Query ejecuta query function
         ↓
GET /metrics/department/Ciencias%20Básicas
         ↓
Backend procesa y responde
         ↓
Hook transforma datos
         ↓
React Query actualiza cache
         ↓
Componentes se re-renderizan con nuevos datos
```

### Flujo 2: Filtrado Jerárquico

```
Paso 1: Carga inicial
  useDepartments() → GET /catalog/departments
  Usuario ve lista de departamentos
  
Paso 2: Usuario selecciona "Sistemas"
  useProfessorsByDepartment("Sistemas")
  → GET /catalog/departments/Sistemas/professors
  Usuario ve lista de profesores de Sistemas
  
Paso 3: Usuario selecciona "Dr. Juan Pérez" (id: 5)
  useCoursesByProfessor(5)
  → GET /catalog/professors/5/courses
  Usuario ve lista de materias del profesor
  
Paso 4: Usuario selecciona "Programación" (id: 101)
  useMetrics({ scope: 'course', value: 101 })
  → GET /metrics/course/101
  Dashboard muestra métricas de la materia
```

### Flujo 3: Cambio entre Alcances

```
Estado Actual: Viendo departamento "Sistemas"
         ↓
Usuario cambia a profesor "Dr. Juan Pérez" (id: 5)
         ↓
scopeParams cambia:
  { scope: 'department', value: 'Sistemas' }
  →
  { scope: 'professor', value: 5 }
         ↓
useMetrics detecta cambio
         ↓
React Query cancela request anterior (si pendiente)
         ↓
Nueva request: GET /metrics/professor/5
         ↓
Dashboard actualiza con datos del profesor
```

---

## Manejo de Errores

### Estados de Error en Hooks

```typescript
const { data, isLoading, isError, error } = useMetrics(params);

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <ErrorMessage error={error} />;
}

return <Dashboard data={data} />;
```

### Tipos de Errores

#### 1. Network Error

```
Error: Network Error
Causa: Backend no disponible / URL incorrecta / CORS
```

**Solución:**
- Verificar que backend esté corriendo
- Verificar `VITE_API_BASE_URL`
- Verificar configuración CORS en backend

#### 2. 404 Not Found

```
Error: Request failed with status code 404
Causa: Endpoint no existe / Parámetro inválido
```

**Solución:**
- Verificar URL del endpoint
- Verificar que el recurso existe en backend

#### 3. 500 Internal Server Error

```
Error: Request failed with status code 500
Causa: Error en backend
```

**Solución:**
- Revisar logs del backend
- Reportar bug si es un error del backend

### Retry Logic

React Query reintenta automáticamente:

```typescript
{
  retry: 1,  // Reintentar 1 vez en caso de error
}
```

Para deshabilitar:
```typescript
{
  retry: false,
}
```

### Error Boundaries (Futuro)

Para capturar errores de componentes:

```typescript
<ErrorBoundary fallback={<ErrorScreen />}>
  <Dashboard />
</ErrorBoundary>
```

---

## Caché y Optimización

### Estrategia de Caché

React Query cachea datos automáticamente:

```typescript
{
  staleTime: 5 * 60 * 1000,     // 5 min - Datos considerados frescos
  cacheTime: 10 * 60 * 1000,    // 10 min - Mantener en memoria
  refetchOnWindowFocus: false,  // No refetch al cambiar de tab
}
```

### Query Keys

Las queries se identifican por keys únicas:

```typescript
// Diferentes keys = diferentes cache entries
['metrics', { scope: 'department', value: 'Sistemas' }]
['metrics', { scope: 'professor', value: 5 }]
['departments']
['professors-by-department', 'Sistemas']
```

### Invalidación de Cache

Para forzar refetch:

```typescript
import { useQueryClient } from 'react-query';

const queryClient = useQueryClient();

// Invalidar todas las queries de métricas
queryClient.invalidateQueries(['metrics']);

// Invalidar query específica
queryClient.invalidateQueries(['metrics', specificParams]);
```

### Prefetching (Futuro)

Para mejorar UX, prefetch de datos anticipados:

```typescript
// Al seleccionar departamento, prefetch profesores
const queryClient = useQueryClient();

const handleDepartmentSelect = (dept: string) => {
  queryClient.prefetchQuery(
    ['professors-by-department', dept],
    () => apiClient.get(`/catalog/departments/${dept}/professors`)
  );
};
```

### Optimistic Updates (Futuro)

Si se añaden mutaciones (crear, actualizar, eliminar):

```typescript
const mutation = useMutation(
  (newData) => apiClient.post('/endpoint', newData),
  {
    onMutate: async (newData) => {
      // Cancelar refetch en progreso
      await queryClient.cancelQueries(['data']);
      
      // Guardar snapshot del cache anterior
      const previous = queryClient.getQueryData(['data']);
      
      // Actualizar optimísticamente
      queryClient.setQueryData(['data'], (old) => [...old, newData]);
      
      return { previous };
    },
    onError: (err, newData, context) => {
      // Revertir en caso de error
      queryClient.setQueryData(['data'], context.previous);
    },
    onSettled: () => {
      // Refetch para sincronizar
      queryClient.invalidateQueries(['data']);
    },
  }
);
```

---

## Ejemplos de Uso

### Ejemplo 1: Componente con Métricas

```typescript
import { useMetrics } from '../hooks/useMetrics';
import { ScopeParams } from '../types';

function MetricsDashboard() {
  const [scopeParams, setScopeParams] = useState<ScopeParams>({
    scope: 'department',
    value: 'Sistemas'
  });
  
  const { data, isLoading, isError } = useMetrics(scopeParams);
  
  if (isLoading) {
    return <div>Cargando métricas...</div>;
  }
  
  if (isError) {
    return <div>Error al cargar métricas</div>;
  }
  
  if (!data) {
    return <div>No hay datos disponibles</div>;
  }
  
  return (
    <div>
      <h2>Total Opiniones: {data.total_comments}</h2>
      <p>Rating Promedio: {data.average_sentiment_score.toFixed(2)}</p>
      {/* Más visualizaciones */}
    </div>
  );
}
```

### Ejemplo 2: Selector Jerárquico

```typescript
import { useDepartments, useProfessorsByDepartment } from '../hooks/useCatalog';

function HierarchicalSelector() {
  const [selectedDept, setSelectedDept] = useState<string>();
  const [selectedProf, setSelectedProf] = useState<number>();
  
  const { data: departments } = useDepartments();
  const { data: professors } = useProfessorsByDepartment(selectedDept);
  
  return (
    <div>
      <select onChange={(e) => setSelectedDept(e.target.value)}>
        <option value="">Selecciona Departamento</option>
        {departments?.map(dept => (
          <option key={dept.name} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
      
      {selectedDept && (
        <select onChange={(e) => setSelectedProf(Number(e.target.value))}>
          <option value="">Selecciona Profesor</option>
          {professors?.map(prof => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
```

### Ejemplo 3: Manejo de Estados

```typescript
function DataComponent() {
  const { data, isLoading, isError, error, refetch } = useMetrics(params);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader" />
        <p>Cargando datos...</p>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error al cargar datos</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }
  
  // Empty state
  if (!data || data.total_comments === 0) {
    return (
      <div className="empty-state">
        <p>No hay datos disponibles</p>
      </div>
    );
  }
  
  // Success state
  return <DataVisualization data={data} />;
}
```

### Ejemplo 4: Request Directo con Axios

```typescript
import apiClient from '../api/client';

async function fetchCustomData() {
  try {
    const response = await apiClient.get('/custom-endpoint', {
      params: { filter: 'value' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

---

## Testing de Integración (Futuro)

### Mock de API Calls

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:8001/metrics/department/:dept', (req, res, ctx) => {
    return res(
      ctx.json({
        stats: {
          total_opinions: 100,
          average_rating: 4.5,
          sentiment_distribution: {
            positive: 70,
            neutral: 20,
            negative: 10
          }
        },
        trends: [],
        word_cloud: [],
        categories: {}
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Test de Hook

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useMetrics } from '../useMetrics';

test('useMetrics returns data', async () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  
  const { result } = renderHook(
    () => useMetrics({ scope: 'department', value: 'Sistemas' }),
    { wrapper }
  );
  
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  expect(result.current.data.total_comments).toBeGreaterThan(0);
});
```

---

## Troubleshooting

### Problema: CORS Error

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solución:**

Backend debe incluir headers CORS:

```python
# FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL - específico para desarrollo
    # Para producción, usar dominio específico:
    # allow_origins=["https://dashboard.example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos específicos
    allow_headers=["Content-Type", "Authorization"],  # Headers específicos
)
```

**Nota de Seguridad:** En producción, evita usar wildcards (`*`) en `allow_origins`, `allow_methods`, o `allow_headers`. Especifica solo los orígenes, métodos y headers necesarios.

### Problema: Cache No Actualiza

**Solución:**

```typescript
// Forzar refetch
const { refetch } = useMetrics(params);
refetch();

// O invalidar cache
queryClient.invalidateQueries(['metrics']);
```

### Problema: Request Lenta

**Diagnóstico:**

1. Abrir DevTools → Network
2. Ver timing del request
3. Identificar si es:
   - Backend lento (TTFB alto)
   - Respuesta grande (Download time alto)
   - Network lento

**Solución:**
- Optimizar backend
- Añadir paginación
- Comprimir respuesta (gzip)

---

**Última actualización:** Noviembre 2024
