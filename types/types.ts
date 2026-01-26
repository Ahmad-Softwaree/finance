export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type Category = {
  id: string;
  enName: string;
  arName: string;
  ckbName: string;
  name: string;
  type: TransactionType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  enDesc: string;
  arDesc: string;
  ckbDesc: string;
  desc: string;
  categoryId: string;
  category: Category;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
export type DataTypes = Category | Transaction;

export type PaginationObject<T extends DataTypes> = {
  data: T[];
  next: boolean;
  total: number;
  total_page: number;
  page: number;
  limit: number;
};
