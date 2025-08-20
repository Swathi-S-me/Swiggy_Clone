import { useParams, useSearch } from "@tanstack/react-router";
import { useCollection } from "../../../queries/useCollection";
import Spinner from "../../../components/Spinner";

const CollectionPage = () => {
  const { id } = useParams({ from: "/collection/$id" });
  const { search } = useSearch({ from: "/collection/$id" });
  
  const tags = search?.tags?.trim();
  
  const { data, isLoading, error } = useCollection(id, tags);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-red-500">Error loading collection data</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  
  const masthead = data?.data?.cards?.find(
    (card: any) =>
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead"
  )?.card?.card;

  const restaurants = data?.data?.cards
    ?.filter(
      (card: any) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    )
    ?.map((card: any) => card?.card?.card?.info) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {masthead && (
        <div className="mb-6 -mt-10">
          <h1 className="text-4xl font-bold mb-5">{masthead.title}</h1>
          <p className="text-gray-600 font-bold mb-5">{masthead.description}</p>
          <p className="text-xl font-bold mb-2">{masthead.count}Restaurants to explore</p>
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
            <div className="flex gap-5">
              <h2 className="text-md font-bold mt-2">{restaurant.avgRating}</h2>
            <h2 className="text-md font-bold mt-2">{restaurant.sla?.slaString}</h2>
            </div>
            <p className="text-sm text-gray-500 truncate w-full">
              {restaurant.cuisines.join(", ")}
            </p>
            <h2 className="text-sm text-gray-500">{restaurant.locality}</h2>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;