# Guía de Contribución

¡Gracias por tu interés en contribuir a SentimentInsight UAM Dashboard! Este documento proporciona directrices para contribuir al proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reporte de Bugs](#reporte-de-bugs)
- [Solicitud de Funcionalidades](#solicitud-de-funcionalidades)

## Código de Conducta

Este proyecto está comprometido con mantener un ambiente inclusivo y acogedor. Se espera que todos los participantes:

- Sean respetuosos y considerados con los demás
- Acepten críticas constructivas
- Se enfoquen en lo mejor para la comunidad
- Muestren empatía hacia otros miembros

## ¿Cómo Contribuir?

### Tipos de Contribuciones

Aceptamos varios tipos de contribuciones:

1. **Corrección de Bugs**: Reporta o corrige errores
2. **Nuevas Funcionalidades**: Propón o implementa nuevas características
3. **Documentación**: Mejora o amplía la documentación
4. **Optimizaciones**: Mejora el rendimiento o la calidad del código
5. **Tests**: Añade o mejora pruebas
6. **Diseño**: Mejora la interfaz de usuario o experiencia

## Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js 16.x o superior
- npm o yarn
- Git
- Editor de código (recomendado: VS Code)

### Instalación

1. Haz fork del repositorio

2. Clona tu fork:
```bash
git clone https://github.com/TU_USUARIO/SentimentInsightUAM_DASHBOARD.git
cd SentimentInsightUAM_DASHBOARD
```

3. Añade el repositorio original como upstream:
```bash
git remote add upstream https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD.git
```

4. Instala las dependencias:
```bash
npm install --legacy-peer-deps
```

5. Copia el archivo de configuración:
```bash
cp .env.example .env
```

6. Configura la URL de la API en `.env`:
```
VITE_API_BASE_URL=http://localhost:8001
```

### Verificación de la Instalación

```bash
# Ejecuta el linter
npm run lint

# Compila el proyecto
npm run build

# Inicia el servidor de desarrollo
npm run dev
```

## Proceso de Desarrollo

### 1. Crea una rama para tu trabajo

```bash
# Actualiza tu repositorio local
git checkout main
git pull upstream main

# Crea una nueva rama
git checkout -b tipo/descripcion-breve
```

**Tipos de ramas:**
- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bug
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `style/` - Cambios de estilo (formato, etc.)
- `test/` - Añadir o modificar tests
- `chore/` - Tareas de mantenimiento

**Ejemplo:**
```bash
git checkout -b feature/add-export-functionality
git checkout -b fix/sentiment-pie-colors
git checkout -b docs/update-architecture
```

### 2. Realiza tus cambios

- Mantén los cambios enfocados y atómicos
- Escribe código limpio y legible
- Sigue las convenciones del proyecto
- Añade comentarios cuando sea necesario
- Actualiza la documentación si es relevante

### 3. Prueba tus cambios

```bash
# Ejecuta el linter
npm run lint

# Compila para verificar errores de TypeScript
npm run build

# Prueba en el navegador
npm run dev
```

### 4. Commit de tus cambios

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "tipo: descripción breve"
```

**Tipos de commit:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, punto y coma, etc.
- `refactor:` - Refactorización sin cambio funcional
- `perf:` - Mejora de rendimiento
- `test:` - Añadir o actualizar tests
- `chore:` - Mantenimiento, dependencias, etc.

**Ejemplos:**
```bash
git commit -m "feat: add CSV export functionality"
git commit -m "fix: correct sentiment pie chart colors"
git commit -m "docs: update API integration guide"
git commit -m "refactor: extract metrics calculation to hook"
```

### 5. Push a tu fork

```bash
git push origin tipo/descripcion-breve
```

## Estándares de Código

### TypeScript

- **Usa tipos explícitos**: Evita `any`, usa interfaces y tipos
- **Interfaces para props**: Define interfaces para props de componentes
- **Exported types**: Mantén tipos en `src/types.ts`

```typescript
// ✅ Bien
interface MetricsCardProps {
  title: string;
  value: number;
  change?: number;
}

// ❌ Mal
function MetricsCard(props: any) { ... }
```

### React

- **Componentes funcionales**: Usa hooks, no clases
- **Exportación por defecto**: Para componentes
- **Nombres descriptivos**: Usa nombres claros y específicos
- **Single responsibility**: Un componente, una responsabilidad

```typescript
// ✅ Bien
export default function SentimentDistributionChart() {
  const { data, isLoading } = useMetrics();
  // ...
}

// ❌ Mal
export default function Chart() { ... }
```

### Hooks

- **Nombres con 'use'**: Todos los hooks deben empezar con 'use'
- **Hooks personalizados**: Coloca en `src/hooks/`
- **Documentación**: Documenta el propósito y uso

```typescript
// src/hooks/useMetrics.ts
export const useMetrics = (params: ScopeParams) => {
  return useQuery(['metrics', params], async () => {
    // ...
  });
};
```

### Estilos (Tailwind CSS)

- **Utility-first**: Usa clases de utilidad de Tailwind
- **Clases personalizadas**: Solo cuando sea necesario
- **Responsive**: Mobile-first approach
- **Dark mode**: Incluye variantes dark:

```tsx
// ✅ Bien
<div className="p-4 bg-white dark:bg-dark-900 rounded-lg shadow-md">

// ❌ Mal (CSS personalizado innecesario)
<div style={{ padding: '16px', background: 'white' }}>
```

### Organización de Archivos

```
src/
├── api/           # Cliente API y configuración
├── components/    # Componentes React reutilizables
├── context/       # Context providers (Theme, etc.)
├── hooks/         # Custom hooks
├── styles/        # Estilos globales
├── types.ts       # Definiciones de tipos TypeScript
├── App.tsx        # Componente principal
└── main.tsx       # Punto de entrada
```

### Convenciones de Nombres

- **Componentes**: PascalCase (`SentimentPie.tsx`)
- **Hooks**: camelCase con prefijo 'use' (`useMetrics.ts`)
- **Utilidades**: camelCase (`apiClient.ts`)
- **Tipos**: PascalCase (`DashboardMetrics`)
- **Constantes**: UPPER_SNAKE_CASE

## Proceso de Pull Request

### Antes de Crear el PR

1. ✅ El código pasa el linter sin errores
2. ✅ El proyecto compila sin errores
3. ✅ Probaste los cambios localmente
4. ✅ Actualizaste la documentación relevante
5. ✅ Los commits siguen Conventional Commits
6. ✅ Tu rama está actualizada con main

### Creación del PR

1. Ve a GitHub y crea un Pull Request desde tu rama
2. Usa un título descriptivo siguiendo Conventional Commits
3. Completa la plantilla del PR con:
   - **Descripción**: Qué hace el PR
   - **Motivación**: Por qué es necesario
   - **Cambios**: Lista de cambios principales
   - **Pruebas**: Cómo probaste los cambios
   - **Screenshots**: Si aplica (cambios visuales)

### Ejemplo de Descripción de PR

```markdown
## Descripción
Añade funcionalidad de exportación de métricas a CSV

## Motivación
Los usuarios necesitan exportar datos para análisis externo

## Cambios
- Añadido botón de exportación en KPICards
- Implementada función de conversión a CSV
- Añadido hook useExport para lógica de exportación

## Pruebas
- ✅ Exportación funciona con datos completos
- ✅ Maneja correctamente datos vacíos
- ✅ Formato CSV es correcto

## Screenshots
![Export Button](./docs/images/export-button.png)
```

### Revisión del PR

- Responde a comentarios de revisión de manera constructiva
- Realiza cambios solicitados en commits adicionales
- No hagas force push después de la revisión inicial
- Sé paciente, las revisiones pueden tomar tiempo

### Después de la Aprobación

- El PR será mergeado por un mantenedor
- Tu rama será eliminada automáticamente
- Actualiza tu fork:

```bash
git checkout main
git pull upstream main
git push origin main
```

## Reporte de Bugs

### Antes de Reportar

1. Verifica que no sea un issue duplicado
2. Asegúrate de estar usando la última versión
3. Recopila información sobre el error

### Crear un Issue de Bug

Usa la plantilla de bug report e incluye:

- **Descripción clara**: Qué pasó vs. qué esperabas
- **Pasos para reproducir**: Lista numerada de pasos
- **Entorno**: SO, navegador, versión de Node
- **Screenshots/Logs**: Si aplica
- **Contexto adicional**: Cualquier información relevante

### Ejemplo

```markdown
**Descripción del Bug**
El gráfico de sentimientos no se actualiza al cambiar el filtro

**Pasos para Reproducir**
1. Selecciona un departamento
2. Cambia a otro departamento
3. El gráfico mantiene datos anteriores

**Comportamiento Esperado**
El gráfico debería actualizarse con nuevos datos

**Entorno**
- OS: Windows 11
- Navegador: Chrome 120
- Node: 18.17.0

**Screenshots**
[Adjuntar screenshot]
```

## Solicitud de Funcionalidades

### Antes de Solicitar

1. Verifica que no exista una solicitud similar
2. Considera si se alinea con los objetivos del proyecto
3. Piensa en casos de uso concretos

### Crear un Feature Request

Incluye:

- **Descripción clara**: Qué funcionalidad propones
- **Motivación**: Por qué es útil
- **Casos de uso**: Ejemplos de uso
- **Alternativas**: Otras soluciones consideradas
- **Diseño/Mockups**: Si aplica

## Recursos Adicionales

### Documentación del Proyecto
- [README.md](./README.md) - Visión general
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Arquitectura
- [DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Guía de desarrollo
- [API_INTEGRATION.md](./docs/API_INTEGRATION.md) - Integración API

### Tecnologías Utilizadas
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/v3/)
- [Recharts](https://recharts.org/)

### Ayuda

- **Issues**: Para reportar bugs o solicitar features
- **Discussions**: Para preguntas generales o ideas
- **Email**: Para asuntos privados o sensibles

---

**¡Gracias por contribuir a SentimentInsight UAM Dashboard!** 🎉

Tu tiempo y esfuerzo ayudan a mejorar la experiencia de análisis de sentimientos para toda la comunidad UAM.
