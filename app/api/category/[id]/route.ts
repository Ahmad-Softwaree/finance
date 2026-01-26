import { getAuthHeader } from "../route";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/drizzle";
import { categories } from "@/drizzle/db/schema";
import { eq, and } from "drizzle-orm";
import { fieldLocalizer, getLocaleHeader } from "../../transactions/route";

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

    const [category] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, authHeader)))
      .limit(1);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    const localizedCategory = {
      ...category,
      name: fieldLocalizer(category, locale, "Name"),
    };
    return NextResponse.json(
      {
        message: "Category retrieved successfully",
        data: localizedCategory,
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

    // Check if category belongs to user
    const [existingCategory] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, authHeader)))
      .limit(1);

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const [category] = await db
      .update(categories)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: category,
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

    // Check if category used in any transactions
    const [usedCategory] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, authHeader)))
      .limit(1);

    if (usedCategory) {
      return NextResponse.json(
        { message: "Category is in use and cannot be deleted" },
        { status: 404 }
      );
    }

    await db.delete(categories).where(eq(categories.id, id));

    return NextResponse.json(
      {
        message: "Category deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
