export const URLs = {
  // Transaction endpoints
  TRANSACTIONS: `/transactions`,
  TRANSACTION_BY_ID: (id: string | number) => `/transactions/${id}`,

  // Category endpoints
  CATEGORIES: `/category`,
  CATEGORY_BY_ID: (id: string | number) => `/category/${id}`,
  CATEGORY_SELECTION: `/category/selection`,
} as const;
