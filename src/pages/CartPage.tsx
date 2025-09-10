import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../redux/store";
import { increaseQty, decreaseQty } from "../redux/cart/cartSlice";

import Icon from "../components/Icons/Icon";
import Button from "../components/Button/Button";
import { lazy } from "react";
const Checkout = lazy(() => import("../components/Checkout"));

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 38;
  const gst = itemTotal * 0.18;
  const grandTotal = itemTotal + deliveryFee + gst;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[70vh]">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-100 mb-6">
          <Icon name="cart" size={20} className="text-orange-500 w-12 h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          Looks like you haven’t added anything yet. Add delicious items from
          the menu to get started.
        </p>

        <Button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer mt-6 px-6 py-2 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Rs.{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="cursor-pointer px-3 py-1 text-gray-700 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="cursor-pointer px-3 py-1 text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="font-semibold text-gray-800">
                Rs.{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-lg font-bold mb-4">Bill Details</h2>
        <div className="flex justify-between mb-2">
          <span>Item Total</span>
          <span>Rs.{itemTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>Rs.{deliveryFee}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>GST & Other Charges</span>
          <span>Rs.{gst.toFixed(2)}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span>TO PAY</span>
          <span>Rs.{grandTotal.toFixed(2)}</span>
        </div>

        <div className="mt-4 p-3 border rounded text-sm text-gray-700">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>
              <strong>Opt in for No-contact Delivery</strong>
              <br />
              Unwell, or avoiding contact? Partner will safely place the order
              outside your door.
            </span>
          </label>
        </div>

        <Checkout />
      </div>
    </div>
  );
};

export default CartPage;
