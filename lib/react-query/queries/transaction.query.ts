"use client";

import { useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../actions/transaction.action";
import { handleMutationError, throwIfError } from "@/lib/error-handler";
import { toast } from "sonner";
import { ENUMs } from "@/lib/enums";
import { QUERY_KEYS } from "../keys";
import { transactionMiddleware } from "../middleware/transaction.middleware";
import { TransactionSchema } from "@/validation/transaction.validation";

export const useAddTransaction = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TransactionSchema) => {
      await transactionMiddleware(formData);
      const result = await addTransaction(formData);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("transactions.createSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      router.push(ENUMs.PAGES.TRANSACTIONS);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.transactionCreate", (msg) =>
        toast.error(msg)
      );
    },
  });
};

export const useUpdateTransaction = (id: string) => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: TransactionSchema) => {
      const result = await updateTransaction(id, formData);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("transactions.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      router.push(`${ENUMs.PAGES.TRANSACTIONS}`);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.transactionUpdate", (msg) =>
        toast.error(msg)
      );
    },
  });
};

export const useDeleteTransaction = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteTransaction(id);
      return throwIfError(result);
    },
    onSuccess: () => {
      toast.success(t("transactions.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRANSACTIONS] });
      router.push(ENUMs.PAGES.TRANSACTIONS);
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "errors.transactionDelete", (msg) =>
        toast.error(msg)
      );
    },
  });
};
