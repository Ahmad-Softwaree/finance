import { db } from "@/drizzle/drizzle";
import { transactions } from "@/drizzle/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, sql, gte } from "drizzle-orm";
import { headers } from "next/headers";

export const getAuthHeader = async () => {
  const auth = (await headers()).get("Cookie")?.replace("session=", "") || null;
  return auth;
};

export async function GET(request: NextRequest) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    // Get year from query params or use current year
    const currentYear = new Date().getFullYear();
    const year = parseInt(searchParams.get("year") || currentYear.toString());
    const startOfYear = new Date(year, 0, 1); // January 1st of selected year
    const endOfYear = new Date(year, 11, 31, 23, 59, 59); // December 31st of selected year

    // Query to get monthly stats for the selected year
    const monthlyStats = await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${transactions.date})`,
        type: transactions.type,
        total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, authHeader),
          gte(transactions.date, startOfYear),
          sql`${transactions.date} <= ${endOfYear}`
        )
      )
      .groupBy(
        sql`EXTRACT(MONTH FROM ${transactions.date})`,
        transactions.type
      );

    // Initialize data for all 12 months
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      monthName: new Date(year, i, 1).toLocaleString("en", {
        month: "short",
      }),
      income: 0,
      expense: 0,
    }));

    // Fill in the actual data
    monthlyStats.forEach((stat) => {
      const monthIndex = Number(stat.month) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        if (stat.type === "INCOME") {
          monthlyData[monthIndex].income = Number(stat.total);
        } else if (stat.type === "EXPENSE") {
          monthlyData[monthIndex].expense = Number(stat.total);
        }
      }
    });

    // Calculate totals
    const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
    const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);

    return NextResponse.json(
      {
        data: monthlyData,
        summary: {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
