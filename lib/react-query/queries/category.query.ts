"use client";

import { useRouter } from "@/i18n/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategorySelection,
} from "../actions/category.action";
import { handleMutationError, throwIfError } from "@/lib/error-handler";
import { toast } from "sonner";
import { ENUMs } from "@/lib/enums";
import { QUERY_KEYS } from "../keys";
import { categoryMiddleware } from "../middleware/category.middleware";
import { CategorySchema } from "@/validation/category.validation";

export const useAddCategory = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CategorySchema) => {
      const result = await addCategory(formData);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("categories.createSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CATEGORY_SELECTION],
      });
      router.push(ENUMs.PAGES.CATEGORIES);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.categoryCreate", (msg) =>
        toast.error(msg)
      );
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CategorySchema) => {
      const result = await updateCategory(id, formData);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("categories.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CATEGORY_SELECTION],
      });
      router.push(`${ENUMs.PAGES.CATEGORIES}`);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.categoryUpdate", (msg) =>
        toast.error(msg)
      );
    },
  });
};

export const useDeleteCategory = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteCategory(id);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("categories.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CATEGORY_SELECTION],
      });
      router.push(ENUMs.PAGES.CATEGORIES);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.categoryDelete", (msg) =>
        toast.error(msg)
      );
    },
  });
};

export const useGetCategorySelection = (type: "INCOME" | "EXPENSE") => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY_SELECTION, type],
    queryFn: async () => {
      const result = await getCategorySelection(type);
      return throwIfError(result);
    },
    enabled: !!type,
  });
};
