import { db } from "@/drizzle/drizzle";
import { categories, transactions } from "@/drizzle/db/schema";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const getLocaleHeader = async () => {
  const lang = (await headers()).get("x-locale") || "en";
  return lang;
};

export const getAuthHeader = async () => {
  const auth = (await headers()).get("Cookie")?.replace("session=", "") || null;
  return auth;
};

export const fieldLocalizer = (
  item: any,
  locale: string,
  fieldBase: string
) => {
  const localizedField = `${locale}${fieldBase}`;
  return item[localizedField] || item[`${"en"}${fieldBase}`] || "";
};

export async function GET() {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const locale = await getLocaleHeader();

    const transactionList = await db
      .select({
        transaction: transactions,
        category: categories,
      })
      .from(transactions)
      .where(eq(transactions.userId, authHeader))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .orderBy(desc(transactions.createdAt));
    const localizedTransactions = transactionList.map(
      ({ transaction, category }) => ({
        ...transaction,
        name: fieldLocalizer(transaction, locale, "Name"),
        category: category
          ? {
              ...category,
              name: fieldLocalizer(category, locale, "Name"),
            }
          : null,
      })
    );
    return NextResponse.json(
      {
        message: "Transactions retrieved successfully",
        data: localizedTransactions,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    let body = await request.json();
    const [transaction] = await db
      .insert(transactions)
      .values({
        ...body,
        userId: authHeader,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Transaction created successfully",
        data: transaction,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
