"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Transaction } from "@/types/types";
import { useDeleteTransaction } from "@/lib/react-query/queries/transaction.query";
import DeleteDialog from "@/components/shared/DeleteDialog";
import { ENUMs } from "@/lib/enums";
import dayjs from "dayjs";
import currency from "currency.js";

const TransactionCard = (val: Transaction) => {
  const t = useTranslations("transactions");
  const router = useRouter();
  const { mutateAsync: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    router.push(`${ENUMs.PAGES.TRANSACTIONS}/${val.id}/edit`);
  };

  const handleDelete = async () => {
    await deleteTransaction(val.id);
    setDeleteDialogOpen(false);
  };

  // Format amount with IQD currency
  const formattedAmount = currency(val.amount, {
    symbol: "IQD",
    separator: ",",
    decimal: ".",
    precision: 0,
  }).format();

  // Format date with dayjs
  const formattedDate = dayjs(val.date).format("MMM DD, YYYY");

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={val.type === "INCOME" ? "default" : "destructive"}>
                {t(`type.${val.type.toLowerCase()}` as any)}
              </Badge>
              <Badge variant="outline">{val.category.name}</Badge>
            </div>
            <div className="english_font flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t("amount")}</p>
            <p
              className={`text-2xl font-bold english_font ${
                val.type === "INCOME"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
              {val.type === "INCOME" ? "+" : "-"}
              {formattedAmount}
            </p>
          </div>
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">{t("description")}</p>
            <p className="text-sm mt-1">{val.desc}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end pt-3 border-t">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEdit}
            title={t("edit")}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setDeleteDialogOpen(true)}
            title={t("delete")}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={t("deleteDialog.title")}
        description={t("deleteDialog.description")}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TransactionCard;
