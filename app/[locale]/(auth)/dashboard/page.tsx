import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
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
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("welcome")},{" "}
          <span className="english_font">{user?.firstName}</span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t("welcomeMessage")}
        </p>
      </div>

      <Button className="hover:scale-110" variant="default" size="lg" asChild>
        <Link href="/dashboard/transactions/new">{t("addTransaction")}</Link>
      </Button>
    </div>
  );
}
