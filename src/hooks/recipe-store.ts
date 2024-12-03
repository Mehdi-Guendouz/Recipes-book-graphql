import { recipeType } from "@/types";
import { create } from "zustand";

interface Recipe {
  recipes: recipeType[];
  addRecipe: (recipe: recipeType) => void;
  removeRecipe: (recipeId: string) => void;
  updateRecipe: (recipe: recipeType) => void;
  setRecipes: (recipes: recipeType[]) => void;
}

export const useRecipeStore = create<Recipe>((set) => ({
  recipes: [],
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  removeRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== recipeId),
    })),
  updateRecipe: (recipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === recipe.id ? recipe : r)),
    })),
  setRecipes: (recipes) => set(() => ({ recipes })),
}));
