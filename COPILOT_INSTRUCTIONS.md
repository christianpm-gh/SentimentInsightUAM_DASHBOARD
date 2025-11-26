# GitHub Copilot Instructions for SentimentInsight UAM Dashboard

## Project Overview

This is a modern React-based dashboard application built with TypeScript, Vite, and Tailwind CSS. It visualizes sentiment analysis data from the SentimentInsightUAM API backend.

**Version:** 1.0.0 (Stable)

**Role in Ecosystem:** Frontend visualization layer for the SentimentInsight UAM ecosystem. Displays analysis results from SCRAPER → NLP → API pipeline.

## Project Context

### Ecosystem Structure
```
SentimentInsightUAM_SCRAPER → SentimentInsightUAM_NLP → SentimentInsightUAM (API) → THIS DASHBOARD
```

### Key Features (v1.0.0)
- Dark/Light theme with persistence
- Hierarchical filtering (Department → Professor → Course)
- Category analysis (Calidad Didáctica, Empatía, Método de Evaluación)
- Interactive visualizations (Pie charts, trends, word clouds)
- Responsive design with mobile-first approach

## Development Guidelines

### Code Style & Conventions

#### TypeScript
- **Strict mode enabled**: No `any` types
- **Explicit typing**: Always define interfaces for props
- **Type location**: All shared types go in `src/types.ts`
- **Naming**: PascalCase for interfaces/types, camelCase for variables

```typescript
// ✅ Good
interface SentimentPieProps {
  data: SentimentCount[];
  title?: string;
}

// ❌ Bad
function Component(props: any) { }
```

#### React Components
- **Functional components only**: Use hooks, no class components
- **Export pattern**: Default export for components
- **File naming**: PascalCase matching component name
- **Props destructuring**: Destructure props in function signature

```typescript
// ✅ Good
export default function SentimentPie({ data, title }: SentimentPieProps) {
  return <div>{/* ... */}</div>;
}

// ❌ Bad
export default (props) => <div>{/* ... */}</div>;
```

#### Custom Hooks
- **Naming**: Always prefix with `use`
- **Location**: `src/hooks/`
- **Purpose**: Encapsulate reusable logic
- **Return types**: Explicitly type return values

```typescript
// ✅ Good
export const useMetrics = (params: ScopeParams): UseQueryResult<DashboardMetrics> => {
  return useQuery(['metrics', params], async () => { /* ... */ });
};
```

### State Management

#### Local State (useState)
- For UI state (modals, toggles, form inputs)
- Keep state as close as possible to where it's used

#### Server State (React Query)
- For all API data
- Leverage cache, stale time, and refetch strategies
- Always handle loading and error states

```typescript
const { data, isLoading, isError } = useMetrics(params);

if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage />;
if (!data) return <EmptyState />;
return <Dashboard data={data} />;
```

#### Global State (Context API)
- Only for ThemeContext (dark/light mode)
- Avoid prop drilling for theme-related values

### Styling with Tailwind CSS

#### Class Organization
Follow this order for readability:
1. Layout (flex, grid, display)
2. Spacing (padding, margin, gap)
3. Typography (text, font)
4. Visual (colors, backgrounds)
5. Effects (shadows, borders, rounded)
6. Variants (dark:, hover:, responsive)

```typescript
// ✅ Good
className="
  flex items-center justify-between
  px-4 py-2 gap-4
  text-sm font-bold
  bg-white text-dark-900
  rounded-lg shadow-md
  dark:bg-dark-900 dark:text-white
  hover:shadow-lg transition-shadow
"
```

#### Dark Mode
- **Always include dark variants** for colored elements
- Use the custom color palette from `tailwind.config.cjs`
- Test both themes when making UI changes

```typescript
// ✅ Good
className="bg-white dark:bg-dark-900 text-dark-900 dark:text-white"

// ❌ Bad
className="bg-white text-black"  // Missing dark mode
```

#### Responsive Design
- **Mobile-first**: Base classes for mobile, then scale up
- Use breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```typescript
// ✅ Good
className="text-sm sm:text-base md:text-lg lg:text-xl"
```

### File Organization

```
src/
├── api/
│   └── client.ts          # Axios configuration
├── components/
│   ├── KPICards.tsx       # Metrics cards
│   ├── ScopeSelector.tsx  # Hierarchical filters
│   ├── SentimentPie.tsx   # Pie chart
│   ├── CategoryPies.tsx   # Category charts
│   ├── TrendChart.tsx     # Trend line chart
│   ├── WordCloudComp.tsx  # Word cloud
│   └── ThemeToggle.tsx    # Theme switcher
├── context/
│   └── ThemeContext.tsx   # Theme provider
├── hooks/
│   ├── useMetrics.ts      # Metrics fetching
│   └── useCatalog.ts      # Catalog fetching
├── styles/
│   └── index.css          # Global CSS + Tailwind
├── types.ts               # TypeScript definitions
├── App.tsx                # Root component
└── main.tsx               # Entry point
```

### API Integration Patterns

#### Endpoint Usage
- Department: `GET /metrics/department/{name}`
- Professor: `GET /metrics/professor/{id}`
- Course: `GET /metrics/course/{id}`
- Catalogs: `GET /catalog/departments`, etc.

#### Data Transformation
The backend returns data in a specific format that must be mapped:

