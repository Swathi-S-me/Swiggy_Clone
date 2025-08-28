import { loadStripe } from "@stripe/stripe-js";
import Button from "./Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(key);

export default function Checkout() {

  const cart = useSelector((state: RootState) => state.cart.cart);
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const { id } = await res.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <Button
      onClick={handleCheckout}
       className="w-full mt-5 bg-orange-500 text-white py-3 rounded-lg font-semibold"
     >
      Proceed to pay
    </Button>
  );
}
