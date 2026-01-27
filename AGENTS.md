# 🤖 Agent Instructions & Coding Standards

This file contains **strict coding standards and architecture patterns** for the **FinanceTrack** project. All AI agents and developers **MUST** follow these rules to maintain consistency.

## 📚 About FinanceTrack

**FinanceTrack** is a modern, full-stack expense management web application that provides a comprehensive financial tracking experience. Users can track income and expenses, manage budgets, analyze spending patterns with interactive charts, and achieve their financial goals.

### Core Features Implemented:

- 📊 **Interactive Dashboard** - Real-time analytics with monthly income/expense charts
  - Visual bar charts showing income vs expenses for 12 months
  - Summary cards displaying total income, expenses, and balance
  - Year filter to view historical data (last 10 years)
  - IQD currency formatting with proper number separators
  - Responsive charts that adapt to dark/light mode
- 💰 **Transaction Management** - Complete CRUD operations for financial transactions
  - Create, read, update, and delete transactions
  - Categorize transactions as income or expense
  - Multi-language descriptions (English, Arabic, Kurdish)
  - Date tracking with dayjs
  - Type filtering (Income/Expense)
  - Pagination for large datasets
  - Search functionality
- 📁 **Category Management** - Custom categories for organizing finances
  - Create and manage custom categories
  - Assign types (Income/Expense) to categories
  - Multi-language category names
  - Category-based transaction grouping
  - Type filtering
  - Pagination support
- 🔐 **Secure Authentication** - User accounts with Clerk authentication
  - Email/password authentication
  - Social login support (Google, GitHub)
  - Protected routes with middleware
  - User profile management with UserButton
  - Session management
- 👤 **User Profiles** - Manage account settings and preferences
  - Profile editing through Clerk
  - User-specific data isolation
  - Secure session handling
- 🌍 **Multi-language Support** - Available in English, Arabic, and Kurdish (CKB)
  - Complete i18n with next-intl
  - Language switcher in header
  - RTL support for Arabic
  - All content fully translated
  - Dynamic locale-based routing
- 🎨 **Modern UI** - Built with Next.js 16, Tailwind CSS 4, and shadcn/ui
  - Responsive mobile-first design
  - Smooth animations with motion/react
  - Lucide React icons throughout
  - Consistent component patterns
- 🌙 **Dark/Light Mode** - Seamless theme switching
  - Persistent theme selection
  - System preference detection
  - Theme toggle button in header
  - Chart colors adapt to theme
  - All components theme-aware

### Database Schema:

- **Categories Table** - Stores user-defined categories
  - Multi-language names (en, ar, ckb)
  - Type (INCOME/EXPENSE)
  - User association
  - Timestamps
- **Transactions Table** - Stores all financial transactions
  - Amount (double precision)
  - Type (INCOME/EXPENSE)
  - Multi-language descriptions (en, ar, ckb)
  - Category reference (foreign key)
  - Date tracking
  - User association
  - Timestamps

### API Routes:

- **/api/dashboard/monthly-stats** - Monthly income/expense statistics
  - Returns 12 months of data for selected year
  - Grouped by month and type
  - Includes summary totals
- **/api/transactions** - Transaction CRUD operations
  - GET: List with pagination, filtering, and search
  - POST: Create new transaction
  - PUT: Update existing transaction
  - DELETE: Delete transaction
- **/api/category** - Category CRUD operations
  - GET: List with pagination and filtering
  - POST: Create new category
  - PUT: Update existing category
  - DELETE: Delete category
- **/api/category/selection** - Categories for dropdowns
  - Returns simplified category list for forms

---

## 🚨 CRITICAL: Project Configuration

### 📦 Package Manager

- **ALWAYS use `bun`** - This is the ONLY package manager for this project
- **NEVER use `npm`, `yarn`, or `pnpm`**
- All installation commands MUST use `bun add` or `bun install`

### 🔐 Environment Variables

- **ALWAYS use `.env`** - This is the ONLY environment file
- **NEVER create `.env.local`, `.env.example`, `.env.development`, or any other .env variants**
- All environment variables go in the single `.env` file
- The `.env` file is gitignored and safe for local development

---

## 🚨 CRITICAL: Library Enforcement