```typescript
// Backend format
{ stats: { total_opinions, average_rating, sentiment_distribution }, ... }

// Frontend format
{ total_comments, average_sentiment_score, sentiment_distribution: [], ... }
```

This mapping happens in `useMetrics` hook.

#### Cache Strategy
- **Stale time**: 5 minutes for metrics, 10 minutes for catalogs
- **Refetch on focus**: Disabled
- **Query keys**: Include all parameters for proper cache invalidation

## Common Tasks

### Adding a New Component

1. Create file in `src/components/ComponentName.tsx`
2. Define props interface
3. Implement with dark mode support
4. Export as default
5. Import in parent

```typescript
// src/components/NewComponent.tsx
interface NewComponentProps {
  data: DataType;
  onAction?: () => void;
}

export default function NewComponent({ data, onAction }: NewComponentProps) {
  return (
    <div className="p-4 bg-white dark:bg-dark-900 rounded-lg">
      {/* Implementation */}
    </div>
  );
}
```

### Adding a New Hook

1. Create file in `src/hooks/useNewHook.ts`
2. Define return type
3. Implement with React Query if fetching data
4. Export

```typescript
// src/hooks/useNewHook.ts
export const useNewHook = (param: string) => {
  return useQuery<DataType>(
    ['hookKey', param],
    async () => {
      const response = await apiClient.get(`/endpoint/${param}`);
      return response.data;
    },
    { staleTime: 5 * 60 * 1000 }
  );
};
```

### Adding New Types

Add to `src/types.ts` and export:

```typescript
export interface NewType {
  id: number;
  name: string;
  // ...
}
```

### Modifying Styles

1. **Prefer Tailwind utilities** over custom CSS
2. For global styles, edit `src/styles/index.css`
3. Add custom utilities to `tailwind.config.cjs` if needed
4. Ensure dark mode compatibility

## Installation & Setup

```bash
# Install dependencies (use --legacy-peer-deps due to react-wordcloud)
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env
# Edit .env: VITE_API_BASE_URL=http://localhost:8001

# Start development
npm run dev  # Runs on port 5173

# Lint code
npm run lint

# Build for production
npm run build
```

## Testing & Quality Assurance

### Pre-commit Checklist
- [ ] Code passes linter (`npm run lint`)
- [ ] TypeScript compiles (`npm run build`)
- [ ] Tested in light and dark modes
- [ ] Tested responsive breakpoints
- [ ] API integration works with backend
- [ ] No console errors in browser

### Testing Locally

1. **Start backend API** on port 8001
2. **Start dashboard**: `npm run dev`
3. **Test flows**:
   - Theme toggle works
   - Hierarchical filtering (Dept → Prof → Course)
   - All visualizations render
   - Loading and error states
   - Responsive layout on different screen sizes

## Build & Deployment

```bash
# Production build
npm run build  # Output: dist/

# Preview build
npm run preview  # Serves from dist/

# Deploy (example for Vercel)
vercel --prod
```

## Troubleshooting

### npm install fails

**Issue:** Peer dependency conflict with react-wordcloud

**Solution:**
```bash
npm install --legacy-peer-deps
```

### API not responding

**Checklist:**
1. Backend running on port 8001?
2. `.env` has correct `VITE_API_BASE_URL`?
3. CORS configured in backend?
4. Dev server restarted after changing `.env`?

### TypeScript errors

```bash
# Check all type errors
npx tsc --noEmit

# Common fix: reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Styles not applying

**Issues:**
- Tailwind not purging correctly for dynamic classes
- Missing dark: variant

**Solutions:**
- Use complete class names (not dynamic concatenation)
- Always add dark mode variants
- Check `index.css` imports Tailwind directives

### HMR not working

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Dependencies

### Core (Production)
- `react` 18.2.0 - UI framework
- `react-dom` 18.2.0 - React renderer
- `typescript` 5.2.2 - Type safety
- `axios` 1.6.2 - HTTP client
- `react-query` 3.39.3 - Server state management
- `recharts` 2.10.3 - Charts
- `react-wordcloud` 1.2.7 - Word cloud

### Styling (Production)
- `tailwindcss` 3.3.6 - CSS framework
- `postcss` 8.4.32 - CSS processing
- `autoprefixer` 10.4.16 - Browser prefixes

### Development
- `vite` 5.0.8 - Build tool
- `@vitejs/plugin-react` 4.2.1 - React plugin
- `eslint` 8.55.0 - Linting
- `@typescript-eslint/*` 6.14.0 - TS linting

## Documentation

### For Developers
- **[README.md](./README.md)** - Project overview
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guide
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture
- **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Development guide
- **[docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md)** - API documentation

### For Users
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

## Best Practices

### Performance
- Avoid unnecessary re-renders with `memo`, `useMemo`, `useCallback`
- Leverage React Query cache
- Use Vite's code splitting
- Optimize images and assets

### Accessibility
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers

### Security
- Never expose secrets in frontend
- Only `VITE_` prefixed env vars are exposed
- Sanitize user input if accepting any
- Keep dependencies updated

## Git Workflow

### Branches
- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Commits
Use [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add export to CSV functionality
fix: correct sentiment pie chart colors
docs: update API integration guide
refactor: extract metrics logic to hook
style: format code with prettier
```

## Support

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions or share ideas
- **Documentation**: Check docs/ folder first

---

**Last Updated:** November 2024 (v1.0.0)
