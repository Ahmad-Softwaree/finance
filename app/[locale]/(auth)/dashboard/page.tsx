import { auth, currentUser } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const t = await getTranslations("dashboard");

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("welcome")}, {user?.firstName || "there"}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t("welcomeMessage")}
          </p>
        </div>
      </div>
    </div>
  );
}
