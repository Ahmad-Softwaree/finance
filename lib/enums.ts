export const ENUMs = {
  GLOBAL: {
    PER_PAGE: 30,
    DEFAULT_LANG: "ckb",
  },
  TAGS: {
    TRANSACTIONS: "transactions",
    CATEGORIES: "categories",
  },
  PAGES: {
    HOME: "/",
    LOGIN: "/sign-in",
    REGISTER: "/sign-up",
    DASHBOARD: "/dashboard",
    TRANSACTIONS: "/dashboard/transactions",
    CATEGORIES: "/dashboard/categories",
  },
} as const;

export type ENUMSs = typeof ENUMs;
// Type for Tags from the values

export type TAGs = ENUMSs["TAGS"][keyof ENUMSs["TAGS"]];
