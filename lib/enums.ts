export const ENUMs = {
  GLOBAL: {
    PER_PAGE: 30,
    DEFAULT_LANG: "ckb",
  },
  TAGS: {},
  PAGES: {
    HOME: "/",
    LOGIN: "/sign-in",
    REGISTER: "/sign-up",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
  },
} as const;

export type ENUMSs = typeof ENUMs;
// Type for Tags from the values

export type TAGs = ENUMSs["TAGS"][keyof ENUMSs["TAGS"]];
