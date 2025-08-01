import React from "react";
import { useAllRestaurants } from "../Queries/useAllRestaurants";
import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";

const AllRestaurantsSection: React.FC = () => {
  const { data: restaurants = [], isLoading } = useAllRestaurants();

  console.log("all restaurant", restaurants);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Restaurants with online food delivery in Madurai
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((rest: any) => (
          <Link
            to={`/restaurant/${rest.info.id}`}
            
            className="bg-white p-4 rounded-lg shadow hover:scale-[1.02] transition-transform"
          >
            <img
              src={`https://media-assets.swiggy.com/${rest.info.cloudinaryImageId}`}
              alt={rest.info.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{rest.info.name}</h3>
            <p className="text-sm text-gray-500">
              {rest.info.cuisines?.join(", ")}
            </p>
            <p className="text-sm  flex items-center gap-1">
              {rest.info.avgRating} <Icon name="star" size={10}/>{rest.info.sla?.slaString}
            </p>
            <p className="text-sm text-green-600">{rest.info.costForTwo}</p>
            {rest.info.aggregatedDiscountInfoV3 && (
              <p className="text-red-600 font-bold">
                {rest.info.aggregatedDiscountInfoV3.header} -{" "}
                {rest.info.aggregatedDiscountInfoV3.subHeader}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurantsSection;
