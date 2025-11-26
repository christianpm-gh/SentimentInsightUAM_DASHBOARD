# Documentación del Proyecto

Bienvenido a la documentación completa de SentimentInsight UAM Dashboard. Esta guía te ayudará a encontrar la información que necesitas.

## 📚 Índice de Documentación

### Para Empezar

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[README.md](../README.md)** | Visión general del proyecto, características principales y quick start | Todos |
| **[SETUP.md](./SETUP.md)** | Guía completa de instalación desde cero | Nuevos desarrolladores |
| **[CONTRIBUTING.md](../CONTRIBUTING.md)** | Cómo contribuir al proyecto | Contribuidores |

### Guías Técnicas

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Arquitectura del sistema, patrones y decisiones | Desarrolladores, Arquitectos |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | Guía de desarrollo, comandos y convenciones | Desarrolladores |
| **[API_INTEGRATION.md](./API_INTEGRATION.md)** | Integración con la API backend | Desarrolladores |
| **[WORKFLOWS.md](./WORKFLOWS.md)** | Flujos críticos del sistema explicados en detalle | Desarrolladores, QA |

### Referencias

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[CHANGELOG.md](../CHANGELOG.md)** | Historial de versiones y cambios | Todos |
| **[COPILOT_INSTRUCTIONS.md](../COPILOT_INSTRUCTIONS.md)** | Instrucciones para GitHub Copilot | IA, Desarrolladores |

---

## 🎯 Flujo de Lectura Recomendado

### Si eres nuevo en el proyecto:

1. **[README.md](../README.md)** - Comienza aquí para entender qué es el proyecto
2. **[SETUP.md](./SETUP.md)** - Configura tu entorno de desarrollo
3. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Aprende a desarrollar
4. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Lee antes de hacer tu primera contribución

### Si quieres entender la arquitectura:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura completa del sistema
2. **[WORKFLOWS.md](./WORKFLOWS.md)** - Flujos de datos detallados
3. **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Cómo se integra con la API

### Si estás resolviendo un bug:

1. **[WORKFLOWS.md](./WORKFLOWS.md)** - Entiende el flujo que está fallando
2. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Sección de debugging
3. **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Si es un problema de API

### Si estás añadiendo una feature:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Entiende los patrones existentes
2. **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Convenciones y workflows
3. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Proceso de contribución

---

## 📖 Descripción de Documentos

### README.md
**Propósito:** Punto de entrada principal al proyecto.

**Contenido:**
- Descripción del proyecto y ecosistema
- Tech stack completo
- Quick start (instalación y ejecución)
- Estructura del proyecto
- Enlaces a documentación detallada

**Cuándo leer:** Primera visita al repositorio.

---

### SETUP.md
**Propósito:** Guía paso a paso para configurar el entorno.

**Contenido:**
- Requisitos del sistema
- Instalación de prerrequisitos (Node.js, Git, etc.)
- Setup del backend API
- Setup del dashboard
- Verificación completa
- Troubleshooting de setup

**Cuándo leer:** Cuando estás configurando por primera vez.

---

### ARCHITECTURE.md
**Propósito:** Documentar la arquitectura técnica del sistema.

**Contenido:**
- Visión general del ecosistema SentimentInsight UAM
- Stack tecnológico detallado
- Diagrama de capas
- Estructura de directorios
- Jerarquía de componentes
- Flujos de datos
- Sistema de tipos
- Patrones de diseño utilizados
- Decisiones arquitectónicas y justificación

**Cuándo leer:** Cuando necesitas entender cómo está construido el sistema.

---

### DEVELOPMENT.md
**Propósito:** Guía práctica para desarrolladores.

**Contenido:**
- Configuración del entorno de desarrollo
- Comandos comunes (dev, build, lint)
- Convenciones de código
- Workflows de desarrollo (añadir componente, hook, etc.)
- Debugging (herramientas y técnicas)
- Testing (setup y ejemplos)
- Build y deployment
- Solución de problemas comunes

**Cuándo leer:** Cuando estás desarrollando activamente.

---

### API_INTEGRATION.md
**Propósito:** Documentar la integración con el backend API.

**Contenido:**
- Configuración del cliente API
- Endpoints disponibles y su uso
- Hooks de React Query (useMetrics, useCatalog, etc.)
- Flujos de datos API → Frontend
- Manejo de errores
- Estrategia de caché
- Ejemplos de uso
- Troubleshooting de API

**Cuándo leer:** Cuando trabajas con llamadas a la API o datos del servidor.

---

