import { db } from "@/drizzle/drizzle";
import { categories } from "@/drizzle/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { fieldLocalizer, getLocaleHeader } from "../transactions/route";

export const getAuthHeader = async () => {
  const auth = (await headers()).get("Cookie")?.replace("session=", "") || null;
  return auth;
};

export async function GET() {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const locale = await getLocaleHeader();

    const categoryList = await db
      .select()
      .from(categories)
      .where(eq(categories.userId, authHeader))
      .orderBy(desc(categories.createdAt));

    const localizedCategories = categoryList.map((category) => ({
      ...category,
      name: fieldLocalizer(category, locale, "Name"),
    }));
    return NextResponse.json(
      {
        data: localizedCategories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = await getAuthHeader();

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.insert(categories).values({
      ...body,
      userId: authHeader,
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = await getAuthHeader();

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

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

    await db
      .update(categories)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(categories.id, id));

    return NextResponse.json(
      {
        message: "Category updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = await getAuthHeader();

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

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
