import { useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const CollectionPage = () => {
  const { id } = useParams({ from: "/collection/$id" });
  const { search } = useSearch({ from: "/collection/$id" });

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);


const tags = search?.tags?.trim();
const collectionUrl = `http://localhost:5000/api/collection?id=${id}${tags ? `&tags=${encodeURIComponent(tags)}` : ""}`;


useEffect(() => {
  fetch(collectionUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("Full collection response:", data);

      const restaurantList = data?.data?.cards
        ?.filter(
          (card: any) =>
            card?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )
        ?.map((card: any) => card?.card?.card?.info);

      console.log(" Final restaurant data:", restaurantList);
      setRestaurants(restaurantList);
    })
    .finally(() => setLoading(false));
}, [collectionUrl]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {restaurants.map((restaurant:any) => (
            <div key={restaurant.id} className="border p-2 rounded-lg shadow-sm">
              <img
                src={`https://media-assets.swiggy.com/${restaurant.cloudinaryImageId}`}
                alt={restaurant.name}
                className="w-full h-32 object-cover rounded"
              />
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-sm text-gray-500">{restaurant.cuisines.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
