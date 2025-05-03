import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  _id: string | null | undefined;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  countInStock: number;
  image?: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string | null | undefined,
    color: string,
    size: string
  ) => void;
  clearCart: () => void;
  updateQuantity: (
    id: string,
    quantity: number,
    color: string,
    size: string
  ) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existingItem = get().cart.find(
          (i) =>
            i._id === item._id && i.color === item.color && i.size === item.size
        );
        if (existingItem) {
          return set({
            cart: get().cart.map((i) =>
              i._id === item._id &&
              i.color === item.color &&
              i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        }
        set({ cart: [...get().cart, item] });
      },
      removeFromCart: (id, color, size) =>
        set({
          cart: get().cart.filter(
            (item) =>
              !(item._id === id && item.color === color && item.size === size)
          ),
        }),
      clearCart: () => set({ cart: [] }),
      updateQuantity: (id, quantity, color, size) =>
        set({
          cart: get().cart.map((item) =>
            item._id === id && item.color === color && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }),
      getCartTotal: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      getCartCount: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);
