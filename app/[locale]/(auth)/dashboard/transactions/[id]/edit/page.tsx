import TransactionForm from "@/components/forms/TransactionForm";
import { getTransactionById } from "@/lib/react-query/actions/transaction.action";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let { id } = await params;
  const data = await getTransactionById(id);
  return <TransactionForm transaction={data} />;
};

export default page;