**ONLY** use the libraries and tools specified in this document. **DO NOT** introduce any other libraries without explicit approval.

### ✅ APPROVED LIBRARIES & TOOLS

#### **UI & Styling**

- **shadcn/ui** - ONLY UI component library allowed
- **Tailwind CSS 4** - For styling (with CSS variables)
- **Lucide React** - Icon library
- **cn() utility** from `@/lib/utils` - For conditional styling
- **motion/react** - Animation library (use via reusable components in animate.tsx)

#### **Data Fetching & State Management**

- **Server Actions** (`"use server"`) - For all data mutations and form submissions
- **React Query (@tanstack/react-query)** - Client-side state management (ONLY via Server Actions, never direct API calls)
- **React Server Components (RSC)** - Default for initial data fetching
- **Static Data** - For demo/placeholder content during development

**CRITICAL Server Actions Pattern:**

- Server Actions MUST be in `lib/react-query/actions/*.ts` files
- Server Actions MUST return plain objects (serializable data only)
- Server Actions MUST use error objects with `__isError` flag
- Server Actions MUST check for `__isError` at each async step
- See `docs/data-fetching-error-handling.md` for complete architecture

**CRITICAL React Query Pattern:**

- React Query hooks MUST be in `lib/react-query/queries/*.ts` files
- Mutations MUST use Server Actions as `mutationFn`
- Mutations MUST call `throwIfError(result)` to convert error objects to Error instances
- NEVER make direct fetch/axios calls in mutations
- See `docs/data-fetching-error-handling.md` for examples

#### **Framework & Core**

- **Next.js** - React framework (App Router)
- **React Server Components (RSC)** - Default component pattern
- **TypeScript** - All code must be TypeScript
- **Bun** - Package manager and runtime (ONLY package manager allowed)

#### **Forms & Validation**

- **Zod** - Schema validation (if needed for contact forms)

#### **URL & State Management**

- **nuqs** - Type-safe URL parameter management

#### **Theming**

- **next-themes** - Dark/light mode management

#### **Cookie Management**

- **cookies-next** - Cookie handling for Next.js (client and server)
  - **ALWAYS use `cookies-next`** for all cookie operations
  - **NEVER use** native `document.cookie`, `js-cookie`, or other cookie libraries

#### **Internationalization**

- **next-intl** - Internationalization framework for Next.js App Router
  - **ALWAYS use `next-intl`** for all translations
  - **NEVER use** i18next, react-i18next, or other i18n libraries

#### **Authentication**

- **Clerk** - Authentication and session management
  - **ALWAYS use Clerk** for all authentication needs
  - **NEVER use** NextAuth.js, Auth.js, or other auth libraries

#### **Database & ORM**

- **PostgreSQL** - Relational database
- **Drizzle ORM** - Database ORM and migrations
  - Use Drizzle for all database queries
  - Use Drizzle Kit for schema changes and migrations
  - Schema files go in `drizzle/db/schema.ts`

#### **File Uploads** (if needed)

- **uploadthing** - File upload service (already integrated)

### ❌ FORBIDDEN LIBRARIES

**DO NOT USE:**

- ❌ Other UI libraries: Material-UI, Ant Design, Chakra UI, etc. (use shadcn/ui only)
- ❌ Other form libraries: Formik (use react-hook-form with shadcn/ui Form)
- ❌ Custom HTTP clients: axios, fetch wrappers (use Server Actions instead)
- ❌ State management: Redux (Zustand is approved for client-only state)
- ❌ CSS frameworks: Bootstrap, Bulma, Foundation, etc.
- ❌ Icon libraries: Font Awesome, React Icons, Heroicons (use Lucide only)
- ❌ Other validation: Yup, Joi, class-validator (use Zod only)
- ❌ Cookie libraries: js-cookie, universal-cookie, react-cookie, or native document.cookie (use cookies-next only)
- ❌ Raw URL params: searchParams, useSearchParams, URLSearchParams (use nuqs only)
- ❌ Other auth: NextAuth.js, Auth.js, Passport.js (use Clerk only)
- ❌ Other ORMs: TypeORM, Sequelize, Prisma (use Drizzle only)
  Before adding ANY new library:

