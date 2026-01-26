"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
const Breadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumbs(pathname);
  const t = useTranslations("breadcrumbs");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, i) => {
          const isLast = i === breadcrumbs.length - 1;
          let exists = t.has(item.label as any);
          if (!exists) return null;

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{t(item.label as any)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>
                    {t(item.label as any)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
export function buildBreadcrumbs(pathname: string) {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "dashboard");

  let path = "/dashboard";

  const parts = segments.map((segment) => {
    path += `/${segment}`;

    return {
      label: segment,
      href: path,
    };
  });

  return [{ label: "dashboard", href: "/dashboard" }, ...parts];
}
