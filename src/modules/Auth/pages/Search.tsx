import { useState } from "react";
import DishModal from "../../../components/DishModal/DishModal";
import { useSearchSuggestions } from "../../../components/Queries/useSearchSuggestions";
import { userLocation } from "../../../context/LocationContext";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../../redux/cart/cartSlice";
import { type RootState } from "../../../redux/store";
import { IMAGE_BASE } from "../../../constant/URL";
import Input from "../../../components/InputField/Input";
import Button from "../../../components/Button/Button";
import Icon from "../../../components/Icons/Icon";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">(
    "dishes"
  );
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const { location } = userLocation();
  const lat = location?.lat ?? 0;
  const lng = location?.lng ?? 0;

  const { data, isLoading } = useSearchSuggestions(query, lat, lng);

  const groupedCard = data?.data?.cards?.find((c: any) => c.groupedCard);

  const dishCards =
    groupedCard?.groupedCard?.cardGroupMap?.DISH?.cards
      ?.filter(
        (c: any) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Dish"
      )
      ?.map((c: any) => ({
        dish: c.card.card.info,
        restaurant: c.card.card.restaurant?.info,
      })) || [];

  const restaurantCards =
    groupedCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
      ?.map((c: any) => c?.card?.card?.info)
      ?.filter((info: any) => info && info.id) || [];

  return (
    <div className="flex flex-col items-center px-4 mb-10">
      <div className="w-full max-w-2xl mt-2 mb-6">
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e);
            setActiveTab("dishes");
          }}
          placeholder="Search for restaurants or dishes"
          className="w-full border p-3"
        />
      </div>

      {query && (
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setActiveTab("restaurants")}
            className={`px-5 py-2 rounded-full border ${
              activeTab === "restaurants"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Restaurants
          </Button>
          <button
            onClick={() => setActiveTab("dishes")}
            className={`px-5 py-2 rounded-full border ${
              activeTab === "dishes"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Dishes
          </button>
        </div>
      )}

      {isLoading && <p className="text-gray-500">Loading...</p>}

      {/* Dishes */}
      {!isLoading && query && activeTab === "dishes" && (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8 p-5 bg-gray-200">
          {dishCards.map(({ dish, restaurant }: any) => (
            <div
              key={dish.id}
              className="relative p-10 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
            >
              <span className="absolute top-4 right-4 text-gray-400">➝</span>

              {restaurant && (
                <div className="mb-3 text-sm text-gray-600">
                  <p className="font-medium">By {restaurant.name}</p>
                  <p className="flex items-center gap-2">
                    <Icon name="star" size={12}  /> {restaurant.avgRating} • {restaurant.sla?.slaString}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-lg">{dish.name}</p>
                  {dish.price && (
                    <p className="text-md font-semibold text-black">
                      Rs.{dish.price / 100}
                    </p>
                  )}

                  <button
                    className="mt-2 px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
                    onClick={() =>
                      setSelectedDish({
                        name: dish.name,
                        price: dish.price / 100,
                        description: dish.description,
                        image: dish.imageId
                          ? `${IMAGE_BASE}${dish.imageId}`
                          : null,
                        nutrition: dish.nutrition,
                      })
                    }
                  >
                    More Details →
                  </button>
                </div>

                {dish.imageId ? (
                  <div className="relative">
                    <img
                      src={`${IMAGE_BASE}${dish.imageId}`}
                      alt={dish.name || "dish"}
                      className="w-35 h-35 object-cover rounded-lg"
                    />

                    {/* Add / Update Cart */}
                    {cart.find((c) => c.id === dish.id) ? (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center bg-white rounded shadow">
                        <Button
                          onClick={() => dispatch(decreaseQty(dish.id))}
                          className="px-3 py-1 text-lg font-bold text-green-600"
                        >
                          -
                        </Button>
                        <span className="px-2">
                          {cart.find((c) => c.id === dish.id)?.quantity}
                        </span>
                        <Button
                          onClick={() => dispatch(increaseQty(dish.id))}
                          className="px-3 py-1 text-lg font-bold text-green-600"
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(
                            addToCart({
                              id: dish.id,
                              name: dish.name,
                              price: dish.price / 100,
                              image: dish.imageId
                                ? `${IMAGE_BASE}${dish.imageId}`
                                : undefined,
                              quantity: dish.quantity,
                            })
                          );
                          navigate({ to: "/cart" });
                        }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-600 font-semibold text-sm px-4 py-1 rounded shadow"
                      >
                        ADD
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restaurants */}
      {!isLoading && query && activeTab === "restaurants" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {restaurantCards.map((r: any) => (
            <div
              key={r.id}
              className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="relative w-28 h-28 flex-shrink-0">
                {r?.cloudinaryImageId ? (
                  <img
                    src={`${IMAGE_BASE}${r.cloudinaryImageId}`}
                    alt={r?.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-xs">
                    No Image
                  </div>
                )}
                {r?.adTrackingId && (
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-0.5 rounded">
                    Ad
                  </span>
                )}
                {r?.aggregatedDiscountInfoV3?.header && (
                  <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    ITEMS • {r.aggregatedDiscountInfoV3?.header}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-lg">{r?.name}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  ⭐ {r?.avgRating || "--"} • {r?.sla?.slaString} • ₹
                  {(r?.costForTwo || 0) / 100} FOR TWO
                </p>

                <p className="text-sm text-gray-500">
                  {r?.cuisines?.join(", ")?.slice(0, 40)}
                  {r?.cuisines?.join(", ")?.length > 40 && "..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
};

export default SearchPage;
