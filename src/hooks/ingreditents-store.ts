import { ingredientsType } from "@/types";
import { create } from "zustand";

interface Ingredient {
  ingredients: ingredientsType[];
  addIngredient: (ingredient: ingredientsType) => void;
  removeIngredient: (ingredientId: string) => void;
  updateIngredient: (ingredient: ingredientsType) => void;
  setIngredients: (ingredients: ingredientsType[]) => void;
}

export const useIngredientsStore = create<Ingredient>((set) => ({
  ingredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  removeIngredient: (ingredientId) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== ingredientId),
    })),
  updateIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) =>
        i.id === ingredient.id ? ingredient : i
      ),
    })),
  setIngredients: (ingredients) => set(() => ({ ingredients })),
}));
