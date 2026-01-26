"use client";

import { useQueryStates, parseAsInteger } from "nuqs";

export function useYearQuery() {
  const currentYear = new Date().getFullYear();

  return useQueryStates({
    year: parseAsInteger.withDefault(currentYear).withOptions({
      shallow: false,
    }),
  });
}

export type YearQueryParams = ReturnType<typeof useYearQuery>[0];
