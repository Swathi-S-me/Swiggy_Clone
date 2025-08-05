import React from "react";
import { useTopRestaurants } from "../Queries/useTopRestaurants";
import HorizontalScrollCarousel from "../Carousel/HorizontalScrollCarousel";
import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";

const TopRestaurantsCarousel: React.FC = () => {
  const { data: restaurants = [], isLoading } = useTopRestaurants();

  return (
    <HorizontalScrollCarousel
      title="Top restaurant chains in Madurai"
      items={restaurants}
      loading={isLoading}
      renderItem={(rest) => (
        <Link
          to={`/restaurant/${rest.info.id}`}
          key={rest.info.id}
          className="min-w-[300px] flex-shrink-0 bg-white p-4   hover:scale-105 transition-transform"
        >
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${rest.info.cloudinaryImageId}`}
            alt={rest.info.name}
            className="w-full h-40 object-cover rounded-2xl mb-2"
          />

          <h3 className="text-lg font-bold">{rest.info.name}</h3>

          <p className="text-sm font-bold flex items-center gap-1">
            {rest.info.avgRating} <Icon name="star" size={10} />
            {rest.info.sla?.slaString}
          </p>
          <p className="text-sm text-gray-500">
            {rest.info.cuisines.join(", ")}
          </p>
          {/* <p className="text-sm text-green-600">{rest.info.costForTwo}</p> */}
          <p className="text-sm">
            {rest.info.locality} - {rest.info.areaName}
          </p>
        </Link>
      )}
    />
  );
};

export default TopRestaurantsCarousel;
