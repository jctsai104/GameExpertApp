# Overview

This is a modern cryptocurrency trading application called "GAME EXPERT" built with a full-stack architecture. The application features a React-based frontend with a Node.js/Express backend, using PostgreSQL for data storage and Drizzle ORM for database operations. The app provides cryptocurrency trading, portfolio management, and user account features with a gaming-themed UI design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture:
- **UI Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with CSS variables for theming
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: react-i18next for multi-language support (English and Traditional Chinese)
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
The backend uses Express.js with TypeScript:
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful API endpoints
- **Development**: Hot module replacement with Vite integration

## Data Storage Solution
- **Primary Database**: PostgreSQL hosted on Neon (serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema**: Type-safe database schema with Zod validation

# Key Components

## Database Schema
The application uses five main entities:
- **Users**: User accounts with authentication and balance tracking
- **Cryptocurrencies**: Available trading assets with real-time pricing
- **User Assets**: Individual user cryptocurrency holdings
- **Transactions**: Trading and transfer history
- **Orders**: Buy/sell order management

## Frontend Components
- **Header**: Navigation with logo, notifications, language switcher, and theme toggle
- **Bottom Navigation**: Mobile-friendly tab navigation with 3 tabs (首頁/交易/我的)
- **Ad Banner**: Promotional carousel with auto-rotation
- **Quick Actions**: Fast access to common trading operations
- **Coin Trends**: Real-time cryptocurrency price displays
- **Trading Interface**: Swap functionality and order management
- **Profile Management**: User account and portfolio overview

## Backend Services
- **Storage Interface**: Abstracted data access layer for all CRUD operations
- **Route Handlers**: RESTful endpoints for cryptocurrencies, users, assets, transactions, and orders
- **Error Handling**: Centralized error middleware with proper status codes

# Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Route Processing**: Express routes handle incoming requests
3. **Data Access**: Storage interface abstracts database operations
4. **Database Operations**: Drizzle ORM executes type-safe queries against PostgreSQL
5. **Response**: JSON responses sent back to client
6. **State Updates**: TanStack Query manages caching and UI updates

# External Dependencies

## Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: TailwindCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod resolvers for validation
- **Date Handling**: date-fns for date manipulation
- **Carousels**: Embla Carousel for image sliders

## Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution in development

## Development Tools
- **Build**: Vite for frontend bundling and esbuild for backend
- **TypeScript**: Full type safety across the stack
- **Replit Integration**: Special plugins for Replit development environment

# Deployment Strategy

## Build Process
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle Kit handles schema migrations

## Environment Configuration
- **Development**: Uses tsx with hot reloading via Vite
- **Production**: Serves bundled static files and runs compiled server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

## Scripts
- `dev`: Development server with hot reloading
- `build`: Production build for both frontend and backend
- `start`: Production server
- `db:push`: Apply database schema changes

The application is designed to be easily deployable on platforms that support Node.js with PostgreSQL, with special consideration for Replit's development environment through custom plugins and error handling.

# Recent Changes (July 14, 2025)

## Navigation Updates
- Simplified bottom navigation from 5 tabs to 3 tabs as requested
- Removed scan and orders pages from navigation
- Updated routing to only include: Home (首頁), Trading (交易), and Profile (我的)
- Maintained mobile-first responsive design with proper grid layout

## Home Page Enhancements
- Added asset overview section with balance display and hide/show toggle
- Integrated voucher system indicator
- Maintained gaming-themed design with neon accents
- All components follow mobile-first RWD principles