"use client";

import { useQueryStates, parseAsStringEnum } from "nuqs";

export function useTypeQuery() {
  return useQueryStates({
    type: parseAsStringEnum(["INCOME", "EXPENSE", ""])
      .withDefault("")
      .withOptions({
        shallow: false,
      }),
  });
}

export type TypeQueryParams = ReturnType<typeof useTypeQuery>[0];
