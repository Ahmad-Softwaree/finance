import Transactions from "@/containers/Transactions";
import { getTransactions } from "@/lib/react-query/actions/transaction.action";

const page = async () => {
  const data = await getTransactions();
  return <Transactions data={data} />;
};

export default page;
