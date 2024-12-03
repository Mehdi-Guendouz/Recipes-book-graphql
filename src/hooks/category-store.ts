import { categoryType } from "@/types";
import { create } from "zustand";

interface categoryStoreType {
  categories: categoryType[];
  addCategory: (category: categoryType) => void;
  removeCategory: (categoryId: string) => void;
  updateCategory: (category: categoryType) => void;
  setCategories: (categories: categoryType[]) => void;
}

export const useCategoryStore = create<categoryStoreType>((set) => ({
  categories: [],
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter((i) => i.id !== categoryId),
    })),
  updateCategory: (category) =>
    set((state) => ({
      categories: state.categories.map((i) =>
        i.id === category.id ? category : i
      ),
    })),
  setCategories: (categories) => set(() => ({ categories })),
}));
