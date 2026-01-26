import Categories from "@/containers/Categories";
import { getCategories } from "@/lib/react-query/actions/category.action";

const page = async () => {
  const data = await getCategories();
  return <Categories data={data} />;
};

export default page;
