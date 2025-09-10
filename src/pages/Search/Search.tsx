import { useState } from "react";
import DishModal from "../../components/DishModal/DishModal";
import { useSearchSuggestions } from "../../Queries/useSearchSuggestions";
import { userLocation } from "../../context/LocationContext";
import { Link } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../../redux/cart/cartSlice";
import { type RootState } from "../../redux/store";
import { IMAGE_BASE } from "../../constant/URL";
import Input from "../../components/InputField/Input";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icons/Icon";
import toast from "react-hot-toast";
import Shimmer from "../../components/Shimmer/Shimmer";
import type { Dish } from "../../components/DishModal/dishModal.types";
import type { CardApi, DishCard, DishCardApi, GroupedCardApi, RestaurantCard, RestaurantInfo } from "./search.types";



const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">(
    "dishes"
  );
  const [selectedDish, setSelectedDish] = useState< Dish| null>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const { location } = userLocation();
  const lat = location?.lat ?? 0;
  const lng = location?.lng ?? 0;

  const { data, isLoading } = useSearchSuggestions(query, lat, lng);

  const groupedCard: GroupedCardApi | undefined = data?.data?.cards?.find(
    (c: CardApi): c is GroupedCardApi => "groupedCard" in c
  );

  const dishCards: DishCard[] =
    groupedCard?.groupedCard?.cardGroupMap?.DISH?.cards
      ?.filter(
        (c): c is DishCardApi =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Dish"
      )
      ?.map((c) => ({
        dish: c.card.card.info,
        restaurant: c.card.card.restaurant?.info,
      })) || [];

  const restaurantCards: RestaurantCard[] =
    groupedCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
      ?.map((c) => c?.card?.card?.info)
      ?.filter((info): info is RestaurantInfo => !!info?.id) || [];

  return (
    <div className="flex flex-col items-center px-4 mb-10">
      <div className="w-full max-w-2xl mt-2 mb-6 relative">
        <Input
          type="text"
          value={query}
          onChange={(val) => {
            setQuery(val);
            setActiveTab("dishes");
          }}
          placeholder="Search for restaurants or dishes"
          className="w-full border p-3 pr-10"
        />
        <Icon
          name="search"
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {query && (
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setActiveTab("restaurants")}
            className={`cursor-pointer px-5 py-2 rounded-full border ${
              activeTab === "restaurants"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Restaurants
          </Button>
          <Button
            onClick={() => setActiveTab("dishes")}
            className={`cursor-pointer px-5 py-2 rounded-full border ${
              activeTab === "dishes"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Dishes
          </Button>
        </div>
      )}

      {isLoading && <Shimmer />}

      {!isLoading &&
        query &&
        activeTab === "dishes" &&
        (dishCards.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8 p-5 bg-gray-200">
            {dishCards.map(({ dish, restaurant }) => {
              const inCart = cart.find((c) => c.id === dish.id);
              const price = (dish.price ?? dish.defaultPrice ?? 0) / 100;

              return (
                <div
                  key={dish.id}
                  className="relative p-10 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
                >
                 

                  {restaurant && (
                    <div className="mb-3 text-sm text-gray-600">
                      <p className="font-medium">By {restaurant.name}</p>
                      <p className="flex items-center gap-2">
                        <Icon name="star" size={12} /> {restaurant.avgRating} •{" "}
                        {restaurant.sla?.slaString}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{dish.name}</p>
                      {price > 0 && (
                        <p className="text-md font-semibold text-black">
                          Rs.{price}
                        </p>
                      )}

                      <button
                        className="cursor-pointer mt-2 px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
                        onClick={() =>
                          setSelectedDish({
                            id: dish.id,
                            name: dish.name,
                            price,
                            description: dish.description??"",
                            image: dish.imageId
                              ? `${IMAGE_BASE}${dish.imageId}`
                              : null,
                            nutrition: dish.nutrition,
                          })
                        }
                      >
                        More Details 
                      </button>
                    </div>

                    {dish.imageId ? (
                      <div className="relative">
                        <img
                          src={`${IMAGE_BASE}${dish.imageId}`}
                          alt={dish.name || "dish"}
                          className="w-35 h-35 object-cover rounded-lg"
                        />

                        {inCart ? (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center bg-white rounded shadow">
                            <Button
                              onClick={() => dispatch(decreaseQty(dish.id))}
                              className="cursor-pointer px-3 py-1 text-lg font-bold text-green-600"
                            >
                              -
                            </Button>
                            <span className="px-2">{inCart.quantity}</span>
                            <Button
                              onClick={() => dispatch(increaseQty(dish.id))}
                              className="cursor-pointer px-3 py-1 text-lg font-bold text-green-600"
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
                                  price,
                                  image: dish.imageId
                                    ? `${IMAGE_BASE}${dish.imageId}`
                                    : undefined,
                                  quantity: 1,
                                })
                              );
                              toast.success("Item added to cart");
                            }}
                            className="cursor-pointer absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-600 font-semibold text-sm px-4 py-1 rounded shadow"
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
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center py-10 text-gray-500">
            <Icon name="search" size={40} className="mb-3" />
            <p className="text-lg font-medium">
              No dishes found for "{query}" in the dishes tab
            </p>
            <p className="text-sm">Try searching with a different keyword</p>
          </div>
        ))}

      {!isLoading &&
        query &&
        activeTab === "restaurants" &&
        (restaurantCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {restaurantCards.map((r) => {
              const cuisines = r?.cuisines?.join(", ") || "";
              return (
                <Link
                  key={r.id}
                  to="/restaurant/$id"
                  params={{ id: r.id }}
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
                      <Icon name="star" size={12} /> {r?.avgRating || "--"} •{" "}
                      {r?.sla?.slaString} • Rs.
                      {(r?.costForTwo || 0) / 100} FOR TWO
                    </p>

                    <p className="text-sm text-gray-500">
                      {cuisines.length > 40
                        ? cuisines.slice(0, 40) + "..."
                        : cuisines}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center justify-center py-10 text-gray-500">
            <Icon name="store" size={40} className="mb-3" />
            <p className="text-lg font-medium">
              No restaurants found for the name "{query}"
            </p>
            <p className="text-sm">Try searching for another restaurant</p>
          </div>
        ))}

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
};

export default SearchPage;
