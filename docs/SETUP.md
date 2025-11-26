# Guía de Setup

Esta guía te ayudará a configurar el entorno de desarrollo completo para SentimentInsight UAM Dashboard desde cero.

## Tabla de Contenidos

- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación de Prerrequisitos](#instalación-de-prerrequisitos)
- [Configuración del Backend](#configuración-del-backend)
- [Configuración del Dashboard](#configuración-del-dashboard)
- [Verificación del Setup](#verificación-del-setup)
- [Setup con Docker (Futuro)](#setup-con-docker-futuro)
- [Problemas Comunes](#problemas-comunes)

---

## Requisitos del Sistema

### Hardware Mínimo
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Disco**: 2 GB de espacio libre

### Hardware Recomendado
- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Disco**: 5+ GB de espacio libre

### Sistemas Operativos Soportados
- ✅ Windows 10/11
- ✅ macOS 11+
- ✅ Linux (Ubuntu 20.04+, Debian, Fedora, etc.)

---

## Instalación de Prerrequisitos

### 1. Node.js y npm

El dashboard requiere Node.js 16.x o superior.

#### Windows

**Opción A: Instalador oficial**
1. Descarga el instalador LTS desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador
3. Sigue el asistente (acepta las opciones por defecto)
4. Reinicia la terminal

**Opción B: Usando winget**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Opción C: Usando Chocolatey**
```powershell
choco install nodejs-lts
```

#### macOS

**Opción A: Usando Homebrew (recomendado)**
```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node@18
```

**Opción B: Instalador oficial**
1. Descarga el instalador LTS desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador .pkg
3. Sigue el asistente

#### Linux

**Ubuntu/Debian:**
```bash
# Actualizar índice de paquetes
sudo apt update

# Instalar Node.js LTS usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# O usando snap
sudo snap install node --classic --channel=18
```

**Fedora:**
```bash
sudo dnf install nodejs
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

#### Verificar Instalación

```bash
node --version  # Debe mostrar v16.x o superior
npm --version   # Debe mostrar v7.x o superior
```

### 2. Git

#### Windows

**Opción A: Instalador oficial**
1. Descarga desde [git-scm.com](https://git-scm.com/download/win)
2. Ejecuta el instalador
3. Acepta las opciones recomendadas

**Opción B: Usando winget**
```powershell
winget install Git.Git
```

#### macOS

```bash
# Git viene con Xcode Command Line Tools
xcode-select --install

# O usando Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

#### Verificar Instalación

```bash
git --version  # Debe mostrar la versión de Git
```

#### Configurar Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 3. Editor de Código (Recomendado)

**Visual Studio Code** (recomendado para este proyecto)

#### Windows
```powershell
winget install Microsoft.VisualStudioCode
```

#### macOS
```bash
brew install --cask visual-studio-code
```

#### Linux
```bash
# Ubuntu/Debian
sudo snap install code --classic

# O descarga el .deb desde code.visualstudio.com
```

**Extensiones Recomendadas para VS Code:**

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`
3. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
4. **TypeScript Vue Plugin** - Soporte mejorado para TypeScript

Instalar todas de una vez:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

---

## Configuración del Backend

El dashboard necesita el backend API para funcionar. Debes tener el proyecto **SentimentInsightUAM** configurado y corriendo.

### Prerrequisitos del Backend

- Python 3.9+
- PostgreSQL 13+
- pip

### Setup Rápido del Backend

```bash
# 1. Clonar repositorio del backend
git clone https://github.com/christianpm-gh/SentimentInsightUAM.git
cd SentimentInsightUAM

# 2. Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows (Command Prompt):
venv\Scripts\activate
# Windows (PowerShell):
venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# 5. Ejecutar migraciones (si aplica)
# [Comandos específicos del backend]

# 6. Iniciar servidor
uvicorn app.main:app --reload --port 8001
```

**Nota:** Para instrucciones detalladas del backend, consulta el README del repositorio SentimentInsightUAM.

### Verificar que el Backend Funciona

```bash
# En otra terminal, verificar que responde
curl http://localhost:8001/health

# O abrir en navegador
# http://localhost:8001/docs  (Documentación Swagger)
```

---

## Configuración del Dashboard

### Paso 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD.git

# Navegar al directorio
cd SentimentInsightUAM_DASHBOARD
```

### Paso 2: Instalar Dependencias

```bash
# Instalar con --legacy-peer-deps debido a react-wordcloud
npm install --legacy-peer-deps
```

**¿Por qué `--legacy-peer-deps`?**

La librería `react-wordcloud` requiere React 16, pero usamos React 18. El flag permite instalar a pesar de la incompatibilidad de versión. La librería funciona correctamente en React 18.

**Tiempo estimado:** 1-3 minutos dependiendo de la conexión.

### Paso 3: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env
# Windows:
notepad .env
# macOS:
nano .env
# Linux:
nano .env
```

**Contenido de `.env`:**

```bash
# URL del backend API
VITE_API_BASE_URL=http://localhost:8001
```

**Importante:**
- Las variables de Vite deben tener prefijo `VITE_`
- Cambiar este archivo requiere reiniciar el servidor de desarrollo
- No incluir trailing slash en la URL

### Paso 4: Verificar la Instalación

```bash
# Ejecutar linter
npm run lint

# Compilar TypeScript
npm run build
```

Si ambos comandos se ejecutan sin errores críticos, la instalación es correcta.

### Paso 5: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

**Salida esperada:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Paso 6: Abrir en Navegador

1. Abre tu navegador
2. Navega a `http://localhost:5173`
3. Deberías ver el dashboard

---

## Verificación del Setup

### Checklist de Verificación

- [ ] **Node.js instalado** (`node --version` ≥ v16.x)
- [ ] **npm instalado** (`npm --version` ≥ v7.x)
- [ ] **Git instalado** (`git --version` funciona)
- [ ] **Backend corriendo** (`curl http://localhost:8001/health`)
- [ ] **Dashboard instalado** (`npm install` exitoso)
- [ ] **Variables configuradas** (`.env` existe y es correcto)
- [ ] **Linter pasa** (`npm run lint` sin errores críticos)
- [ ] **Build funciona** (`npm run build` exitoso)
- [ ] **Dev server inicia** (`npm run dev` funciona)
- [ ] **Dashboard carga** (navegador muestra la UI)
- [ ] **Tema funciona** (toggle dark/light funciona)
- [ ] **API conecta** (se pueden cargar datos sin errores)

### Prueba de Funcionalidad Completa

1. **Iniciar Backend**
   ```bash
   cd path/to/SentimentInsightUAM
   source venv/bin/activate  # o venv\Scripts\activate en Windows
   uvicorn app.main:app --reload --port 8001
   ```

2. **Iniciar Dashboard**
   ```bash
   cd path/to/SentimentInsightUAM_DASHBOARD
   npm run dev
   ```

3. **Probar en Navegador**
   - Abrir `http://localhost:5173`
   - Cambiar tema (dark/light)
   - Seleccionar un departamento
   - Verificar que carguen métricas
   - Revisar gráficos
   - Verificar que no hay errores en consola (F12)

---

## Setup con Docker (Futuro)

El proyecto planea incluir Docker para simplificar el setup. Esta sección se actualizará cuando esté disponible.

### Preview de Setup con Docker

```bash
# Futuro: Un solo comando para todo
docker-compose up

# Dashboard: http://localhost:3000
# Backend: http://localhost:8001
```

---

## Problemas Comunes

### Problema: npm install falla

**Síntoma:**
```
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.13.0" from react-wordcloud
```

**Solución:**
```bash
npm install --legacy-peer-deps
```

---

### Problema: Puerto 5173 en uso

**Síntoma:**
```
Port 5173 is in use, trying another one...
```

**Solución A: Especificar otro puerto**
```bash
npm run dev -- --port 3000
```

**Solución B: Terminar proceso en ese puerto**

**Windows:**
```powershell
# Encontrar proceso
netstat -ano | findstr :5173

# Terminar proceso (reemplaza PID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Encontrar proceso
lsof -i :5173

# Terminar proceso
kill -9 <PID>
```

---

### Problema: Backend no responde

**Síntoma:**
```
Network Error
```

**Checklist:**

1. **¿Backend está corriendo?**
   ```bash
   curl http://localhost:8001/health
   ```

2. **¿Puerto correcto?**
   - Backend debe estar en puerto 8001
   - Verifica `VITE_API_BASE_URL` en `.env`

3. **¿CORS configurado?**
   - Backend debe permitir origen `http://localhost:5173`

4. **¿Firewall?**
   - Verifica que el firewall no bloquee conexiones locales

---

### Problema: Errores de TypeScript

**Síntoma:**
```
error TS2345: Argument of type 'X' is not assignable
```

**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Verificar errores
npx tsc --noEmit
```

---

### Problema: Estilos no se aplican

**Síntoma:** Componentes sin estilos.

**Checklist:**

1. **¿Tailwind configurado?**
   - Verifica `tailwind.config.cjs` existe
   - Verifica `postcss.config.cjs` existe

2. **¿CSS importado?**
   - `src/styles/index.css` importado en `src/main.tsx`

3. **¿Cache limpia?**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

---

### Problema: HMR no funciona

**Síntoma:** Cambios en código no se reflejan.

**Soluciones:**

1. **Limpiar cache de Vite**
   ```bash
   rm -rf node_modules/.vite
   ```

2. **Reiniciar dev server**
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

3. **Verificar extensión del archivo**
   - Solo `.tsx`, `.ts`, `.jsx`, `.js` tienen HMR
   - `.css` también tiene HMR

---

### Problema: Permisos en Linux/macOS

**Síntoma:**
```
EACCES: permission denied
```

**Solución:**

**Opción A: Fix de npm**
```bash
# Cambiar directorio de cache de npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Añadir a PATH en ~/.bashrc o ~/.zshrc
export PATH=~/.npm-global/bin:$PATH

# Recargar
source ~/.bashrc  # o ~/.zshrc
```

**Opción B: Fix de permisos del directorio**
```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ./node_modules
```

**No usar sudo npm install** - Esto puede causar problemas.

---

## Próximos Pasos

Una vez completado el setup:

1. **Lee la documentación:**
   - [DEVELOPMENT.md](./DEVELOPMENT.md) - Guía de desarrollo
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura
   - [API_INTEGRATION.md](./API_INTEGRATION.md) - Integración API

2. **Explora el código:**
   - Revisa `src/App.tsx` - Componente principal
   - Revisa `src/components/` - Componentes de UI
   - Revisa `src/hooks/` - Custom hooks

3. **Haz cambios:**
   - Lee [CONTRIBUTING.md](../CONTRIBUTING.md)
   - Crea una rama
   - Haz tus cambios
   - Abre un Pull Request

---

## Recursos Adicionales

### Tutoriales
- [Node.js Getting Started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)

### Comunidad
- [Stack Overflow](https://stackoverflow.com/)
- [React Discord](https://discord.gg/react)
- [TypeScript Discord](https://discord.gg/typescript)

---

**¿Tienes problemas no listados aquí?** Abre un [issue](https://github.com/christianpm-gh/SentimentInsightUAM_DASHBOARD/issues) con detalles de tu configuración y el error.

---

**Última actualización:** Noviembre 2024
