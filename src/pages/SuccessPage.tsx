import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cart/cartSlice";
import { Link } from "@tanstack/react-router";
import Icon from "../components/Icons/Icon";

const SuccessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gray-30">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center  px-20 py-20 relative -top-8">
        <div className="flex justify-center mb-4">
          <Icon name="delivery" size={60} className="text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-3 text-gray-600">
          Your order has been placed successfully. We'll notify you once it's
          out for delivery
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
