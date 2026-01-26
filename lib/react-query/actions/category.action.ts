"use server";

import { get, del, post, update } from "@/lib/config/api.config";
import { ENUMs } from "@/lib/enums";
import { URLs } from "@/lib/urls";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/lib/error-handler";
import { CategorySchema } from "@/validation/category.validation";
import { Category } from "@/types/types";

export type CRUDReturn = { message: string; data?: any };

export const getCategories = async (): Promise<Category[]> => {
  try {
    const result = await get(URLs.CATEGORIES, {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;

    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const result = await get(URLs.CATEGORY_BY_ID(id), {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;

    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const addCategory = async (
  formData: CategorySchema
): Promise<CRUDReturn> => {
  try {
    const result = await post(URLs.CATEGORIES, formData, {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.CATEGORIES);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const updateCategory = async (
  id: string,
  formData: CategorySchema
): Promise<CRUDReturn> => {
  try {
    const result = await update(URLs.CATEGORY_BY_ID(id), formData, {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.CATEGORIES);
    revalidatePath(`${ENUMs.TAGS.CATEGORIES}/${id}`);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const deleteCategory = async (id: string): Promise<CRUDReturn> => {
  try {
    const result = await del(URLs.CATEGORIES, id, {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;

    revalidatePath(ENUMs.TAGS.CATEGORIES);
    revalidatePath(`${ENUMs.TAGS.CATEGORIES}/${id}`);
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const getCategorySelection = async (
  type: "INCOME" | "EXPENSE"
): Promise<Category[]> => {
  try {
    const result = await get(`${URLs.CATEGORY_SELECTION}?type=${type}`, {
      tags: [ENUMs.TAGS.CATEGORIES],
    });
    if (result && (result as any).__isError) throw result as any;
    return result.data;
  } catch (error) {
    return handleServerError(error) as any;
  }
};
