# SentimentInsight UAM Dashboard

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev/)

Un dashboard moderno y responsive construido con React, TypeScript, Vite y Tailwind CSS para visualizar análisis de sentimientos de opiniones estudiantiles de la Universidad Autónoma Metropolitana.

> **📌 Nota Importante**: Este es el **frontend** del ecosistema SentimentInsightUAM. Muestra los resultados de los análisis generados por los otros repositorios con prefijo `SentimentInsightUAM_*`.

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Ecosistema SentimentInsight UAM](#-ecosistema-sentimentinsight-uam)
- [Tech Stack](#-tech-stack)
- [Inicio Rápido](#-inicio-rápido)
- [Documentación](#-documentación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#️-configuración)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características Principales

### 🎨 Interfaz Moderna

- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Modo Oscuro/Claro**: Sistema de temas con persistencia de preferencias
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales atractivos
- **UI Intuitiva**: Navegación clara y accesible

### 📊 Visualizaciones Interactivas

- **Tarjetas KPI**: Métricas clave con indicadores visuales
- **Gráficos de Pie**: Distribución de sentimientos con hover effects
- **Gráfico de Tendencias**: Evolución temporal de sentimientos
- **Nube de Palabras**: Términos más frecuentes en comentarios
- **Análisis por Categorías**: 
  - Calidad Didáctica
  - Empatía del Profesor
  - Método de Evaluación

### 🔍 Sistema de Filtrado Jerárquico

- **Filtrado por Departamento**: Vista general de departamentos académicos
- **Filtrado por Profesor**: Análisis específico por profesor
- **Filtrado por Materia**: Detalles a nivel de materia individual
- **Carga Dinámica**: Catálogos actualizados en tiempo real

### ⚡ Rendimiento y Optimización

- **Cache Inteligente**: React Query para gestión eficiente de datos
- **Hot Module Replacement**: Desarrollo rápido con HMR
- **Bundle Optimizado**: Build ligero para producción
- **Code Splitting**: Carga optimizada de componentes

---

## 🌐 Ecosistema SentimentInsight UAM

Este dashboard forma parte de un ecosistema más amplio:

```
┌──────────────────────────────────────────────────────┐
│            ECOSISTEMA SentimentInsightUAM            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  SentimentInsightUAM_SCRAPER                        │
│  └─→ Extracción de opiniones estudiantiles          │
│         │                                            │
│         ▼                                            │
│  SentimentInsightUAM_NLP                            │
│  └─→ Análisis de sentimientos y categorización      │
│         │                                            │
│         ▼                                            │
│  SentimentInsightUAM (Backend API)                  │
│  └─→ FastAPI + PostgreSQL                           │
│         │                                            │
│         ▼                                            │
│  SentimentInsightUAM_DASHBOARD  ◄── ESTE REPO      │
│  └─→ Visualización interactiva                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Repositorios Relacionados:**
- **SCRAPER**: Extracción automatizada de datos
- **NLP**: Procesamiento de lenguaje natural y análisis
- **API Backend**: Almacenamiento y exposición de datos
- **DASHBOARD**: Este repositorio - visualización frontend

---

## 🛠 Tech Stack

### Core

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.2.0 | Framework de UI |
| **TypeScript** | 5.2.2 | Tipado estático |
| **Vite** | 5.0.8 | Build tool y dev server |

### Estilos

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Tailwind CSS** | 3.3.6 | Framework CSS utility-first |
| **PostCSS** | 8.4.32 | Procesamiento CSS |
| **Autoprefixer** | 10.4.16 | Prefijos de navegadores |

### Estado y Datos

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React Query** | 3.39.3 | Estado del servidor y cache |
| **Axios** | 1.6.2 | Cliente HTTP |
| **Context API** | (React) | Estado global (tema) |

### Visualización

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Recharts** | 2.10.3 | Gráficos interactivos |
| **react-wordcloud** | 1.2.7 | Nube de palabras |

### Desarrollo

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **ESLint** | 8.55.0 | Linting |
| **TypeScript ESLint** | 6.14.0 | Reglas TypeScript |

---

## 🚀 Inicio Rápido

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** 16.x o superior ([Descargar](https://nodejs.org/))
- **npm** 7.x o superior (incluido con Node.js)
- **Backend API** corriendo en `http://localhost:8001`

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD.git
cd SentimentInsightUAM_DASHBOARD

# 2. Instalar dependencias (usar --legacy-peer-deps por react-wordcloud)
npm install --legacy-peer-deps

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Editar .env y ajustar la URL del backend si es necesario
# VITE_API_BASE_URL=http://localhost:8001
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Build de Producción

```bash
# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

---

## 📚 Documentación

La documentación completa está organizada en los siguientes archivos:

### Documentación Principal

- **[README.md](./README.md)** - Este archivo (visión general)
- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios y versiones
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía de contribución

### Documentación Técnica

- **[docs/SETUP.md](./docs/SETUP.md)** - Guía de setup completo
  - Requisitos del sistema
  - Instalación de prerrequisitos (Node.js, Git, etc.)
  - Configuración del backend
  - Configuración del dashboard
  - Verificación del setup
  - Problemas comunes y soluciones

- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Arquitectura del sistema
  - Visión general del ecosistema
  - Diagrama de capas y componentes
  - Flujo de datos
  - Patrones de diseño
  - Decisiones arquitectónicas

- **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Guía de desarrollo
  - Configuración del entorno
  - Comandos comunes
  - Convenciones de código
  - Workflows de desarrollo
  - Debugging y testing
  - Solución de problemas

- **[docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md)** - Integración con la API
  - Endpoints disponibles
  - Hooks de React Query
  - Flujos de datos
  - Manejo de errores
  - Caché y optimización

- **[docs/WORKFLOWS.md](./docs/WORKFLOWS.md)** - Flujos críticos del sistema
  - Flujo de inicialización
  - Flujo de filtrado jerárquico
  - Flujo de obtención de métricas
  - Flujo de cambio de tema
  - Flujo de manejo de errores
  - Flujo de cache de datos

### Documentación para IA

- **[COPILOT_INSTRUCTIONS.md](./COPILOT_INSTRUCTIONS.md)** - Instrucciones para GitHub Copilot

---

## 📁 Estructura del Proyecto

```
SentimentInsightUAM_DASHBOARD/
│
├── docs/                      # 📚 Documentación detallada
│   ├── ARCHITECTURE.md        # Arquitectura del sistema
│   ├── DEVELOPMENT.md         # Guía de desarrollo
│   └── API_INTEGRATION.md     # Integración con API
│
├── src/                       # 💻 Código fuente
│   ├── api/                   # 🔌 Cliente API
│   │   └── client.ts         # Configuración Axios
│   │
│   ├── components/            # 🎨 Componentes React
│   │   ├── KPICards.tsx      # Tarjetas de métricas
│   │   ├── ScopeSelector.tsx # Filtros jerárquicos
│   │   ├── SentimentPie.tsx  # Gráfico circular
│   │   ├── CategoryPies.tsx  # Gráficos de categorías
│   │   ├── TrendChart.tsx    # Gráfico de tendencias
│   │   ├── WordCloudComp.tsx # Nube de palabras
│   │   └── ThemeToggle.tsx   # Toggle de tema
│   │
│   ├── context/               # 🌍 Contextos React
│   │   └── ThemeContext.tsx  # Proveedor de tema
│   │
│   ├── hooks/                 # 🎣 Custom hooks
│   │   ├── useMetrics.ts     # Hook de métricas
│   │   └── useCatalog.ts     # Hook de catálogos
│   │
│   ├── styles/                # 🎨 Estilos globales
│   │   └── index.css         # CSS global + Tailwind
│   │
│   ├── types.ts               # 📝 Definiciones TypeScript
│   ├── App.tsx                # 🏠 Componente raíz
│   ├── main.tsx               # 🚪 Punto de entrada
│   └── vite-env.d.ts          # 🔧 Tipos de Vite
│
├── .env.example               # 📋 Variables de entorno ejemplo
├── .eslintrc.cjs              # ⚙️ Configuración ESLint
├── .gitignore                 # 🚫 Archivos ignorados
├── CHANGELOG.md               # 📜 Historial de cambios
├── CONTRIBUTING.md            # 🤝 Guía de contribución
├── COPILOT_INSTRUCTIONS.md    # 🤖 Instrucciones para IA
├── package.json               # 📦 Dependencias y scripts
├── postcss.config.cjs         # ⚙️ Configuración PostCSS
├── tailwind.config.cjs        # ⚙️ Configuración Tailwind
├── tsconfig.json              # ⚙️ Configuración TypeScript
├── vite.config.ts             # ⚙️ Configuración Vite
└── README.md                  # 📖 Este archivo
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo (puerto 5173)

# Linting
npm run lint         # Ejecutar ESLint
npm run lint -- --fix # Ejecutar ESLint con auto-corrección

# Build
npm run build        # Compilar para producción (output: dist/)
npm run preview      # Vista previa del build de producción
```

### Ejemplos de Uso

```bash
# Desarrollo en puerto personalizado
npm run dev -- --port 3000

# Desarrollo con exposición en red local
npm run dev -- --host

# Build con análisis detallado
npm run build -- --mode production
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# URL del backend API
VITE_API_BASE_URL=http://localhost:8001
```

**Nota:** Las variables deben tener prefijo `VITE_` para ser expuestas al cliente.

### Configuración de Tailwind

La paleta de colores y configuración de tema se encuentra en `tailwind.config.cjs`:

```javascript
// Colores personalizados
colors: {
  primary: { /* Azul */ },
  accent: { /* Púrpura */ },
  success: { /* Verde */ },
  warning: { /* Amarillo */ },
  danger: { /* Rojo */ },
  dark: { /* Grises */ }
}

// Dark mode
darkMode: 'class'
```

### Configuración de TypeScript

Configuración estricta en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee la [Guía de Contribución](./CONTRIBUTING.md) para detalles sobre:

- Código de conducta
- Proceso de desarrollo
- Estándares de código
- Proceso de Pull Request
- Reporte de bugs
- Solicitud de funcionalidades

### Flujo de Contribución Rápido

```bash
# 1. Fork y clonar
git clone https://github.com/TU_USUARIO/SentimentInsightUAM_DASHBOARD.git

# 2. Crear rama
git checkout -b feature/nueva-funcionalidad

# 3. Hacer cambios y commits
git commit -m "feat: descripción de la funcionalidad"

# 4. Push
git push origin feature/nueva-funcionalidad

# 5. Crear Pull Request en GitHub
```

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Autores y Reconocimientos

**Desarrollado con ❤️ para la Universidad Autónoma Metropolitana**

- Proyecto desarrollado como herramienta de análisis de sentimientos para la mejora continua de la calidad educativa
- Powered by React, TypeScript, y FastAPI

---

## 📞 Soporte y Contacto

- **Issues**: [GitHub Issues](https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/issues)
- **Discussions**: [GitHub Discussions](https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/discussions)

---

## 🔗 Enlaces Útiles

### Repositorios del Ecosistema
- Backend API: [SentimentInsightUAM](https://github.com/christianpm-gh/SentimentInsightUAM)
- Scraper: SentimentInsightUAM_SCRAPER
- NLP: SentimentInsightUAM_NLP

### Tecnologías
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/v3/docs)
- [Recharts Documentation](https://recharts.org/)

---

**¿Tienes preguntas o sugerencias?** No dudes en abrir un [issue](https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/issues) o iniciar una [discusión](https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/discussions).

---

<div align="center">

**SentimentInsight UAM Dashboard v1.0.0**

Análisis de Sentimientos para la Mejora Continua Educativa

</div>