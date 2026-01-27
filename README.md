# 💰 FinanceTrack

> **Smart Expense Management Platform with Real-Time Analytics**

FinanceTrack is a modern, full-stack expense management application built with Next.js 16, featuring a comprehensive dashboard with monthly analytics, secure authentication, multi-language support, and a beautiful UI powered by shadcn/ui and Tailwind CSS 4. Track your income and expenses, visualize your financial data with interactive charts, and manage your budget efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)

---

## ✨ Features

### 🎯 Core Features

- **📊 Interactive Dashboard** - Comprehensive overview with monthly income/expense charts
  - Visual bar charts showing income vs expenses for 12 months
  - Summary cards displaying total income, expenses, and balance
  - Year filter to view historical data (last 10 years)
  - Real-time data updates
  - IQD currency formatting with comma separators
- **💳 Transaction Management** - Track and categorize your financial transactions
  - Create, read, update, and delete transactions
  - Categorize transactions as income or expense
  - Multi-language descriptions (English, Arabic, Kurdish)
  - Date tracking for each transaction
  - Type filtering (Income/Expense)
  - Pagination for large datasets
  - Search functionality
- **📁 Category Management** - Organize your finances with custom categories
  - Create and manage custom categories
  - Assign types (Income/Expense) to categories
  - Multi-language category names
  - Category-based transaction grouping
  - Type filtering
  - Pagination support
- **🔐 Secure Authentication** - Powered by Clerk
  - Email/password authentication
  - Social login support (Google, GitHub)
  - Protected routes with middleware
  - User profile management
  - Session management
- **🌍 Multi-language Support** - Fully internationalized
  - English (en)
  - Arabic (ar) with RTL support
  - Kurdish/Sorani (ckb)
  - Language toggle in header
  - All content translated including UI, forms, and notifications
- **🎨 Modern UI/UX** - Beautiful and responsive interface
  - Built with shadcn/ui components
  - Tailwind CSS 4 for styling
  - Mobile-first responsive design
  - Smooth animations with Motion
  - Lucide React icons throughout
- **🌙 Dark/Light Mode** - Seamless theme switching
  - System preference detection
  - Manual theme toggle
  - Persistent theme selection
  - Chart colors adapt to theme
- **⚡ Real-time Updates** - Instant data synchronization
  - React Query for efficient caching
  - Optimistic updates
  - Background refetching
  - Toast notifications for actions

### 🛠️ Technical Features

- **Server-First Architecture** - Optimized performance
  - React Server Components (RSC) for initial data fetching
  - Server Actions for mutations
  - Minimal client-side JavaScript
  - Efficient data streaming
- **Type Safety** - Full TypeScript coverage
  - Strict type checking
  - Zod schema validation
  - Type-safe API routes
  - Type-safe URL parameters with nuqs
- **Database** - PostgreSQL with Drizzle ORM
  - Relational database design
  - Migrations for schema changes
  - Type-safe queries
  - User-specific data isolation
- **Form Handling** - Robust and validated
  - React Hook Form integration
  - Zod validation schemas
  - Client and server-side validation
  - Multi-language error messages
- **State Management** - Efficient and scalable
  - React Query for server state
  - Zustand for client state
  - nuqs for URL state
  - Cookies-next for persistent data
- **Error Handling** - Comprehensive error management
  - Custom error handler utility
  - Toast notifications
  - Error boundaries
  - User-friendly error messages

---

## 🚀 Getting Started

### Prerequisites

