import type { MenuItem, MenuProps } from "./accordion.types";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import {
  addToCart,
  decreaseQty,
  increaseQty,
} from "../../redux/cart/cartSlice";
import { IMAGE_BASE } from "../../constant/URL";
import { useState } from "react";
import Button from "../Button/Button";
import { truncate } from "../../utils/text";
import Icon from "../Icons/Icon";

const MenuAccordion = ({ categorizedItems }: MenuProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const toggleDescription = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: (item.price ?? item.defaultPrice ?? 0) / 100,
        image: item.imageId ? `${IMAGE_BASE}${item.imageId}` : undefined,
        quantity: 1,
      })
    );
    // navigate({ to: "/cart" });
  };
  return (
    <div className="max-w-3xl mx-auto">
      {categorizedItems.map((category) => (
        <div key={category.title} className="mb-6   ">
          <Button
            onClick={() => toggleCategory(category.title)}
            className="w-full flex justify-between items-center p-4 text-left font-bold text-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {category.title}
            <span>
              {openCategory === category.title ? (
                <Icon name="up" size={15} />
              ) : (
                <Icon name="down" size={15} />
              )}
            </span>
          </Button>

          {openCategory === category.title && (
            <div className="p-4 flex flex-col gap-6">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between pb-6 gap-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-md text-black font-semibold">
                      Rs.
                      {((item.price ?? item.defaultPrice ?? 0) / 100).toFixed(
                        0
                      )}
                    </p>

                    {item.description && (
                      <p
                        className="text-sm text-black-400 mt-1 cursor-pointer"
                        onClick={() => toggleDescription(item.id)}
                      >
                        {expandedItems[item.id]
                          ? item.description
                          : truncate(item.description, 90)}{" "}
                      </p>
                    )}
                  </div>

                  {item.imageId && (
                    <div className="w-40 relative">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center bg-white rounded shadow">
                          <Button
                            onClick={() => dispatch(decreaseQty(item.id))}
                            className="px-3 py-1 text-lg font-bold text-green-600"
                          >
                            -
                          </Button>
                          <span className="px-2">
                            {cartItems.find(
                              (cartItem) => cartItem.id === item.id
                            )?.quantity ?? 0}
                          </span>
                          <Button
                            onClick={() => dispatch(increaseQty(item.id))}
                            className="px-3 py-1 text-lg font-bold text-green-600"
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => {
                            handleAddToCart(item);
                            toast.success("Item added to cart");
                          }}
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white border border-gray-300 text-green-600 font-semibold px-4 py-1 rounded shadow"
                        >
                          ADD
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuAccordion;
