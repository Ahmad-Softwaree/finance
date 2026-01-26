"use client";

import { useEffect } from "react";
import {
  useAddTransaction,
  useUpdateTransaction,
} from "@/lib/react-query/queries/transaction.query";
import { useGetCategorySelection } from "@/lib/react-query/queries/category.query";
import {
  getTransactionSchema,
  TransactionSchema,
} from "@/validation/transaction.validation";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types/types";
import { buildFormData, isFileForm } from "@/lib/functions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

const TransactionForm = ({ transaction }: { transaction?: Transaction }) => {
  const t = useTranslations("transactions.form");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const { mutateAsync, isPending } = transaction
    ? useUpdateTransaction(transaction.id)
    : useAddTransaction();
  const form = useForm<TransactionSchema>({
    resolver: zodResolver(getTransactionSchema()),
    defaultValues: transaction
      ? {
          ...transaction,
          date: transaction.date
            ? dayjs(transaction.date).format("YYYY-MM-DD")
            : undefined,
        }
      : {
          type: "EXPENSE",
        },
  });

  const typeValue = form.watch("type");

  const { data: categorySelection, refetch: refetchCategories } =
    useGetCategorySelection(typeValue);
  useEffect(() => {
    if (typeValue) {
      refetchCategories();
      if (transaction) {
        form.setValue("categoryId", transaction.categoryId);
      } else {
        form.setValue("categoryId", "");
      }
    }
  }, [typeValue, refetchCategories, form, locale]);

  const onSubmit = async (data: TransactionSchema) => {
    const payload = isFileForm(data) ? buildFormData(data) : data;
    await mutateAsync(payload as any);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("typeLabel")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("typePlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INCOME">{t("income")}</SelectItem>
                  <SelectItem value="EXPENSE">{t("expense")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("categoryLabel")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("categoryPlaceholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorySelection?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("amountLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t("amountPlaceholder")}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("dateLabel")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal english_font",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="english_font">
                          {t("datePlaceholder")}
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="english_font"
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(
                        date ? dayjs(date).format("YYYY-MM-DD") : undefined
                      )
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("enDescLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enDescPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("arDescLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("arDescPlaceholder")}
                  {...field}
                  dir="rtl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ckbDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ckbDescLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("ckbDescPlaceholder")}
                  {...field}
                  dir="rtl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending
            ? tCommon("submitting")
            : transaction
            ? tCommon("update")
            : tCommon("create")}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