1. Check if it's in the APPROVED list
2. Check if existing approved libraries can solve the problem
3. If not listed, **ASK FOR PERMISSION** - do not proceed

---

## 📚 Architecture Guidelines

### 1️⃣ Component Organization

**See:** [docs/component-organization.md](docs/component-organization.md)

**Key Rules:**

- ✅ Extract components when pages exceed ~100 lines
- ✅ Organize by type: `ui/`, `cards/`, `forms/`, `layouts/`, `sections/`, `dashboard/`, `shared/`
- ❌ NO massive page files with hundreds of lines of JSX
- ❌ NO mixing unrelated components in the same file

**Folder Structure:**

```
components/
├── ui/          # shadcn/ui primitives ONLY
├── cards/       # Card components
├── forms/       # Form components
├── layouts/     # Layout components
├── sections/    # Page sections
├── dashboard/   # Dashboard-specific
└── shared/      # Globally shared
```

### 2️⃣ UI Components (shadcn/ui)

**See:** [docs/ui-components.md](docs/ui-components.md)

**Key Rules:**

- ✅ **ONLY use shadcn/ui** for all UI elements
- ✅ Install with: `npx shadcn@latest add <component>`
- ✅ Style: **New York**
- ✅ Icons: **Lucide React ONLY**
- ❌ **NO custom components** that replicate shadcn/ui functionality
- ❌ **NO other UI libraries**

**Installation:**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

---

## 🔄 Data Fetching & Error Handling Architecture

server-first architecture\*\* for data fetching:

1. **Server Components (RSC)** - Default for initial data fetching
2. **Server Actions Layer** (`lib/react-query/actions/*.ts`) - Server-side mutations with `"use server"`
3. **React Query Layer** (`lib/react-query/queries/*.ts`) - Client-side hooks for mutations and caching

### Critical Rules:

**Server Actions (`lib/react-query/actions/*.ts`):**

- ✅ MUST have `"use server"` directive at the top
- ✅ MUST return plain objects only (no Error instances)
- ✅ MUST check for `__isError` flag at each async operation
- ✅ MUST return error objects with `__isError: true` on failure
- ❌ NEVER throw errors in Server Actions (not serializable)
- ❌ NEVER use try/catch in Server Actions (return error objects instead)

**React Query Mutations (`lib/react-query/queries/*.ts`):**

- ✅ MUST use Server Actions as `mutationFn`
- ✅ MUST call `throwIfError(result)` after Server Action returns
- ✅ MUST import `throwIfError` from `@/lib/error-handler`
- ✅ MUST use `onError` handler to show toast notifications
- ❌ NEVER make direct fetch/axios calls
- ❌ NEVER handle errors in Server Actions (handle in React Query)

**Example Pattern:**

```typescript
// ❌ WRONG - Server Action
"use server";
export async function createExpense(data: ExpenseData) {
  const result = await post(URLs.CREATE_EXPENSE, data);
  if (result.__isError) {
    throw new Error(result.message); // ❌ Can't serialize Error!
  }
  return result;
}

// ✅ CORRECT - Server Action
("use server");
export async function createExpense(data: ExpenseData) {
  const result = await post(URLs.CREATE_EXPENSE, data);
  if (result && (result as any).__isError) {
    return result; // ✅ Return error object
  }
  return result;
}

// ✅ CORRECT - React Query Hook
export const useCreateExpense = () => {
  return useMutation({
    mutationFn: async (data: ExpenseData) => {
      const result = await createExpense(data);
      return throwIfError(result); // ✅ Throw here (client-side)
    },
    onError: (error: ApiError) => {
      toast.error(error.message); // ✅ Toast works!
    },
  });
};
```

---

## 🔐 Authentication with Clerk

**See:** [docs/authentication.md](docs/authentication.md)

This project uses **Clerk** for authentication:

### Key Files:

- **`proxy.ts`** - Clerk middleware configuration (route protection)
- **`app/[locale]/(auth)/sign-in/[[...sign-in]]/page.tsx`** - Sign-in page
- **`app/[locale]/(auth)/sign-up/[[...sign-up]]/page.tsx`** - Sign-up page
- **`app/[locale]/(auth)/dashboard/page.tsx`** - Protected dashboard

