import Categories from "@/containers/Categories";
import { PaginationQueryParams } from "@/hooks/usePaginationQueries";
import { TypeQueryParams } from "@/hooks/useTypeQuery";
import { getCategories } from "@/lib/react-query/actions/category.action";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<TypeQueryParams & PaginationQueryParams>;
}) => {
  let _searchParams = await searchParams;
  const data = await getCategories(_searchParams);
  return <Categories data={data} />;
};

export default page;
