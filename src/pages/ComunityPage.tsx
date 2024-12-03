import { axiosInstance } from "@/api/config";
import CardDifficulty from "@/components/shared/CardDifficulty";
import HeaderText from "@/components/shared/HeaderText";
import LoadingComponent from "@/components/shared/LoadingComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recipeCommunityType } from "@/types";
import { Clock1 } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const CommunityPage = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<recipeCommunityType[]>([]);

  const getRecipes = () => {
    setLoading(true);
    const query = `
    query {
      getRecipes {
        id
        title
        description
        difficulty
        time
        ingredients {
          id
          name
        }
        category {
          id
          name
        }
        createdBy {
          id
          username
        }
      }
    }
  `;
    axiosInstance
      .post("/", {
        query,
      })
      .then((res) => {
        console.log(res.data.data.getRecipes);
        setRecipes(res.data.data.getRecipes);
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div className="w-full min-h-screen lg:p-6 space-y-8 pb-10">
      <div className="space-y-4">
        {/* toast */}
        <Toaster position="top-center" richColors />
        <div className=" space-y-2">
          <HeaderText
            text="community recipes"
            className="font-bold lg:text-4xl text-2xl text-primary-grey-700 px-6 lg:px-0 pt-5 lg:py-0"
          />
          <p className="text-primary-grey-700 capitalize text-base font-normal">
            discover other people's recipes and enjoy cooking with them.
          </p>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingComponent className="w-10 h-10" />
          </div>
        ) : (
          <div className=" flex items-start flex-wrap gap-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Card key={recipe.id} className="w-[300px] min-h-[300px]">
                  <CardHeader className="space-y-1">
                    <CardTitle className="flex items-center gap-2 justify-between">
                      <div>
                        <h1 className="text-primary-black">{recipe.title}</h1>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-primary-grey-700 text-sm">
                          {recipe.time} h
                        </span>
                        <Clock1 className="w-5 h-5" />
                      </div>
                    </CardTitle>
                    <CardDifficulty difficulty={recipe.difficulty} />
                    {recipe.category && (
                      <CardDescription className="text-primary-grey-700">
                        category: {recipe.category.name}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="">
                      Description:
                      <p className="text-primary-grey-700 text-sm">
                        {recipe.description}
                      </p>
                    </div>
                    {recipe.ingredients.length > 0 ? (
                      <div className="space-y-2">
                        <h1 className="text-primary-black ">Ingredients:</h1>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map((ingredient) => (
                            <div
                              key={ingredient.id}
                              className="flex items-center justify-center bg-primary-green-dark text-white px-2 py-1 text-[12px] rounded-md"
                            >
                              {ingredient.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="capitalize flex items-center justify-center  text-primary-grey-100 text-sm px-2  rounded-md">
                          no ingredient selected
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {recipe.createdBy && (
                    <CardFooter className="flex items-center justify-between">
                      <div>
                        <p className="text-primary-grey-700 text-sm">
                          created by: {recipe.createdBy.username}
                        </p>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center h-[400px] w-full">
                <p className="text-lg text-gray-500">
                  you don't have any recipe yet. It's the time to add your first
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
