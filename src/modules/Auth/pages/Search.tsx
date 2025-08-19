import { useState } from "react";
import DishModal from "../../../components/DishModal/DishModal";
import { useSearchSuggestions } from "../../../components/Queries/useSearchSuggestions";

const IMAGE_BASE =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_320,c_fit/";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"restaurants" | "dishes">(
    "dishes"
  );
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  const { data, isLoading } = useSearchSuggestions(query);

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
    groupedCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.map(
      (c: any) => c.card.card.info
    ) || [];

  return (
    <div className="flex flex-col items-center px-4">
      <div className="w-full max-w-4xl mt-10 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveTab("dishes");
          }}
          placeholder="Search for restaurants or dishes"
          className="w-full border  p-3 shadow-sm "
        />
      </div>

      {query && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`px-5 py-2 rounded-full border ${
              activeTab === "restaurants"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Restaurants
          </button>
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

      {!isLoading && query && activeTab === "dishes" && (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8  p-5 bg-gray-200">
          {dishCards.map(({ dish, restaurant }: any) => (
            <div
              key={dish.id}
              className="relative p-10  rounded-2xl shadow-sm bg-white hover:shadow-md transition"
            >
              <span className="absolute top-4 right-4 text-gray-400">➝</span>

              {restaurant && (
                <div className="mb-3 text-sm text-gray-600">
                  <p className="font-medium">By {restaurant.name}</p>
                  <p>
                    ⭐ {restaurant.avgRating} • {restaurant.sla?.slaString}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-lg">{dish.name}</p>
                  {dish.price && (
                    <p className="text-sm font-medium text-gray-800">
                      ₹{dish.price / 100}
                    </p>
                  )}
                  {/* {dish.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {dish.description}
                    </p>
                  )} */}

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
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-600 font-semibold text-sm px-4 py-1 rounded shadow">
                      ADD
                    </button>
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

      {!isLoading && query && activeTab === "restaurants" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
          {restaurantCards.map((r: any) => (
            <div
              key={r.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p className="font-semibold">{r.name}</p>
              <p>
                ⭐ {r.avgRating} • {r.sla?.slaString}
              </p>
              {r.imageId && (
                <img
                  src={`${IMAGE_BASE}${r.imageId}`}
                  alt={r.name}
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
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
