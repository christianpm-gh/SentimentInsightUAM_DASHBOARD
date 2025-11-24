# GitHub Copilot Instructions for SentimentInsight UAM Dashboard

## Project Overview

This is a React-based dashboard application built with TypeScript, Vite, and Tailwind CSS. It visualizes sentiment analysis data from the SentimentInsightUAM API.

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow TypeScript best practices with strict type checking
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Keep components small and focused on a single responsibility
- Use meaningful variable and function names

### Component Structure
- Place reusable components in `src/components/`
- Export components as default exports
- Define prop interfaces using TypeScript
- Keep component files focused on UI logic

### State Management
- Use React Query for server state (API data)
- Use local state (useState) for UI state
- Keep state as close to where it's used as possible

### API Integration
- All API calls should go through `src/api/client.ts`
- Use the `useMetrics` hook from `src/hooks/useMetrics.ts` for data fetching
- Handle loading and error states appropriately

### Type Safety
- Define types in `src/types.ts`
- Avoid using `any` type
- Use interfaces for object shapes
- Export types that are used across multiple files

### Styling
- Use Tailwind utility classes
- Follow the existing color scheme:
  - Blue for primary actions
  - Green for positive sentiment
  - Yellow for neutral sentiment
  - Red for negative sentiment
- Ensure responsive design (mobile-first approach)

### File Organization
```
src/
├── api/          # API client configuration
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── styles/       # Global styles
├── types.ts      # TypeScript type definitions
├── App.tsx       # Main app component
└── main.tsx      # App entry point
```

## Common Tasks

### Adding a New Component
1. Create a new file in `src/components/`
2. Define the component props interface
3. Implement the component using functional syntax
4. Export as default
5. Import and use in the parent component

### Adding a New API Hook
1. Define the response type in `src/types.ts`
2. Create the hook in `src/hooks/`
3. Use React Query's `useQuery` or `useMutation`
4. Handle loading and error states

### Modifying Styles
1. Use Tailwind utility classes when possible
2. For global styles, edit `src/styles/index.css`
3. Maintain consistency with existing components

## Testing Locally

1. Ensure the SentimentInsightUAM API is running on port 8001
2. Run `npm run dev` to start the development server
3. Test all features:
   - Scope filtering
   - Data visualization
   - Responsive layout
   - Error handling

## Build and Deployment

1. Run `npm run build` to create a production build
2. Test the build with `npm run preview`
3. Deploy the `dist/` folder to your hosting service

## Dependencies

### Core
- `react` & `react-dom`: UI framework
- `typescript`: Type safety
- `vite`: Build tool

### Styling
- `tailwindcss`: Utility-first CSS
- `autoprefixer` & `postcss`: CSS processing

### Data & API
- `axios`: HTTP client
- `react-query`: Data fetching and caching

### Visualization
- `recharts`: Charts (pie, line)
- `react-wordcloud`: Word cloud component

## Troubleshooting

### API Connection Issues
- Check that `VITE_API_BASE_URL` in `.env` is correct
- Verify the API is running and accessible
- Check browser console for CORS errors

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Type Errors
- Ensure all imports have proper type definitions
- Check that API response types match the defined interfaces
- Run `npm run build` to catch type errors
