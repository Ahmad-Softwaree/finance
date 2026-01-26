"use client";

import { useQueryStates, parseAsString } from "nuqs";

export function useTypeFilterQuery() {
  return useQueryStates({
    type: parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  });
}

export type TypeFilterQueryParams = ReturnType<typeof useTypeFilterQuery>[0];
