import React from "react";
import type { RestaurantInfoCardProps } from "./restaurantMenuCard.types";
import Icon from "../Icons/Icon";




const RestaurantInfoCard: React.FC<RestaurantInfoCardProps> = ({ restaurantInfo }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {restaurantInfo.name}
        </h2>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <span className="text-green-600 font-semibold flex items-center gap-1">
            {restaurantInfo.avgRatingString}
            <Icon name="star" size={12} />
          </span>
          <span className="text-gray-700 font-bold">
            ({restaurantInfo.totalRatingsString})
          </span>
          <span className="text-gray-700 font-bold">
            {restaurantInfo.costForTwoMessage}
          </span>
        </div>

        <p className="text-sm text-orange-500 font-bold">
          {restaurantInfo.cuisines?.join(", ")}
        </p>
        <p className="text-sm text-gray-700 font-bold">
          Outlet: {restaurantInfo.locality}, {restaurantInfo.areaName}
        </p>
        <span className="text-gray-700 font-bold">
          {restaurantInfo.sla.slaString}
        </span>
      </div>
    </div>
  );
};

export default RestaurantInfoCard;
