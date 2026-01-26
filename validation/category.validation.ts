import { useTranslations } from "next-intl";
import { z } from "zod";

export const getCategorySchema = () => {
  const t = useTranslations("validation.category");
  return z.object({
    enName: z
      .string(t("nameRequired"))
      .min(1, t("nameRequired"))
      .max(100, t("nameTooLong")),
    arName: z
      .string(t("nameRequired"))
      .min(1, t("nameRequired"))
      .max(100, t("nameTooLong")),
    ckbName: z
      .string(t("nameRequired"))
      .min(1, t("nameRequired"))
      .max(100, t("nameTooLong")),
    type: z.enum(["INCOME", "EXPENSE"], { message: t("invalidType") }),
  });
};

export type CategorySchema = z.infer<ReturnType<typeof getCategorySchema>>;
