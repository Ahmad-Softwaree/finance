import Dashboard from "@/containers/Dashboard";
import { getMonthlyStats } from "@/lib/react-query/actions/dashboard.action";
import { YearQueryParams } from "@/hooks/useYearQuery";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<YearQueryParams>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let _searchParams = await searchParams;
  const data = await getMonthlyStats(_searchParams);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Dashboard data={data} />
    </div>
  );
}
