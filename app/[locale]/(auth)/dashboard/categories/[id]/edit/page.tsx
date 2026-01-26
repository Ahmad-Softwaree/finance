import CategoryForm from "@/components/forms/CategoryForm";
import { getCategoryById } from "@/lib/react-query/actions/category.action";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  let { id } = await params;
  const data = await getCategoryById(id);
  return <CategoryForm category={data} />;
};

export default page;
