import { axiosInstance } from "@/api/config";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRecipeStore } from "@/hooks/recipe-store";
import { useIngredientsStore } from "@/hooks/ingreditents-store";
import { useCategoryStore } from "@/hooks/category-store";

type AlertDialogModalProps = {
  isRecipeDeleted?: boolean;
  isIngredientDeleted?: boolean;
  isCategoryDeleted?: boolean;
  text: string;
  id: string;
};

const AlertDialogModal = ({
  isRecipeDeleted,
  isIngredientDeleted,
  isCategoryDeleted,
  text,
  id,
}: AlertDialogModalProps) => {
  const [loading, setLoading] = useState(false);
  const recipeStore = useRecipeStore();
  const ingredientsStore = useIngredientsStore();
  const categoryStore = useCategoryStore();

  const handleDelete = () => {
    setLoading(true);
    if (isRecipeDeleted) {
      const query = `mutation DeleteRecipe($deleteRecipeId: ID!) {
  deleteRecipe(id: $deleteRecipeId)
}`;
      axiosInstance
        .post("/", {
          query,
          variables: {
            deleteRecipeId: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Recipe deleted successfully");
          recipeStore.removeRecipe(id);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete recipe");
        });
    } else if (isIngredientDeleted) {
      const query = `mutation DeleteIngredient($deleteIngredientId: ID!) {
  deleteIngredient(id: $deleteIngredientId)
}`;

      axiosInstance
        .post("/", {
          query,
          variables: {
            deleteIngredientId: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("ingredient deleted successfully");
          ingredientsStore.removeIngredient(id);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete ingredient try again");
        });
    } else if (isCategoryDeleted) {
      console.log("category deleted");
      const query = `mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId)
}`;
      axiosInstance
        .post("/", {
          query,
          variables: {
            deleteCategoryId: id,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("category deleted successfully");
          categoryStore.removeCategory(id);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to delete category try again");
        });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"delete"} size={"icon"}>
          <Trash color="#FFf" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure? you want to delete "{text}"
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {isRecipeDeleted
              ? " recipe"
              : isIngredientDeleted
              ? " ingredient"
              : isCategoryDeleted
              ? " category"
              : ""}{" "}
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-primary-red text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogModal;
