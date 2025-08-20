export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};