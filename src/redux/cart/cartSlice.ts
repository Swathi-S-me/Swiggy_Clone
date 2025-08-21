import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./cart.types";






const loadFromLocalStorage = (): CartState => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : { cart: [] };
  } catch {
    return { cart: [] };
  }
};

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};
const initialState: CartState = loadFromLocalStorage();


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const existing = state.cart.find((c) => c.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
       saveToLocalStorage(state);
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((c) => c.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state);
    },
    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((c) => c.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cart = [];
      saveToLocalStorage(state);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
