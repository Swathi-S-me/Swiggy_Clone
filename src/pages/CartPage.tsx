// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { type RootState } from "../redux/store";
// import { increaseQty, decreaseQty, clearCart } from "../redux/cart/cartSlice";

// const CartPage: React.FC = () => {
//   const cart = useSelector((state: RootState) => state.cart.cart);
//   const dispatch = useDispatch();

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="max-w-3xl mx-auto p-6">

//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow"
//             >
//               <div className="flex items-center gap-3">
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                 )}
//                 <div>
//                   <p className="font-semibold">{item.name}</p>
//                   <p className="text-gray-600">Rs.{item.price}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => dispatch(decreaseQty(item.id))}
//                   className="px-2 py-1 border rounded"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => dispatch(increaseQty(item.id))}
//                   className="px-2 py-1 border rounded"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="flex justify-between items-center mt-6">
//             <p className="text-lg font-bold">Total: {total}</p>
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../redux/store";
import { increaseQty, decreaseQty } from "../redux/cart/cartSlice";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 38;
  const gst = itemTotal * 0.18;
  const grandTotal = itemTotal + deliveryFee + gst;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white rounded-xl shadow-md  p-4"
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
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
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
        )}
      </div>

      {cart.length > 0 && (
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

          <button
            className="w-full mt-5 bg-orange-500 text-white py-3 rounded-lg font-semibold"
            onClick={() => alert("Proceed to payment")}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
