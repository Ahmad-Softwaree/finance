"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddCategory,
  useUpdateCategory,
} from "@/lib/react-query/queries/category.query";
import {
  getCategorySchema,
  CategorySchema,
} from "@/validation/category.validation";
import { Category } from "@/types/types";

const CategoryForm = ({ category }: { category?: Category }) => {
  const t = useTranslations("categories.form");
  const tCommon = useTranslations("common");

  const { mutateAsync, isPending } = category
    ? useUpdateCategory(category.id)
    : useAddCategory();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(getCategorySchema()),
    defaultValues: category
      ? category
      : {
          type: "EXPENSE",
        },
  });

  const onSubmit = async (data: CategorySchema) => {
    await mutateAsync(data);
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
          name="enName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("enNameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enNamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("arNameLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("arNamePlaceholder")}
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
          name="ckbName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("ckbNameLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("ckbNamePlaceholder")}
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
            : category
            ? tCommon("update")
            : tCommon("create")}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
