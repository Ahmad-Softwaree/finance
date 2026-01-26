import { db } from "@/drizzle/drizzle";
import { categories, transactions } from "@/drizzle/db/schema";
import { headers } from "next/headers";
import { eq, desc, and } from "drizzle-orm";
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

export async function GET(request: NextRequest) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const locale = await getLocaleHeader();
    let conditions = [eq(transactions.userId, authHeader)];

    const type = searchParams.get("type");
    if (type != undefined && type !== "") {
      conditions.push(eq(transactions.type, type as any));
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "30");
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
      .select({ count: eq(transactions.id, transactions.id) })
      .from(transactions)
      .where(and(...conditions));

    const total = Number(count) || 0;
    const total_page = Math.ceil(total / limit);

    const transactionList = await db
      .select({
        transaction: transactions,
        category: categories,
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);

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
        data: localizedTransactions,
        next: page < total_page,
        total,
        total_page,
        page,
        limit,
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
