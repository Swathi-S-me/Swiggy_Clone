import { loadStripe } from "@stripe/stripe-js";
import Button from "./Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useAuth } from "../context/AuthContext"; 
import toast from "react-hot-toast";

const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(key);

export default function Checkout() {
const { user } = useAuth();
  const cart = useSelector((state: RootState) => state.cart.cart);


  const handleCheckout = async () => {
     if (!user) {
      toast.error("Please login to continue checkout"); 
      return;
    }

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
       className="cursor-pointer w-full mt-5 bg-orange-500 text-white py-3 rounded-lg font-semibold"
     >
      Proceed to pay
    </Button>
  );
}

