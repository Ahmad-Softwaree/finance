"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "@/types/types";
import { useDeleteCategory } from "@/lib/react-query/queries/category.query";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { ENUMs } from "@/lib/enums";

const CategoryCard = (val: Category) => {
  const t = useTranslations("categories");
  const router = useRouter();
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    router.push(`${ENUMs.PAGES.CATEGORIES}/${val.id}/edit`);
  };

  const handleDelete = async () => {
    await deleteCategory(val.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{val.name}</h3>
            <Badge variant={val.type === "INCOME" ? "default" : "destructive"}>
              {t(`type.${val.type.toLowerCase()}` as any)}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="gap-2">
            <Edit className="h-4 w-4" />
            {t("edit")}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="gap-2">
            <Trash2 className="h-4 w-4" />
            {t("delete")}
          </Button>
        </CardFooter>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={t("deleteDialog.title")}
        description={t("deleteDialog.description", { name: val.name })}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default CategoryCard;