- **Bun** (Package manager - REQUIRED)
- **Node.js** 20+ (Runtime)
- **PostgreSQL** (Database)
- **Clerk Account** (Authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ahmad-Softwaree/finance.git
   cd finance
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database (Neon PostgreSQL recommended)
   DATABASE_URL="postgresql://user:password@host/database"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Set up the database**

   ```bash
   # Generate Drizzle client
   bun run db:push

   # Optional: Seed database with sample data
   bun run db:seed

   # Optional: Open Drizzle Studio to view data
   bun run db:studio
   ```

5. **Run the development server**

   ```bash
   bun run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
finance/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── (auth)/              # Protected routes (requires authentication)
│   │   │   ├── dashboard/       # Main dashboard with charts
│   │   │   │   ├── page.tsx     # Dashboard overview
│   │   │   │   ├── transactions/ # Transaction management
│   │   │   │   └── categories/  # Category management
│   │   ├── (root)/              # Public routes
│   │   │   ├── sign-in/         # Clerk sign-in page
│   │   │   └── sign-up/         # Clerk sign-up page
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Home/landing page
│   │   └── providers.tsx        # Client-side providers
│   └── api/                     # API routes
│       ├── dashboard/           # Dashboard API
│       │   └── monthly-stats/   # Monthly statistics endpoint
│       ├── transactions/        # Transaction CRUD endpoints
│       └── category/            # Category CRUD endpoints
├── components/                   # React components
│   ├── ui/                      # shadcn/ui primitives ONLY
│   ├── layouts/                 # Layout components (Header, Footer, Breadcrumbs)
│   ├── sections/                # Page sections (Hero)
│   ├── forms/                   # Form components (TransactionForm, CategoryForm)
│   ├── cards/                   # Card components (TransactionCard, CategoryCard)
│   ├── shared/                  # Shared utilities (Filters, Modals, Pagination)
│   └── table/                   # Table components
├── containers/                   # Container components (Dashboard, Transactions, Categories)
├── lib/                         # Utility functions and configurations
│   ├── react-query/             # React Query setup
│   │   ├── actions/             # Server actions (transaction, category, dashboard)
│   │   ├── queries/             # Query hooks
│   │   └── keys.ts              # Query keys
│   ├── config/                  # API configuration
│   ├── store/                   # Zustand stores
│   ├── enums.ts                 # Global enums and constants
│   ├── urls.ts                  # API endpoint URLs
│   ├── utils.ts                 # Utility functions
│   ├── functions.ts             # Helper functions
│   └── error-handler.ts         # Error handling utilities
├── hooks/                       # Custom React hooks
│   ├── usePaginationQueries.tsx # Pagination state
│   ├── useTypeQuery.tsx         # Type filter state
│   ├── useYearQuery.tsx         # Year filter state
│   └── useSearchQuery.tsx       # Search state
├── i18n/                        # Internationalization
│   ├── routing.ts               # i18n routing config
│   ├── request.ts               # Server-side i18n
│   └── navigation.ts            # Client-side i18n navigation
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   ├── ar.json                  # Arabic translations
│   └── ckb.json                 # Kurdish translations
├── drizzle/                     # Database
│   ├── drizzle.ts               # Drizzle client
│   ├── seed.ts                  # Database seeding
│   └── db/                      # Database schema
│       └── schema.ts            # Table definitions
├── docs/                        # Comprehensive documentation
│   ├── component-organization.md
│   ├── ui-components.md
│   ├── authentication.md
│   ├── data-fetching-error-handling.md
│   ├── internationalization.md
│   ├── theme-dark-light-mode.md
│   ├── cookie-management.md
│   ├── url-parameters.md
│   └── motion.md
├── types/                       # TypeScript type definitions
│   ├── types.ts                 # Application types
│   └── global.ts                # Global type declarations
├── validation/                  # Zod validation schemas
│   ├── transaction.validation.ts
│   └── category.validation.ts
├── providers/                   # React context providers
│   ├── query-provider.tsx       # React Query provider
│   └── theme-provider.tsx       # Theme provider
├── proxy.ts                     # Clerk middleware configuration
├── drizzle.config.ts            # Drizzle configuration
└── AGENTS.md                    # AI agent coding standards
```

---

## 🏗️ Tech Stack

### Framework & Core

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Bun](https://bun.sh/)** - Fast package manager and runtime

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Motion](https://motion.dev/)** - Smooth animations

### Authentication & State

- **[Clerk](https://clerk.com/)** - User authentication and management
- **[React Query](https://tanstack.com/query)** - Server state management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Client state management
- **[nuqs](https://nuqs.47ng.com/)** - Type-safe URL state management

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - Schema validation

### Database

- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe ORM with migrations
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL (recommended)

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - i18n for Next.js App Router

### Other Tools

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark/light mode
- **[cookies-next](https://github.com/andreizanik/cookies-next)** - Cookie management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Recharts](https://recharts.org/)** - Data visualization and charts
- **[currency.js](https://currency.js.org/)** - Currency formatting (IQD)
- **[dayjs](https://day.js.org/)** - Date manipulation

---

## 🎨 UI Components

This project uses **shadcn/ui** exclusively. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# ... etc
```

**Style:** New York  
**Icons:** Lucide React only

---

## 🌍 Internationalization

Supported languages:

- 🇬🇧 English (`en`)
- 🇸🇦 Arabic (`ar`)
- 🇮🇶 Kurdish/Sorani (`ckb`)

Default language: Kurdish (CKB)

Translation files are located in `messages/` directory.

---

## 📜 Scripts

```bash
# Development
bun run dev          # Start development server on http://localhost:3000

# Build
bun run build        # Build for production
bun run start        # Start production server

# Linting
bun run lint         # Run ESLint

# Database
bun run db:push      # Push Drizzle schema to database
bun run db:studio    # Open Drizzle Studio (database GUI)
bun run db:seed      # Seed database with sample data
```

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Component Organization](docs/component-organization.md)** - Component structure and organization
- **[UI Components](docs/ui-components.md)** - shadcn/ui usage guide
- **[Authentication](docs/authentication.md)** - Clerk setup and patterns
- **[Data Fetching](docs/data-fetching-error-handling.md)** - Server Actions + React Query
- **[Internationalization](docs/internationalization.md)** - next-intl setup
- **[Theme Management](docs/theme-dark-light-mode.md)** - Dark/light mode
- **[Cookie Management](docs/cookie-management.md)** - cookies-next usage
- **[URL Parameters](docs/url-parameters.md)** - nuqs for URL state
- **[Motion/Animations](docs/motion.md)** - Animation patterns

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Read [AGENTS.md](AGENTS.md) for coding standards
2. Create a feature branch
3. Make your changes following the project patterns
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Ahmad Softwaree**

- GitHub: [@Ahmad-Softwaree](https://github.com/Ahmad-Softwaree)
- Portfolio: [Ahmad's Portfolio](https://github.com/Ahmad-Softwaree)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [Clerk](https://clerk.com/)

---

<div align="center">
  Made with ❤️ by Ahmad Softwaree
</div>
