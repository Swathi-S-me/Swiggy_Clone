import { useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const CollectionPage = () => {
  const { id } = useParams({ from: "/collection/$id" });
  const { search } = useSearch({ from: "/collection/$id" });

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description,setDescription]=useState<any>([])


const tags = search?.tags?.trim();
const collectionUrl = `http://localhost:5000/api/collection?id=${id}${tags ? `&tags=${encodeURIComponent(tags)}` : ""}`;


useEffect(() => {
  fetch(collectionUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log("Full collection response:", data);

const masthead = data?.data?.cards?.find(
        (card: any) =>
          card?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead"
      )?.card?.card;

      setDescription(masthead);



      const restaurantList = data?.data?.cards
        ?.filter(
          (card: any) =>
            card?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        )
        ?.map((card: any) => card?.card?.card?.info);

      // console.log(" Final restaurant data:", restaurantList);
      setRestaurants(restaurantList);
    })
    .finally(() => setLoading(false));
}, [collectionUrl]);

  return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {description && (
          <div className="mb-6 -mt-10">
            <h1 className="text-4xl font-bold mb-5">{description.title}</h1>
            <p className="text-gray-600 font-bold mb-5">{description.description}</p>
            <p className="text-4xl font-bold mb-2">Restaurants to explore</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {restaurants.map((restaurant: any) => (
            <div key={restaurant.id} className="p-2">
              <img
                src={`https://media-assets.swiggy.com/${restaurant.cloudinaryImageId}`}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-2xl"
              />
              <h2 className="text-lg font-bold mt-2">{restaurant.name}</h2>
              <p className="text-sm text-gray-500">
                {restaurant.cuisines.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

};

export default CollectionPage;
