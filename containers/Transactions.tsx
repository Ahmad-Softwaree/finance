"use client";
import TransactionCard from "@/components/cards/TransactionCard";
import NoData from "@/components/shared/NoData";
import { PaginationControls } from "@/components/shared/PaginationControls";
import TypeFilter from "@/components/shared/TypeFilter";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Transaction, PaginationObject } from "@/types/types";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const Transactions = ({ data }: { data: PaginationObject<Transaction> }) => {
  const t = useTranslations("transactions");
  if ((data as any).__isError) {
    toast.error((data as any).message);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <div className="flex gap-2">
          <TypeFilter />
          <Link href={`/dashboard/transactions/new`}>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("add")}
            </Button>
          </Link>
        </div>
      </div>

      {data.data.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((transaction: Transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </div>
      )}

      <PaginationControls totalPages={data.total_page} total={data.total} />
    </div>
  );
};

export default Transactions;
