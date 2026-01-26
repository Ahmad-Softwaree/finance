import { db } from "@/drizzle/drizzle";
import { categories } from "@/drizzle/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {
  fieldLocalizer,
  getAuthHeader,
  getLocaleHeader,
} from "../../transactions/route";

export async function GET(request: NextRequest) {
  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const locale = await getLocaleHeader();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { message: "Type parameter is required" },
        { status: 400 }
      );
    }

    if (type !== "INCOME" && type !== "EXPENSE") {
      return NextResponse.json(
        { message: "Invalid type. Must be INCOME or EXPENSE" },
        { status: 400 }
      );
    }

    // Fetch categories with all name fields
    const categoryList = await db
      .select({
        id: categories.id,
        enName: categories.enName,
        arName: categories.arName,
        ckbName: categories.ckbName,
      })
      .from(categories)
      .where(
        and(
          eq(categories.userId, authHeader.replace("Bearer ", "")),
          eq(categories.type, type as "INCOME" | "EXPENSE")
        )
      )
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
