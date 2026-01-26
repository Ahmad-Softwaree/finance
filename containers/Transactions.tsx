"use client";
import TransactionCard from "@/components/cards/TransactionCard";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Transaction } from "@/types/types";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

const Transactions = ({ data }: { data: Transaction[] }) => {
  const t = useTranslations("transactions");
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Link href={`/dashboard/transactions/new`}>
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
          {data.map((transaction: Transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
