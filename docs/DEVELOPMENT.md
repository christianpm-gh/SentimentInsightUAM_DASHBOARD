# Guía de Desarrollo

## Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Comandos Comunes](#comandos-comunes)
- [Desarrollo Local](#desarrollo-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Convenciones de Código](#convenciones-de-código)
- [Workflows de Desarrollo](#workflows-de-desarrollo)
- [Debugging](#debugging)
- [Testing](#testing)
- [Build y Deployment](#build-y-deployment)
- [Solución de Problemas](#solución-de-problemas)

---

## Configuración Inicial

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** 16.x o superior ([Descargar](https://nodejs.org/))
- **npm** 7.x o superior (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- Editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Verificar Instalación

```bash
node --version   # Debe mostrar v16.x o superior
npm --version    # Debe mostrar v7.x o superior
git --version    # Debe mostrar la versión de Git
```

### Clonar el Repositorio

```bash
# Clonar
git clone https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD.git
cd SentimentInsightUAM_DASHBOARD

# O si ya tienes un fork
git clone https://github.com/TU_USUARIO/SentimentInsightUAM_DASHBOARD.git
cd SentimentInsightUAM_DASHBOARD
```

### Instalar Dependencias

```bash
# Instalar con legacy peer deps (necesario por react-wordcloud)
npm install --legacy-peer-deps
```

**Nota:** El flag `--legacy-peer-deps` es necesario debido a que `react-wordcloud` requiere React 16, pero usamos React 18. La librería funciona correctamente a pesar de la incompatibilidad.

### Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tu editor
nano .env  # o code .env
```

**Contenido de `.env`:**
```bash
# URL del backend API
VITE_API_BASE_URL=http://localhost:8001
```

**Nota:** Las variables de Vite deben tener prefijo `VITE_` para ser expuestas al cliente.

### Verificar Setup

```bash
# Ejecutar linter
npm run lint

# Compilar TypeScript y construir
npm run build

# Si todo está bien, iniciar dev server
npm run dev
```

---

## Comandos Comunes

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:5173 (puerto por defecto de Vite)

# Iniciar con puerto específico
npm run dev -- --port 3000

# Iniciar con host expuesto en red local
npm run dev -- --host
```

### Linting

```bash
# Ejecutar ESLint
npm run lint

# Ejecutar con autofix
npm run lint -- --fix
```

**Nota:** El proyecto tiene algunas advertencias de linter conocidas (uso de `any` en componentes de gráficos). Estas se pueden ignorar por ahora pero deberían corregirse en el futuro.

### Building

```bash
# Build para producción
npm run build

# Resultado en ./dist/

# Preview del build
npm run preview
# Abre http://localhost:4173
```

### Limpieza

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Limpiar cache de Vite
rm -rf node_modules/.vite

# Limpiar build
rm -rf dist
```

---

## Desarrollo Local

### Flujo Típico de Desarrollo

1. **Iniciar Backend API**

Primero debes tener corriendo el backend SentimentInsightUAM:

```bash
# En directorio del backend
cd ../SentimentInsightUAM
uvicorn app.main:app --reload --port 8001
```

2. **Iniciar Frontend**

```bash
# En este directorio
npm run dev
```

3. **Abrir en navegador**

Navega a `http://localhost:5173`

### Hot Module Replacement (HMR)

Vite tiene HMR habilitado por defecto. Los cambios se reflejan instantáneamente:

- **JavaScript/TypeScript**: Recarga solo el módulo modificado
- **CSS/Tailwind**: Actualización sin recarga completa
- **Components React**: Preserva estado si es posible

### DevTools Recomendadas

#### React Developer Tools

Extensión de navegador para inspeccionar componentes React:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Uso:**
- Ver árbol de componentes
- Inspeccionar props y estado
- Profiler para rendimiento

#### React Query DevTools

Ya incluido en desarrollo (automático):

```typescript
// Se abre automáticamente con toggle en esquina inferior
import { ReactQueryDevtools } from 'react-query/devtools'
```

**Funcionalidades:**
- Ver queries activas
- Estado de cache
- Invalidar queries manualmente
- Ver configuración

---

## Estructura del Proyecto

### Organización de Archivos

```
src/
├── api/                    # Capa de acceso a datos
│   └── client.ts          # Cliente Axios configurado
│
├── components/             # Componentes de UI
│   ├── KPICards.tsx       # Tarjetas de métricas
│   ├── ScopeSelector.tsx  # Selector de filtros
│   ├── SentimentPie.tsx   # Gráfico circular
│   ├── CategoryPies.tsx   # Gráficos de categorías
│   ├── TrendChart.tsx     # Gráfico de tendencias
│   ├── WordCloudComp.tsx  # Nube de palabras
│   └── ThemeToggle.tsx    # Toggle de tema
│
├── context/                # Contextos de React
│   └── ThemeContext.tsx   # Tema light/dark
│
├── hooks/                  # Custom hooks
│   ├── useMetrics.ts      # Fetching de métricas
│   └── useCatalog.ts      # Fetching de catálogos
│
├── styles/                 # Estilos globales
│   └── index.css          # Tailwind + custom CSS
│
├── types.ts                # Definiciones TypeScript
├── App.tsx                 # Componente raíz
├── main.tsx                # Entry point
└── vite-env.d.ts           # Tipos de Vite
```

### Cuándo Crear Nuevos Archivos

**Nuevo Componente:**
```bash
# Si es reutilizable y de UI
src/components/NuevoComponente.tsx

# Si es específico de una página
# (actualmente no tenemos páginas separadas)
```

**Nuevo Hook:**
```bash
# Si encapsula lógica reutilizable
src/hooks/useNombreHook.ts

# Siempre con prefijo "use"
```

**Nuevo Tipo:**
```typescript
// Agregar a src/types.ts
export interface NuevoTipo {
  // ...
}
```

**Nueva Utilidad:**
```bash
# Si necesitas funciones helper
src/utils/nombreUtil.ts
```

---

## Convenciones de Código

### TypeScript

#### Definir Props de Componentes

```typescript
// ✅ Bien - Interface explícita
interface SentimentPieProps {
  data: SentimentCount[];
  title?: string;
}

export default function SentimentPie({ data, title }: SentimentPieProps) {
  // ...
}

// ❌ Mal - Sin tipado
export default function SentimentPie(props) {
  // ...
}
```

#### Evitar `any`

```typescript
// ❌ Mal
function process(data: any) { }

// ✅ Bien - Tipo genérico
function process<T>(data: T) { }

// ✅ Bien - Tipo específico
function process(data: DashboardMetrics) { }

// ✅ Bien - Unknown si no sabes el tipo
function process(data: unknown) {
  // Validar tipo antes de usar
}
```

#### Interfaces vs Types

**Prefer interfaces** para objetos y props:
```typescript
// ✅ Interfaces
interface User {
  id: number;
  name: string;
}

// ✅ Types para uniones y alias
type Theme = 'light' | 'dark';
type ScopeType = 'department' | 'professor' | 'course';
```

### React

#### Componentes Funcionales

```typescript
// ✅ Bien - Función con nombre
export default function ComponentName() {
  return <div>...</div>;
}

// ❌ Mal - Arrow function sin nombre
export default () => {
  return <div>...</div>;
}
```

#### Hooks

```typescript
// ✅ Bien - Orden consistente
function Component() {
  // 1. useState
  const [state, setState] = useState();
  
  // 2. useContext
  const context = useContext(MyContext);
  
  // 3. Custom hooks
  const data = useMetrics();
  
  // 4. useEffect
  useEffect(() => {}, []);
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>...</div>;
}
```

#### Conditional Rendering

```typescript
// ✅ Bien - Boolean y &&
{isLoading && <Spinner />}

// ✅ Bien - Ternario
{data ? <Chart data={data} /> : <Empty />}

// ❌ Mal - Números y &&
{items.length && <List />}  // Muestra 0 si length es 0

// ✅ Bien - Comparación explícita
{items.length > 0 && <List />}
```

### Tailwind CSS

#### Orden de Clases

```typescript
// Seguir orden lógico: layout → spacing → typography → visual → effects
className="
  flex items-center justify-between     // Layout
  px-4 py-2 gap-4                       // Spacing
  text-sm font-bold                     // Typography
  bg-white text-dark-900                // Visual
  rounded-lg shadow-md                  // Effects
  dark:bg-dark-900 dark:text-white      // Variants
  hover:shadow-lg transition-shadow     // Interactions
"
```

#### Responsive Design

```typescript
// Mobile-first
className="
  text-sm           // Base (mobile)
  sm:text-base      // Small screens
  md:text-lg        // Medium
  lg:text-xl        // Large
  xl:text-2xl       // Extra large
"
```

#### Dark Mode

```typescript
// Siempre incluir variante dark:
className="
  bg-white dark:bg-dark-900
  text-dark-900 dark:text-white
  border-dark-200 dark:border-dark-700
"
```

### Naming Conventions

```typescript
// Componentes: PascalCase
SentimentPie.tsx
KPICards.tsx

// Hooks: camelCase con 'use'
useMetrics.ts
useCatalog.ts

// Utilidades: camelCase
apiClient.ts
formatDate.ts

// Tipos: PascalCase
interface DashboardMetrics {}
type ScopeType = ...

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = ...
const MAX_RETRIES = 3

// Variables: camelCase
const userName = 'John'
const isLoading = false
```

---

## Workflows de Desarrollo

### Añadir un Nuevo Componente

1. **Crear archivo del componente:**

```bash
touch src/components/NewComponent.tsx
```

2. **Definir el componente:**

```typescript
// src/components/NewComponent.tsx
interface NewComponentProps {
  data: SomeType;
  onAction?: () => void;
}

export default function NewComponent({ data, onAction }: NewComponentProps) {
  return (
    <div className="p-4 bg-white dark:bg-dark-900 rounded-lg">
      {/* Implementación */}
    </div>
  );
}
```

3. **Importar y usar:**

```typescript
// src/App.tsx o componente padre
import NewComponent from './components/NewComponent';

function Parent() {
  return <NewComponent data={someData} />;
}
```

### Añadir un Nuevo Hook

1. **Crear archivo del hook:**

```bash
touch src/hooks/useNewHook.ts
```

2. **Implementar el hook:**

```typescript
// src/hooks/useNewHook.ts
import { useQuery } from 'react-query';
import apiClient from '../api/client';
import { DataType } from '../types';

export const useNewHook = (param: string) => {
  return useQuery<DataType>(
    ['hookKey', param],
    async () => {
      const response = await apiClient.get(`/endpoint/${param}`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
```

3. **Usar el hook:**

```typescript
// En un componente
const { data, isLoading, isError } = useNewHook(someParam);
```

### Añadir Nuevos Tipos

```typescript
// src/types.ts
export interface NewType {
  id: number;
  name: string;
  // ...
}

// Exportar para usar en otros archivos
```

### Integrar Nuevo Endpoint de API

1. **Definir tipos de respuesta:**

```typescript
// src/types.ts
export interface ApiResponse {
  data: SomeData;
  meta: MetaInfo;
}
```

2. **Crear hook para el endpoint:**

```typescript
// src/hooks/useApiData.ts
export const useApiData = () => {
  return useQuery<ApiResponse>(
    ['apiData'],
    async () => {
      const response = await apiClient.get('/new-endpoint');
      return response.data;
    }
  );
};
```

3. **Usar en componente:**

```typescript
const { data, isLoading } = useApiData();
```

---

## Debugging

### Console Logging

```typescript
// Desarrollo
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// O usar console.debug (se elimina en producción)
console.debug('Component rendered with:', props);
```

### React DevTools

1. Abrir DevTools del navegador
2. Tab "⚛️ Components"
3. Seleccionar componente
4. Ver props, state, hooks

**Shortcuts:**
- `Ctrl/Cmd + F`: Buscar componente
- Click derecho: "Log to console"

### React Query DevTools

```typescript
// Ver en esquina inferior derecha (solo en dev)
// Click en el ícono de React Query

// Ver queries activas, cache, timing
```

### Network Inspector

```bash
# Ver requests a la API
1. DevTools → Network
2. Filtrar por "Fetch/XHR"
3. Ver requests, responses, headers
```

### Breakpoints

#### En VS Code:

1. Click en margen izquierdo (aparece punto rojo)
2. F5 para iniciar debugging
3. Usa configuración de launch.json para Chrome

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

#### En DevTools:

1. DevTools → Sources
2. Encuentra archivo en árbol
3. Click en número de línea

### Error Boundaries

Actualmente no implementados, pero para añadir:

```typescript
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

---

## Testing

### Estado Actual

Actualmente el proyecto **no tiene tests configurados**. Esta sección describe cómo añadirlos.

### Setup de Testing (Futuro)

```bash
# Instalar dependencias
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Configurar vitest.config.ts
```

### Ejemplo de Test

```typescript
// src/components/__tests__/KPICards.test.tsx
import { render, screen } from '@testing-library/react';
import KPICards from '../KPICards';

describe('KPICards', () => {
  it('renders total comments', () => {
    const metrics = {
      total_comments: 100,
      // ... otros campos
    };
    
    render(<KPICards metrics={metrics} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
```

---

## Build y Deployment

### Build Local

```bash
# Build de producción
npm run build

# Resultado en ./dist/
# - index.html
# - assets/
#   - index.[hash].js
#   - index.[hash].css
```

### Preview del Build

```bash
# Servir build localmente
npm run preview

# Abre http://localhost:4173
```

### Análisis del Bundle

```bash
# Ver tamaño del bundle
npm run build

# Vite muestra:
# - Tamaño total
# - Tamaño gzipped
# - Advertencias si chunks > 500kB
```

### Optimizaciones de Build

#### 1. Code Splitting

Vite hace code splitting automático. Para lazy loading manual:

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

#### 2. Tree Shaking

Automático en producción. Asegúrate de:
- Usar imports nombrados cuando sea posible
- No importar librerías completas

```typescript
// ❌ Mal
import _ from 'lodash';

// ✅ Bien
import debounce from 'lodash/debounce';
```

### Deployment

#### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

**Configuración automática:** Vercel detecta Vite automáticamente.

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Deploy
netlify deploy --prod
```

#### GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Añadir script a package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Configurar base en vite.config.ts
export default defineConfig({
  base: '/SentimentInsightUAM_DASHBOARD/',
  // ...
})

# Deploy
npm run deploy
```

#### Servidor Custom (nginx)

```nginx
# /etc/nginx/sites-available/dashboard
server {
  listen 80;
  server_name dashboard.example.com;
  root /var/www/dashboard/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## Solución de Problemas

### Problema: npm install falla

**Síntoma:**
```
Error: Could not resolve dependency
peer react@"^16.13.0" from react-wordcloud
```

**Solución:**
```bash
npm install --legacy-peer-deps
```

### Problema: Vite no inicia

**Síntoma:**
```
Error: Cannot find module 'vite'
```

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Problema: TypeScript errors en build

**Síntoma:**
```
error TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'
```

**Solución:**
```bash
# Verificar tipos
npm run build

# Ver errores específicos
npx tsc --noEmit
```

### Problema: API no responde

**Síntoma:**
```
Error: Network Error
```

**Checklist:**
1. ✅ Backend está corriendo?
   ```bash
   curl http://localhost:8001/health
   ```

2. ✅ URL correcta en .env?
   ```bash
   cat .env
   # VITE_API_BASE_URL=http://localhost:8001
   ```

3. ✅ CORS configurado en backend?

4. ✅ Reiniciar dev server después de cambiar .env
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

### Problema: Estilos no se aplican

**Síntoma:** Componente renderiza pero sin estilos.

**Checklist:**
1. ✅ Tailwind importado en src/styles/index.css?
2. ✅ index.css importado en main.tsx?
3. ✅ Clases escritas correctamente?
4. ✅ Purge no está eliminando clases dinámicas?

**Solución para clases dinámicas:**
```typescript
// ❌ Mal - Tailwind no detecta
className={`text-${color}-500`}

// ✅ Bien - Clase completa
className={color === 'blue' ? 'text-blue-500' : 'text-red-500'}
```

### Problema: HMR no funciona

**Síntoma:** Cambios en código no se reflejan en navegador.

**Solución:**
```bash
# Limpiar cache de Vite
rm -rf node_modules/.vite

# Reiniciar dev server
npm run dev
```

### Problema: React Query no actualiza

**Síntoma:** Datos viejos mostrados después de cambio.

**Solución:**
```typescript
// Invalidar cache manualmente
import { useQueryClient } from 'react-query';

const queryClient = useQueryClient();
queryClient.invalidateQueries(['metrics']);
```

### Problema: Out of Memory durante build

**Síntoma:**
```
FATAL ERROR: Reached heap limit
```

**Solución:**
```bash
# Aumentar memoria de Node
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Logs de Debugging

```bash
# Ver logs detallados de Vite
npm run dev -- --debug

# Ver logs de npm
npm run build --verbose
```

---

## Recursos Adicionales

### Documentación Oficial
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/v3/docs)

### Herramientas Útiles
- [Can I Use](https://caniuse.com/) - Compatibilidad de navegadores
- [Bundlephobia](https://bundlephobia.com/) - Tamaño de paquetes npm
- [TypeScript Playground](https://www.typescriptlang.org/play) - Probar TypeScript
- [Tailwind Play](https://play.tailwindcss.com/) - Probar Tailwind

### VS Code Extensions Recomendadas

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

**Happy Coding! 🚀**