### Critical Rules:

**Route Protection:**

- ✅ Define protected routes in `proxy.ts` using `createRouteMatcher`
- ✅ Use `isPublicRoute` to allow public access
- ✅ Use `isProtectedRoute` for admin/protected routes
- ✅ Redirect authenticated users from auth pages

**Server Components:**

```typescript
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return <div>Hello {user?.firstName}!</div>;
}
```

**Client Components:**

```tsx
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}    showToast("error", error.message); // ✅ Toast works!
    },
  });
};
```

---

## ✅ Pre-Flight Checklist

Before writing ANY code:

### Libraries

- [ ] Am I using ONLY approved libraries?
- [ ] Do I need to install a new shadcn/ui component?
- [ ] Am I using NextAuth.js for authentication?
- [ ] Am I using Server Actions + React Query for data mutations?

### Data Fetching

- [ ] Is this a Server Action? Does it have `"use server"`?
- [ ] Am I returning error objects with `__isError` flag?
- [ ] Am I using `throwIfError()` in React Query mutations?
- [ ] Did I check for `__isError` at each async step?

### Components

- [ ] Is this component in the correct folder?
- [ ] Is the page file under ~100 lines?
- [ ] Am I using shadcn/ui components (not custom)?

### Authentication

- [ ] Did I use Clerk for authentication?
- [ ] Did I configure `proxy.ts` for route protection?
- [ ] Did I use `auth()` in Server Components?
- [ ] Did I use `<SignedIn>` / `<SignedOut>` in Client Components?
- [ ] Did I protect routes using `createRouteMatcher`?

### Data Fetching

- [ ] Did I create action file in `lib/react-query/actions/` (if needed)?
- [ ] Did I create query hooks in `lib/react-query/queries/` (if needed)?
- [ ] Did I add query keys to `lib/react-query/keys.ts` (if needed)?
- [ ] Did I use Server Components for initial data fetching?

### Code Quality

- [ ] All files are TypeScript (`.ts` or `.tsx`)?
- [ ] Server actions marked with `'use server'`?
- [ ] Client components marked with `'use client'`?
- [ ] Using `cn()` for conditional Tailwind classes?

---

## 🎯 Quick Reference

| Need          | Use                   | Location                              |
| ------------- | --------------------- | ------------------------------------- |
| Button        | `shadcn/ui`           | `npx shadcn@latest add button`        |
| Icons         | Lucide React          | `import { Icon } from "lucide-react"` |
| Styling       | Tailwind CSS + `cn()` | `className={cn("...")}`               |
| Page sections | Extract to component  | `components/sections/`                |
| URL params    | nuqs                  | Direct usage in components            |
| Theme         | next-themes           | `providers/theme-provider.tsx`        |
| Cookies       | cookies-next          | `getCookie()` / `setCookie()`         |
| Translation   | next-intl             | `useTranslations()` hook              |
| Auth config   | Clerk                 | `.env` and `proxy.ts`                 |
| Route protect | Clerk middleware      | `proxy.ts`                            |
| User data     | Clerk                 | `auth()` / `currentUser()`            |

---

## 📖 Documentation

### Core Architecture

- **[Component Organization](docs/component-organization.md)** - Component structure, folder organization, and file naming
- **[UI Components](docs/ui-components.md)** - shadcn/ui component usage and styling
- **[Authentication](docs/authentication.md)** - NextAuth.js setup, route protection, and security patterns
- **[Cookie Management](docs/cookie-management.md)** - cookies-next usage for client and server cookies
- **[Internationalization](docs/internationalization.md)** - next-intl setup and translation patterns
- **[Theme (Dark/Light Mode)](docs/theme-dark-light-mode.md)** - next-themes configuration
- **[URL Parameters](docs/url-parameters.md)** - nuqs for type-safe URL state management
- **[Motion/Animations](docs/motion.md)** - motion/react animation patterns
- **[Package Management](docs/package-management.md)** - Bun package manager guidelines
- **[Folder & File Conventions](docs/folder-file-conventions.md)** - Naming and organization standards
- **[Documentation Standards](docs/documentation-standards.md)** - How to write documentation

