import { create } from "zustand";

interface QueryStoreType {
  query: string;
  setQuery: (query: string) => void;
}

export const useQueryStore = create<QueryStoreType>((set) => ({
  query: "",
  setQuery: (query) => set(() => ({ query })),
}));
