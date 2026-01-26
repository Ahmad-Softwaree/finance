"use server";

import {
  getTransactionSchema,
  TransactionSchema,
} from "@/validation/transaction.validation";

export const transactionMiddleware = async (data: TransactionSchema) => {
  try {
    let schema = getTransactionSchema();
    let validation = schema.safeParse({
      ...data,
    });
    if (!validation.success) {
      throw new Error(validation.error.issues[0].message);
    }
  } catch (error) {
    throw error;
  }
};
