import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("signIn");
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <SignIn
          appearance={{
            theme: dark,
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border-2 border-border/50",
            },
          }}
          routing="path"
          path="/:locale/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
