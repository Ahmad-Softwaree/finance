"use server";
import { del, get, post, update } from "@/lib/config/api.config";
import { ENUMs } from "@/lib/enums";
import { URLs } from "@/lib/urls";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/lib/error-handler";
import { TransactionSchema } from "@/validation/transaction.validation";
import { Transaction } from "@/types/types";
export type CRUDReturn = { message: string; data?: any };

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const result = await get(URLs.TRANSACTIONS, {
      tags: [ENUMs.TAGS.TRANSACTIONS],
    });
    if (result && (result as any).__isError) throw result as any;

    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  try {
    const result = await get(URLs.TRANSACTION_BY_ID(id), {
      tags: [ENUMs.TAGS.TRANSACTIONS],
    });
    if (result && (result as any).__isError) throw result as any;

    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const addTransaction = async (
  formData: TransactionSchema
): Promise<CRUDReturn> => {
  try {
    const result = await post(URLs.TRANSACTIONS, formData, {
      tags: [ENUMs.TAGS.TRANSACTIONS],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.TRANSACTIONS);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const updateTransaction = async (
  id: string,
  formData: TransactionSchema
): Promise<CRUDReturn> => {
  try {
    const result = await update(URLs.TRANSACTION_BY_ID(id), formData, {
      tags: [ENUMs.TAGS.TRANSACTIONS],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.TRANSACTIONS);
    revalidatePath(`${ENUMs.TAGS.TRANSACTIONS}/${id}`);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const deleteTransaction = async (id: string): Promise<CRUDReturn> => {
  try {
    const result = await del(URLs.TRANSACTIONS, id, {
      tags: [ENUMs.TAGS.TRANSACTIONS],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.TRANSACTIONS);
    revalidatePath(`${ENUMs.TAGS.TRANSACTIONS}/${id}`);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};
