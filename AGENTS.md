# 🤖 Agent Instructions & Coding Standards

This file contains **strict coding standards and architecture patterns** for the **FinanceTrack** project. All AI agents and developers **MUST** follow these rules to maintain consistency.

## 📚 About FinanceTrack

**FinanceTrack** is a modern expense management web application that provides a seamless financial tracking experience. Users can track expenses, manage budgets, analyze spending patterns, and achieve their financial goals.

### Core Features:

- 💰 **Expense Tracking** - Track and categorize expenses in real-time
- 📊 **Budget Management** - Set and monitor budgets across categories
- 📈 **Financial Insights** - Visualize spending patterns with interactive charts
- 🔐 **Secure Authentication** - User accounts with Clerk authentication
- 👤 **User Profiles** - Manage account settings and preferences
- 🌍 **Multi-language Support** - Available in English, Arabic, and Kurdish (CKB)
- 🎨 **Modern UI** - Built with Next.js 16, Tailwind CSS 4, and shadcn/ui
- 🌙 **Dark/Light Mode** - Seamless theme switching

### Homepage Sections:

- **Hero Section** - Eye-catching banner about financial management
- **Features Section** (Future) - Highlighting expense tracking, budgets, insights, security
- **How It Works** (Future) - Simple process: Track → Analyze → Save
- **Header** - Navigation with home, sign in/up, or user profile button
- **Footer** - Links and copyright information

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
- **Prisma** - Database ORM and migrations
  - Use Prisma Client for all database queries
  - Use Prisma Migrate for schema changes

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
- ❌ Other ORMs: TypeORM, Sequelize, Drizzle (use Prisma only)
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

**Remember:** Consistency is key to maintainability. Follow the patterns, use the approved tools, and keep the codebase clean.
