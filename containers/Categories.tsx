"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Category } from "@/types/types";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

const Categories = ({ data }: { data: Category[] }) => {
  const t = useTranslations("categories");
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Link href={`/dashboard/categories/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("add")}
          </Button>
        </Link>
      </div>

      {data.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((category: Category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
