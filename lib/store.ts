import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (item: Omit<CartItem, 'quantity'>) => void;
  deleteItem: (item: Omit<CartItem, 'quantity'>) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

          if (!existingItem) {
            return state;
          }

          if (existingItem.quantity <= 1) {
            return {
              items: state.items.filter((cartItem) => cartItem.id !== item.id),
            };
          }

          return {
            items: state.items.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          };
        }),

        deleteItem: (item) => 
          set((state) => {
          return { items: state.items.filter((cartItem) => cartItem.id !== item.id)}
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