### WORKFLOWS.md
**Propósito:** Explicar en detalle los flujos críticos del sistema.

**Contenido:**
- Flujo de inicialización de la app
- Flujo de filtrado jerárquico (Dept → Prof → Course)
- Flujo de obtención de métricas
- Flujo de cambio de tema
- Flujo de manejo de errores
- Flujo de cache de datos
- Diagramas de secuencia y estados

**Cuándo leer:** Cuando necesitas entender cómo funciona un proceso específico.

---

### CONTRIBUTING.md
**Propósito:** Guía para contribuir al proyecto.

**Contenido:**
- Código de conducta
- Tipos de contribuciones aceptadas
- Setup para contribuidores
- Proceso de desarrollo
- Estándares de código
- Proceso de Pull Request
- Cómo reportar bugs
- Cómo solicitar features

**Cuándo leer:** Antes de hacer tu primera contribución.

---

### CHANGELOG.md
**Propósito:** Registro histórico de cambios y versiones.

**Contenido:**
- Versión actual (1.0.0)
- Features añadidas por versión
- Bugs corregidos
- Breaking changes
- Convenciones de versionado

**Cuándo leer:** Para saber qué cambió entre versiones.

---

### COPILOT_INSTRUCTIONS.md
**Propósito:** Instrucciones para herramientas de IA (GitHub Copilot, etc.).

**Contenido:**
- Contexto del proyecto
- Convenciones de código
- Patrones a seguir
- Tareas comunes
- Best practices específicas del proyecto

**Cuándo leer:** Si usas GitHub Copilot o quieres entender las convenciones de manera concisa.

---

## 🔍 Búsqueda Rápida

### ¿Cómo hago...?

| Pregunta | Documento | Sección |
|----------|-----------|---------|
| ¿Cómo instalo el proyecto? | [SETUP.md](./SETUP.md) | Instalación |
| ¿Cómo añado un componente? | [DEVELOPMENT.md](./DEVELOPMENT.md) | Workflows → Añadir Componente |
| ¿Cómo funciona el filtrado? | [WORKFLOWS.md](./WORKFLOWS.md) | Flujo de Filtrado Jerárquico |
| ¿Cómo se conecta la API? | [API_INTEGRATION.md](./API_INTEGRATION.md) | Cliente API |
| ¿Qué tecnologías usa? | [README.md](../README.md) | Tech Stack |
| ¿Cómo contribuyo? | [CONTRIBUTING.md](../CONTRIBUTING.md) | Proceso de Desarrollo |
| ¿Por qué esta arquitectura? | [ARCHITECTURE.md](./ARCHITECTURE.md) | Decisiones Arquitectónicas |
| ¿Cómo debuggear? | [DEVELOPMENT.md](./DEVELOPMENT.md) | Debugging |
| ¿Cómo funciona el cache? | [API_INTEGRATION.md](./API_INTEGRATION.md) | Caché y Optimización |
| ¿Qué cambió en v1.0? | [CHANGELOG.md](../CHANGELOG.md) | [1.0.0] |

---

## 📝 Convenciones de Documentación

### Formato
- Todos los documentos están en **Markdown**
- Incluyen **tabla de contenidos** al inicio
- Usan **ejemplos de código** cuando es relevante
- Incluyen **diagramas** donde ayudan a la comprensión

### Mantenimiento
- Actualizar documentación con cada cambio significativo
- Marcar documentos con "Última actualización: [fecha]"
- Mantener CHANGELOG.md actualizado con cada release

### Estilo
- Lenguaje claro y conciso
- Ejemplos prácticos
- Links internos entre documentos
- Screenshots cuando es apropiado (especialmente para UI)

---

## 🆘 ¿No encuentras lo que buscas?

Si la documentación no responde tu pregunta:

1. **Busca en Issues**: Puede que alguien ya preguntó lo mismo
2. **Abre una Discussion**: Para preguntas generales
3. **Abre un Issue**: Si crees que falta documentación
4. **Contribuye**: Añade la documentación tú mismo (ver [CONTRIBUTING.md](../CONTRIBUTING.md))

---

## 🔗 Enlaces Externos Útiles

### Tecnologías del Proyecto
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query v3](https://tanstack.com/query/v3/docs)
- [Recharts](https://recharts.org/)

### Herramientas de Desarrollo
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/doc)
- [npm Documentation](https://docs.npmjs.com/)
- [Node.js Docs](https://nodejs.org/docs/)

### Recursos de Aprendizaje
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**Última actualización:** Noviembre 2024 (v1.0.0)
