import { useTranslations } from "next-intl";
import { z } from "zod";

export const getTransactionSchema = () => {
  const t = useTranslations("validation.transaction");
  return z.object({
    amount: z.number(t("amountPositive")).positive(t("amountPositive")),
    enDesc: z
      .string(t("descriptionRequired"))
      .min(1, t("descriptionRequired"))
      .max(255, t("descriptionTooLong")),
    arDesc: z
      .string(t("descriptionRequired"))
      .min(1, t("descriptionRequired"))
      .max(255, t("descriptionTooLong")),
    ckbDesc: z
      .string(t("descriptionRequired"))
      .min(1, t("descriptionRequired"))
      .max(255, t("descriptionTooLong")),
    type: z.enum(["INCOME", "EXPENSE"], t("invalidType")),
    date: z.string().optional(),
    categoryId: z.string().min(1, t("invalidCategoryId")),
  });
};

export type TransactionSchema = z.infer<
  ReturnType<typeof getTransactionSchema>
>;
