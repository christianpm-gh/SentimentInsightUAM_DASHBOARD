# SentimentInsight UAM Dashboard

A modern, responsive frontend dashboard built with React, TypeScript, Vite, and Tailwind CSS for visualizing sentiment analysis data from the SentimentInsightUAM API.

## Features

- **Scope Filtering**: Filter sentiment data by Department, Professor, or Course
- **KPI Cards**: Display key metrics including total comments, average sentiment score, and sentiment counts
- **Sentiment Distribution**: Interactive pie chart showing the distribution of positive, neutral, and negative sentiments
- **Trend Analysis**: Line chart displaying sentiment trends over time
- **Word Cloud**: Visual representation of the most frequently occurring words in comments

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Recharts** - Charting library
- **react-wordcloud** - Word cloud visualization

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- SentimentInsightUAM API running on `http://localhost:8001`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SentimentInsightUAM_DASHBOARD
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure the API endpoint in `.env` if needed:
```
VITE_API_BASE_URL=http://localhost:8001
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── client.ts          # Axios API client configuration
├── components/
│   ├── KPICards.tsx       # Summary statistics cards
│   ├── ScopeSelector.tsx  # Filter controls
│   ├── SentimentPie.tsx   # Pie chart for sentiment distribution
│   ├── TrendChart.tsx     # Line chart for trends over time
│   └── WordCloudComp.tsx  # Word cloud visualization
├── hooks/
│   └── useMetrics.ts      # React Query hook for fetching metrics
├── styles/
│   └── index.css          # Global styles and Tailwind imports
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## API Integration

The dashboard consumes the following endpoint from the SentimentInsightUAM API:

- `GET /api/dashboard/metrics?scope={scope}&value={value}`
  - Query parameters:
    - `scope` (optional): "department", "professor", or "course"
    - `value` (optional): The filter value

Expected response format:
```json
{
  "total_comments": 1000,
  "average_sentiment_score": 0.45,
  "sentiment_distribution": [
    { "sentiment": "positive", "count": 500 },
    { "sentiment": "neutral", "count": 300 },
    { "sentiment": "negative", "count": 200 }
  ],
  "sentiment_trends": [
    { "date": "2024-01", "positive": 50, "neutral": 30, "negative": 20 }
  ],
  "top_words": [
    { "text": "excellent", "value": 45 },
    { "text": "good", "value": 30 }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT