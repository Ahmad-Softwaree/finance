"use server";

import {
  getCategorySchema,
  CategorySchema,
} from "@/validation/category.validation";

export const categoryMiddleware = async (data: CategorySchema) => {
  try {
    let schema = getCategorySchema();
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
