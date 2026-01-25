# 💰 FinanceTrack

> **Smart Expense Management Platform**

FinanceTrack is a modern, full-stack expense management application built with Next.js 16, featuring secure authentication, multi-language support, and a beautiful UI powered by shadcn/ui and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 🎯 Core Features

- **💳 Expense Tracking** - Track and categorize your expenses in real-time
- **📊 Budget Management** - Set and monitor budgets across different categories
- **📈 Financial Insights** - Visualize spending patterns with interactive charts
- **🔐 Secure Authentication** - Powered by Clerk with social login support
- **🌍 Multi-language Support** - Available in English, Arabic, and Kurdish (CKB)
- **🎨 Modern UI/UX** - Beautiful interface built with shadcn/ui components
- **🌙 Dark/Light Mode** - Seamless theme switching with next-themes
- **⚡ Real-time Updates** - Instant data synchronization with React Query

### 🛠️ Technical Features

- **Server Components** - Optimized performance with React Server Components
- **Type Safety** - Full TypeScript coverage for reliability
- **Responsive Design** - Mobile-first approach with Tailwind CSS 4
- **Internationalization** - Built with next-intl for seamless translations
- **State Management** - Efficient client-side state with React Query & Zustand
- **Form Handling** - Robust forms with react-hook-form and Zod validation
- **Database** - PostgreSQL with Prisma ORM
- **Cookie Management** - Type-safe cookies with cookies-next

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
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/finance"

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
   bun run prisma generate
   bun run prisma db push
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
│   │   ├── (auth)/              # Protected routes (dashboard)
│   │   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── sign-in/         # Clerk sign-in
│   │   │   └── sign-up/         # Clerk sign-up
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Home page
│   │   └── providers.tsx        # Client-side providers
│   └── api/                     # API routes
├── components/                   # React components
│   ├── ui/                      # shadcn/ui primitives
│   ├── layouts/                 # Layout components (Header, Footer)
│   ├── sections/                # Page sections (Hero, Features)
│   ├── forms/                   # Form components
│   ├── cards/                   # Card components
│   ├── shared/                  # Shared utilities
│   └── table/                   # Table components
├── lib/                         # Utility functions and configurations
│   ├── react-query/             # React Query setup
│   │   ├── actions/             # Server actions
│   │   ├── queries/             # Query hooks
│   │   ├── middleware/          # Query middleware
│   │   └── keys.ts              # Query keys
│   ├── config/                  # App configuration
│   ├── store/                   # Zustand stores
│   ├── enums.ts                 # Global enums and constants
│   ├── utils.ts                 # Utility functions
│   └── error-handler.ts         # Error handling utilities
├── i18n/                        # Internationalization
│   ├── routing.ts               # i18n routing config
│   ├── request.ts               # Server-side i18n
│   └── navigation.ts            # Client-side i18n navigation
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   ├── ar.json                  # Arabic translations
│   └── ckb.json                 # Kurdish translations
├── prisma/                      # Database schema
│   ├── schema.prisma            # Prisma schema
│   └── migrations/              # Database migrations
├── docs/                        # Documentation
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
├── validation/                  # Zod validation schemas
├── providers/                   # React context providers
├── proxy.ts                     # Clerk middleware configuration
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
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** - i18n for Next.js App Router

### Other Tools

- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark/light mode
- **[cookies-next](https://github.com/andreizanik/cookies-next)** - Cookie management
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Recharts](https://recharts.org/)** - Data visualization

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
bun run dev          # Start development server

# Build
bun run build        # Build for production
bun run start        # Start production server

# Linting
bun run lint         # Run ESLint

# Database
bunx prisma generate # Generate Prisma client
bunx prisma db push  # Push schema to database
bunx prisma studio   # Open Prisma Studio
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
