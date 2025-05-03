import { IProducts } from "@/models/product-model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductHistoryState = {
  history: IProducts[];
  addToHistory: (product: Omit<IProducts, "viewedAt">) => void;
  removeFromHistory: (id: string | null | undefined) => void;
  clearHistory: () => void;
};

export const useProductHistoryStore = create<ProductHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (product) => {
        const existing = get().history.filter((p) => p._id !== product._id);
        const newEntry = { ...product, viewedAt: Date.now() };
        const updated = [newEntry, ...existing].slice(0, 10); // Only last 10 viewed
        set({ history: updated });
      },
      removeFromHistory: (id) =>
        set({
          history: get().history.filter((item) => !(item._id === id)),
        }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "product-history-storage",
    }
  )
);
