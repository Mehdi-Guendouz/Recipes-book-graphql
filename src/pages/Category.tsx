import { axiosInstance } from "@/api/config";
import HeaderText from "@/components/shared/HeaderText";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DataTable } from "@/components/shared/data-table";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { useCategoryStore } from "@/hooks/category-store";
import { categoriesColumn } from "@/components/columns/categoryColumn";
import AddCategoryModal from "@/components/modal/AddCategoryModal";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const categoryStore = useCategoryStore();

  const getCategory = () => {
    setLoading(true);
    const query = `
  query GetCategories {

  categories {
  name    
  id
  }
}
  `;
    axiosInstance
      .post("/", {
        query,
      })
      .then((res) => {
        console.log(res.data);
        categoryStore.setCategories(res.data.data.categories);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full min-h-screen lg:p-6 space-y-8">
      <div className="space-y-4">
        {/* toast */}
        <Toaster position="top-center" richColors />
        <div className="flex items-center  justify-between">
          <HeaderText
            text="Categories"
            className="font-bold lg:text-4xl text-2xl text-primary-grey-700 px-6 lg:px-0 pt-5 lg:py-0"
          />
          <AddCategoryModal />
        </div>
        <div className="w-full bg-primary-green-dark flex items-center justify-start relative overflow-hidden py-10 px-6  rounded-[10px] background-Image">
          {/* eclipse */}
          {/* <div className="w-[200px] h-[200px] bg-primary-green-light blur-[108px] absolute -right-[95px] -top-[60px]"></div> */}
          <div className="w-[500px] h-[500px] bg-primary-green-dark blur-[160px] absolute -left-[95px] -top-[60px]"></div>
          <div className="space-y-2  z-30 text-white">
            <h3 className="lg:text-40 text-2xl font-bold capitalize">
              discover All the Categories
            </h3>
            <p className="lg:text-2xl text-base font-medium  opacity-80 capitalize">
              and more
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingComponent className="w-10 h-10" />
          </div>
        ) : (
          <div>
            <DataTable
              data={categoryStore.categories}
              columns={categoriesColumn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
