import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Enum for transaction types
export const transactionTypeEnum = pgEnum("TransactionType", [
  "INCOME",
  "EXPENSE",
]);

// Category table
export const categories = pgTable("Category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  enName: text("enName").notNull(),
  arName: text("arName").notNull(),
  ckbName: text("ckbName").notNull(),
  userId: text("userId").notNull(),
  type: transactionTypeEnum("type").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Transaction table
export const transactions = pgTable("Transaction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  amount: doublePrecision("amount").notNull(),
  type: transactionTypeEnum("type").notNull(),
  enDesc: text("enDesc").notNull(),
  arDesc: text("arDesc").notNull(),
  ckbDesc: text("ckbDesc").notNull(),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  userId: text("userId").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Export types
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
