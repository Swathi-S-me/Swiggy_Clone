
import {type AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cart/cartSlice";
import { toast } from "react-hot-toast";

export const addItemToCart = (
  dispatch: AppDispatch,
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
  },
  closeModal?: () => void
) => {
  dispatch(
    addToCart({
      ...item,
      quantity: item.quantity ?? 1, 
    })
  );
  toast.success("Item added to cart");
  if (closeModal) closeModal();
};
