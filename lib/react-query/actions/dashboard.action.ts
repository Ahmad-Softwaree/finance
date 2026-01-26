"use server";
import { get } from "@/lib/config/api.config";
import { ENUMs } from "@/lib/enums";
import { URLs } from "@/lib/urls";
import { handleServerError } from "@/lib/error-handler";
import { YearQueryParams } from "@/hooks/useYearQuery";

export type MonthlyData = {
  month: number;
  monthName: string;
  income: number;
  expense: number;
};

export type MonthlyStatsResponse = {
  data: MonthlyData[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
};

export const getMonthlyStats = async (
  searchParams?: YearQueryParams
): Promise<MonthlyStatsResponse> => {
  try {
    const params = new URLSearchParams();

    if (searchParams?.year) {
      params.append("year", searchParams.year.toString());
    }

    const url = `${URLs.DASHBOARD_MONTHLY_STATS}${
      params.toString() ? `?${params}` : ""
    }`;
    const result = await get(url, {
      tags: [ENUMs.TAGS.DASHBOARD],
    });
    if (result && (result as any).__isError) throw result as any;

    return result;
  } catch (error) {
    return handleServerError(error) as any;
  }
};
