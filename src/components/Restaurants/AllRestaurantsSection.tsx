import React, { useEffect, useState } from "react";
import { useAllRestaurants } from "../Queries/useAllRestaurants";
import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";

const AllRestaurantsSection: React.FC = () => {
  const { data: restaurants = [], isLoading } = useAllRestaurants();
  const [filter, setFilter] = useState<any>([]);
  const [ratingFilters, setRatingFilters] = useState<any[]>([]);
  const[veg,setVeg]=useState<any[]>([]);

  // console.log("all restaurant", restaurants);

  useEffect(() => {
    fetch(
      "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    )
      .then((res) => res.json())
      .then((data) => {
        const cards = data?.data?.cards || [];
        const filtersort = cards.find(
          (card: any) =>
            card.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget"
        );
        const info = filtersort?.card?.card?.sortConfigs || [];
        setFilter(info);
        const facets = filtersort?.card?.card?.facetList || [];
        setRatingFilters(facets);

        const ratingFacet = facets.find(
          (facet: any) => facet.label === "Ratings"
        );

        const ratingOptions = ratingFacet?.facetInfo || [];
        setRatingFilters(ratingOptions);

        const isVegFacet = facets.find(
          (facet: any) => facet.label === "Veg/Non-Veg"
        );

        const isVegOptions = isVegFacet?.facetInfo || [];
        setVeg(isVegOptions);

        // console.log("✅ Ratings Only:", ratingOptions);

        // console.log("Rating Filters:", facets);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Restaurants with online food delivery in Madurai
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {filter.map((item: any) => (
          <button
            key={item.key}
            className={`border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition ${
              item.selected ? "bg-black text-white" : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {ratingFilters.map((filter) => (
          <button
            key={filter.id}
            className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:bg-gray-100 transition"
          >
            {filter.label}
          </button>
        ))}
      </div>

<div className="flex flex-wrap gap-2 mb-4">
        {veg.map((filter) => (
          <button
            key={filter.id}
            className="border border-gray-300 rounded-full px-3 py-1 text-sm hover:bg-gray-100 transition"
          >
            {filter.label}
          </button>
        ))}
      </div> 


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((rest: any) => (
          <Link
            to={`/restaurant/${rest.info.id}`}
            key={rest.info.id}
            className="bg-white p-4 rounded-lg hover:scale-[1.02] transition-transform"
          >
            <img
              src={`https://media-assets.swiggy.com/${rest.info.cloudinaryImageId}`}
              alt={rest.info.name}
              className="w-full h-40 object-cover rounded-2xl mb-2"
            />
            <h3 className="text-lg font-bold mb-2">{rest.info.name}</h3>

            <p className="text-sm font-bold flex items-center gap-1">
              {rest.info.avgRating} <Icon name="star" size={10} />
              {rest.info.sla?.slaString}
            </p>
            <p className="text-sm text-gray-500">
              {rest.info.cuisines?.join(", ")}
            </p>
            <p className="text-sm ">{rest.info.costForTwo}</p>
            {rest.info.aggregatedDiscountInfoV3 && (
              <p className=" font-bold">
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
