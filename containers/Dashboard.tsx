"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { MonthlyStatsResponse } from "@/lib/react-query/actions/dashboard.action";
import { ArrowRightLeft, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import currency from "currency.js";
import YearFilter from "@/components/shared/YearFilter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = ({ data }: { data: MonthlyStatsResponse }) => {
  const t = useTranslations("dashboard");

  if ((data as any).__isError) {
    toast.error((data as any).message);
  }

  const chartData = data?.data || [];
  const summary = data?.summary || {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  };

  // Format currency helper
  const formatCurrency = (amount: number) =>
    currency(amount, {
      symbol: "IQD",
      separator: ",",
      decimal: ".",
      precision: 0,
    }).format();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <YearFilter />
          <Button asChild className="gap-2">
            <Link href="/dashboard/transactions">
              <ArrowRightLeft className="h-4 w-4" />
              {t("viewTransactions")}
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard/categories">
              <Layers className="h-4 w-4" />
              {t("viewCategories")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalIncome")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 english_font">
              {formatCurrency(summary.totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalExpense")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 english_font">
              {formatCurrency(summary.totalExpense)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("balance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold english_font ${
                summary.balance >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
              {formatCurrency(summary.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("monthlyOverview")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t("monthlyOverviewDescription")}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="monthName"
                  tick={{
                    fill: "hsl(var(--foreground))",
                    fontSize: 13,
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{
                    fill: "hsl(var(--foreground))",
                    fontSize: 13,
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  itemStyle={{
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "14px",
                  }}
                  iconType="circle"
                />
                <Bar
                  dataKey="income"
                  fill="#22c55e"
                  name={t("income")}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name={t("expense")}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
