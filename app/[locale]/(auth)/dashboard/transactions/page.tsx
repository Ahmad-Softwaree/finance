import Transactions from "@/containers/Transactions";
import { PaginationQueryParams } from "@/hooks/usePaginationQueries";
import { TypeQueryParams } from "@/hooks/useTypeQuery";
import { getTransactions } from "@/lib/react-query/actions/transaction.action";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<TypeQueryParams & PaginationQueryParams>;
}) => {
  let _searchParams = await searchParams;
  const data = await getTransactions(_searchParams);
  return <Transactions data={data} />;
};

export default page;
