import React, { useEffect, useMemo, useState } from "react";
import { useAllRestaurants } from "../Queries/useAllRestaurants";
import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import { FilterModal } from "../FilterModal/FilterModal";

import { userLocation } from "../../context/LocationContext";
import Shimmer from "../Shimmer/Shimmer";
import Button from "../Button/Button";

const AllRestaurantsSection: React.FC = () => {
  const { location } = userLocation();
  const lat = location?.lat;
  const lng = location?.lng;

  const { data: restaurants = [], isLoading } = useAllRestaurants(
    lat ?? 0,
    lng ?? 0
  );
  const [filter, setFilter] = useState<any[]>([]);
  const [ratingFilters, setRatingFilters] = useState<any[]>([]);
  const [veg, setVeg] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    Ratings?: string;
    "Veg/Non-Veg"?: string;
    "Sort by"?: string;
    Cuisine?: string[];
    "Cost for Two"?: string;
  }>({});

  useEffect(() => {
    fetch(
      `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
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

        const ratingFacet = facets.find(
          (facet: any) => facet.label === "Ratings"
        );
        setRatingFilters(ratingFacet?.facetInfo || []);

        const isVegFacet = facets.find(
          (facet: any) => facet.label === "Veg/Non-Veg"
        );
        setVeg(isVegFacet?.facetInfo || []);
      });
  }, []);

  const uniqueCuisines = useMemo(() => {
    const cuisineSet = new Set<string>();
    restaurants.forEach((rest: any) => {
      rest.info.cuisines?.forEach((cuisine: string) => cuisineSet.add(cuisine));
    });
    return Array.from(cuisineSet).map((cuisine) => ({
      id: cuisine,
      label: cuisine,
      value: cuisine,
    }));
  }, [restaurants]);

  const costOptions = [
    { id: "0-200", label: "Rs.0 - Rs.200", value: "0-200" },
    { id: "200-400", label: "Rs.200 - Rs.400", value: "200-400" },
    { id: "400-600", label: "Rs.400 - Rs.600", value: "400-600" },
  ];

  const toggleFilter = (key: keyof typeof appliedFilters, value: any) => {
    setAppliedFilters((prev) => {
      const isSame =
        prev[key] === value ||
        JSON.stringify(prev[key]) === JSON.stringify(value);
      return {
        ...prev,
        [key]: isSame ? undefined : value,
      };
    });
  };

  if (isLoading) return <Shimmer className="w-40 h-40 flex-shrink-0 rounded-2xl" />;

  return (
    <div className="p-4">
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        ratingFilters={ratingFilters}
        sortOptions={filter.map(({ key, title }: any) => ({
          id: key,
          label: title,
          value: key,
        }))}
        cuisineOptions={uniqueCuisines}
        costOptions={costOptions}
        vegOptions={veg}
        currentFilters={appliedFilters}
        onApply={(filters) => {
          setAppliedFilters(filters);
          setIsFilterOpen(false);
        }}
      />
      <h2 className="text-xl font-bold mb-4">
        {`Restaurants with online food delivery in ${location?.address.split(",").slice(0,1)}`}
      </h2>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button
          onClick={() => setIsFilterOpen(true)}
          className="border border-black px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition"
        >
          Filter
        </Button>

        {costOptions.map((cost) => (
          <button
            key={cost.id}
            onClick={() => toggleFilter("Cost for Two", cost.value)}
            className={`border rounded-full px-3 py-1 text-sm transition ${
              appliedFilters["Cost for Two"] === cost.value
                ? "bg-gray-300"
                : "hover:bg-gray-100"
            }`}
          >
            {cost.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants
          .filter((rest: any) => {
            const {
              Ratings,
              "Veg/Non-Veg": VegFilter,
              Cuisine,
              "Cost for Two": Cost,
            } = appliedFilters;

            if (
              Ratings &&
              parseFloat(rest.info.avgRating) < parseFloat(Ratings)
            )
              return false;

            if (VegFilter) {
              const isVeg = rest.info.veg || false;
              if (VegFilter === "isVeg" && !isVeg) return false;
              if (VegFilter === "nonVeg" && isVeg) return false;
            }

            if (Cuisine && Cuisine.length > 0) {
              const matched = Cuisine.some((c: string) =>
                rest.info.cuisines?.includes(c)
              );
              if (!matched) return false;
            }

            if (Cost && rest.info.costForTwo) {
              const costValue = parseInt(
                rest.info.costForTwo.replace(/[^\d]/g, ""),
                10
              );
              const [min, max] = Cost.split("-").map(Number);
              if (costValue < min || costValue > max) return false;
            }

            return true;
          })
          .sort((a: any, b: any) => {
            const sortBy = appliedFilters["Sort by"];
            if (sortBy === "RATING") {
              return b.info.avgRating - a.info.avgRating;
            }
            if (sortBy === "DELIVERY_TIME") {
              return a.info.sla.deliveryTime - b.info.sla.deliveryTime;
            }
            return 0;
          })
          .map((rest: any) => (
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
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                {rest.info.name.slice(0, 23) + "..."}
              </h3>
              <p className="text-sm font-bold flex items-center gap-1 text-gray-950">
                {rest.info.avgRating} <Icon name="star" size={10} />
                {rest.info.sla?.slaString}
              </p>
              <p className="text-sm text-gray-500">
                {rest.info.cuisines.join(", ").length > 20
                  ? rest.info.cuisines.join(", ").slice(0, 20) + "..."
                  : rest.info.cuisines.join(", ")}
              </p>
              <p className="text-sm ">{rest.info.costForTwo}</p>
              {
                <p className=" font-bold text-gray-800">
                  {rest?.info?.aggregatedDiscountInfoV3?.header || "15% OFF"} -{" "}
                  {rest?.info?.aggregatedDiscountInfoV3?.subHeader ||
                    "ABOVE 299"}
                </p>
              }
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AllRestaurantsSection;
