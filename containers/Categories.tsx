"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import NoData from "@/components/shared/NoData";
import { PaginationControls } from "@/components/shared/PaginationControls";
import TypeFilter from "@/components/shared/TypeFilter";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Category, PaginationObject } from "@/types/types";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const Categories = ({ data }: { data: PaginationObject<Category> }) => {
  const t = useTranslations("categories");
  if ((data as any).__isError) {
    toast.error((data as any).message);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <div className="flex gap-2">
          <TypeFilter />
          <Link href={`/dashboard/categories/new`}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("add")}
            </Button>
          </Link>
        </div>
      </div>

      {data.data.length === 0 && <NoData />}

      {data.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((category: Category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      )}

      <PaginationControls totalPages={data.total_page} total={data.total} />
    </div>
  );
};

export default Categories;
