# AI-Driven Software Architecture Decision System - Frontend

## Overview
This is the frontend application for the AI-Driven Software Architecture Decision System, built with React, TypeScript, and Vite.

## Features
- **Modern UI/UX**: Built with Tailwind CSS for responsive design
- **TypeScript**: Full type safety and better development experience
- **AI Integration**: OpenAI-powered chatbot and recommendations
- **Interactive Components**: Dynamic architecture diagrams and comparisons
- **User Management**: Authentication and personalized dashboards

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── QuestionCard.tsx
│   └── ...
├── pages/              # Application pages
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Questionnaire.tsx
│   └── ...
├── services/           # API and external services
│   ├── api.ts
│   ├── apiClient.ts
│   └── ...
├── contexts/           # React Context providers
│   └── UserContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── index.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Chart.js** - Data visualization

## Key Features

### 1. User Authentication
- Registration and login
- JWT token management
- Protected routes

### 2. AI-Powered Chatbot
- OpenAI integration
- Architecture-specific guidance
- Context-aware responses

### 3. Assessment System
- Comprehensive questionnaire
- Real-time recommendations
- AI-powered analysis

### 4. Learning Hub
- Case studies and best practices
- Interactive architecture diagrams
- Technology comparisons

### 5. Dashboard
- Personalized project management
- Analytics and metrics
- Interactive visualizations

### 6. Architecture Comparison
- Multiple comparison modes
- Scoring algorithms
- Export functionality

## Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Code Style
- ESLint configuration included
- Prettier formatting
- TypeScript strict mode

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Follow TypeScript best practices
2. Use functional components with hooks
3. Maintain component reusability
4. Add proper TypeScript types
5. Test components thoroughly

## Research Context

This frontend is part of a dissertation research project investigating AI-driven software architecture decision-making. The goal is to create an intuitive interface for architects and developers to make informed decisions.

## Author
Yash Rana (K2256939) - Kingston University
