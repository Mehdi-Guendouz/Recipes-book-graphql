import { axiosInstance } from "@/api/config";
import HeaderText from "@/components/shared/HeaderText";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { DataTable } from "@/components/shared/data-table";
import { ingredientsColumn } from "@/components/columns/ingredientsColumn";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { useIngredientsStore } from "@/hooks/ingreditents-store";
import AddIngredientModal from "@/components/modal/AddIngredientModal";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const ingredientsStore = useIngredientsStore();

  const getIngredients = () => {
    setLoading(true);
    const query = `
    query {
      getIngredients {
        id
        name
        recipes {
          id
          title
        }
      }
    }
  `;
    axiosInstance
      .post("/", {
        query,
      })
      .then((res) => {
        console.log(res.data);
        ingredientsStore.setIngredients(res.data.data.getIngredients);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className="w-full min-h-screen lg:p-6 space-y-8">
      <div className="space-y-4">
        {/* toast */}
        <Toaster position="top-center" richColors />
        <div className="flex items-center  justify-between">
          <HeaderText
            text="Ingredients"
            className="font-bold lg:text-4xl text-2xl text-primary-grey-700 px-6 lg:px-0 pt-5 lg:py-0"
          />
          <AddIngredientModal />
        </div>
        <div className="w-full bg-primary-green-dark flex items-center justify-start relative overflow-hidden py-10 px-6  rounded-[10px] background-Image">
          {/* eclipse */}
          {/* <div className="w-[200px] h-[200px] bg-primary-green-light blur-[108px] absolute -right-[95px] -top-[60px]"></div> */}
          <div className="w-[500px] h-[500px] bg-primary-green-dark blur-[160px] absolute -left-[95px] -top-[60px]"></div>
          <div className="space-y-2  z-30 text-white">
            <h3 className="lg:text-40 text-2xl font-bold capitalize">
              discover All the ingredients
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
              data={ingredientsStore.ingredients}
              columns={ingredientsColumn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
