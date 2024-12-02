import { ingredientsType } from "@/types";
import { create } from "zustand";

interface Ingredient {
  ingredients: ingredientsType[];
  addIngredient: (ingredient: ingredientsType) => void;
  removeIngredient: (ingredient: ingredientsType) => void;
  updateIngredient: (ingredient: ingredientsType) => void;
  setIngredients: (ingredients: ingredientsType[]) => void;
}

export const useIngredientsStore = create<Ingredient>((set) => ({
  ingredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  removeIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== ingredient.id),
    })),
  updateIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((i) =>
        i.id === ingredient.id ? ingredient : i
      ),
    })),
  setIngredients: (ingredients) => set(() => ({ ingredients })),
}));