### Components

- [ ] Is the page file under ~100 lines?
- [ ] Am I using shadcn/ui components (not custom)?

### Code Quality

- [ ] All files are TypeScript (`.ts` or `.tsx`)?
- [ ] Client components marked with `'use client'`?
- [ ] Using `cn()` for conditional Tailwind classes?
- [ ] Using next-intl for all text content

3. Ask for clarification - do NOT improvise

## **Remember:** Consistency is key to maintainability. Follow the patterns, use the approved tools, and keep the codebase clean.

## 🎉 Project Status: Production Ready

### ✅ Completed Features

**Dashboard**

- ✅ Interactive monthly chart with income/expense bars
- ✅ Summary cards (Total Income, Total Expense, Balance)
- ✅ Year filter dropdown (last 10 years)
- ✅ IQD currency formatting throughout
- ✅ Responsive design for all screen sizes
- ✅ Dark/light mode support with theme-aware colors
- ✅ English font for numbers and currency

**Transactions**

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Multi-language descriptions (en, ar, ckb)
- ✅ Category association with dropdown
- ✅ Type selection (Income/Expense)
- ✅ Date picker with dayjs formatting
- ✅ Amount input with validation
- ✅ Pagination with page controls
- ✅ Type filter
- ✅ Search functionality
- ✅ Delete confirmation dialog
- ✅ Toast notifications for all actions

**Categories**

- ✅ Full CRUD operations
- ✅ Multi-language names (en, ar, ckb)
- ✅ Type assignment (Income/Expense)
- ✅ Pagination with page controls
- ✅ Type filter
- ✅ Delete confirmation dialog
- ✅ Used by transactions for categorization
- ✅ Toast notifications for all actions

**Authentication & Security**

- ✅ Clerk integration complete
- ✅ Protected routes with middleware
- ✅ User profile management
- ✅ Session handling
- ✅ Social login support
- ✅ User-specific data isolation

**Internationalization**

- ✅ English (en) - Complete
- ✅ Arabic (ar) - Complete with RTL
- ✅ Kurdish (ckb) - Complete
- ✅ Language switcher in header
- ✅ All UI elements translated
- ✅ Form validation messages
- ✅ Toast notifications
- ✅ Error messages

**UI/UX**

- ✅ Responsive mobile-first design
- ✅ Dark/light theme toggle
- ✅ Smooth animations with Motion
- ✅ shadcn/ui components throughout
- ✅ Consistent styling with Tailwind CSS 4
- ✅ Loading states
- ✅ Error states
- ✅ Empty states (NoData component)
- ✅ Breadcrumb navigation
- ✅ Header with navigation
- ✅ Footer with links

**Database**

- ✅ Drizzle ORM integration
- ✅ PostgreSQL schema
- ✅ Migrations support
- ✅ Seed script for sample data
- ✅ Type-safe queries
- ✅ User-specific data filtering

**Developer Experience**

- ✅ Full TypeScript coverage
- ✅ Comprehensive documentation in /docs
- ✅ Clear folder structure
- ✅ Consistent code patterns
- ✅ ESLint configuration
- ✅ Bun package manager
- ✅ Clear AGENTS.md guidelines

### 📊 Project Statistics

- **Total Pages**: 6 (Home, Dashboard, Transactions, Categories, Sign In, Sign Up)
- **API Routes**: 5 (Dashboard stats, Transactions CRUD, Categories CRUD)
- **Components**: 50+ reusable components
- **Languages**: 3 (English, Arabic, Kurdish)
- **Database Tables**: 2 (Categories, Transactions)
- **Documentation Files**: 11 comprehensive guides

### 🚀 Ready for Deployment

The project is **production-ready** and can be deployed to:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **Digital Ocean**
- Any platform supporting Node.js 20+

**Database**: Recommend using **Neon** (serverless PostgreSQL) for production.

### 🎯 Future Enhancements (Optional)

While the project is complete and functional, potential future additions could include:

- Budget tracking and alerts
- Recurring transactions
- Export to CSV/PDF
- Data visualization improvements (pie charts, line charts)
- Financial reports
- Multi-currency support
- Bank account integration
- Receipt upload with image storage
