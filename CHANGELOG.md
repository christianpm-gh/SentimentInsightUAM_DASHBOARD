# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [1.0.0] - 2024-11

### Versión Estable Actual

#### Añadido
- **Sistema de Temas (Dark/Light Mode)**
  - Implementación completa de tema oscuro/claro con ThemeContext
  - Persistencia de preferencias en localStorage
  - Detección automática de preferencia del sistema
  - Toggle de tema con animaciones suaves
  - Paleta de colores extendida para ambos modos

- **Sistema de Filtrado Jerárquico**
  - Filtrado por Departamento → Profesor → Materia
  - Carga dinámica de catálogos desde la API
  - Actualización en cascada de selectores
  - Validación de selecciones jerárquicas
  - Hooks personalizados para gestión de catálogos (`useCatalog.ts`)

- **Análisis de Categorías**
  - Visualización de distribución de sentimientos por categorías:
    - Calidad Didáctica
    - Empatía del Profesor
    - Método de Evaluación
  - Gráficos de pie interactivos para cada categoría
  - Contadores de sentimientos por categoría
  - Integración con API de métricas categorizadas

- **Componentes Visuales Avanzados**
  - KPICards: Tarjetas de métricas clave con animaciones
  - SentimentPie: Gráfico circular de distribución de sentimientos con efectos hover
  - CategoryPies: Visualización de categorías múltiples
  - TrendChart: Gráfico de tendencias temporales
  - WordCloudComp: Nube de palabras interactiva
  - ScopeSelector: Selector jerárquico de alcance

- **Arquitectura y Estructura**
  - Configuración de Vite para desarrollo rápido
  - Sistema de tipos TypeScript completo
  - Context API para manejo de estado global (ThemeContext)
  - React Query para gestión de estado del servidor
  - Axios como cliente HTTP configurado
  - Tailwind CSS con configuración personalizada

- **Sistema de Diseño**
  - Paleta de colores vibrante y moderna
  - Animaciones y transiciones fluidas
  - Diseño responsive (mobile-first)
  - Componentes reutilizables
  - Sistema de espaciado consistente
  - Efectos de sombra y resplandor

#### Características Técnicas
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.3.6
- React Query 3.39.3
- Recharts 2.10.3
- Axios 1.6.2

#### Integraciones
- API REST del backend SentimentInsightUAM
- Endpoints de métricas por departamento, profesor y materia
- Endpoint de catálogo jerárquico
- Manejo de errores y estados de carga
- Cache de datos con React Query

---

## Versiones Históricas

### [0.x] - Desarrollo Inicial

#### Versiones Previas
Las versiones anteriores a 1.0.0 incluyeron:
- Configuración inicial del proyecto
- Componentes básicos de visualización
- Integración inicial con la API
- Diseño base con Tailwind CSS
- Estructura de componentes fundamental

#### Notas sobre Versiones Históricas
El desarrollo iterativo incluyó múltiples refinamientos en:
- Arquitectura de componentes
- Integración con servicios backend
- Optimización de rendimiento
- Mejoras en la experiencia de usuario
- Responsividad y accesibilidad

---

## [No publicado]

### En Desarrollo
- Mejoras continuas en documentación
- Optimización de rendimiento
- Refinamiento de la experiencia de usuario

---

## Convenciones

### Tipos de Cambios
- **Añadido**: para funcionalidades nuevas.
- **Cambiado**: para cambios en funcionalidades existentes.
- **Obsoleto**: para funcionalidades que serán eliminadas.
- **Eliminado**: para funcionalidades eliminadas.
- **Corregido**: para corrección de errores.
- **Seguridad**: en caso de vulnerabilidades.

### Enlaces
[1.0.0]: https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/releases/tag/v1.0.0
