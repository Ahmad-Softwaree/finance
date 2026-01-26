import { fieldLocalizer, getAuthHeader, getLocaleHeader } from "../route";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/drizzle";
import { transactions } from "@/drizzle/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const locale = await getLocaleHeader();

    const { id } = await params;

    const [transaction] = await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, authHeader)))
      .limit(1);

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    const localizedTransaction = {
      ...transaction,
      name: fieldLocalizer(transaction, locale, "Name"),
    };

    return NextResponse.json(
      {
        message: "Transaction retrieved successfully",
        data: localizedTransaction,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Check if transaction belongs to user
    const [existingTransaction] = await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, authHeader)))
      .limit(1);

    if (!existingTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    const [transaction] = await db
      .update(transactions)
      .set({ ...body, date: new Date(body.date), updatedAt: new Date() })
      .where(eq(transactions.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "Transaction updated successfully",
        data: transaction,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if transaction belongs to user
    const [existingTransaction] = await db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, authHeader)))
      .limit(1);

    if (!existingTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    await db.delete(transactions).where(eq(transactions.id, id));

    return NextResponse.json(
      {
        message: "Transaction deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
