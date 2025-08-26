import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import { truncate } from "../../utils/text";
import type { RestaurantCardProps } from "./restaurantCard.types";

const IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/image/upload/";

const RestaurantCard: React.FC<RestaurantCardProps> = ({ rest, variant }) => {
  const { info } = rest;

  return (
    <Link
      to={`/restaurant/${info.id}`}
      className={`bg-white p-4 rounded-lg hover:scale-[1.02] transition-transform
        ${variant === "carousel" ? "min-w-[300px] flex-shrink-0" : ""}`}
    >
      <img
        src={`${IMAGE_BASE}${info.cloudinaryImageId}`}
        alt={info.name}
        className="w-full h-40 object-cover rounded-2xl mb-2"
      />

      <h3 className="text-lg font-bold mb-2 text-gray-900">
        {truncate(info.name, 23)}
      </h3>

      <p className="text-sm font-bold flex items-center gap-1 text-gray-950">
        {info.avgRating} <Icon name="star" size={10} />
        {info.sla.slaString}
      </p>

      <p className="text-sm text-gray-500">
        {truncate(info.cuisines.join(", "), 20)}
      </p>

      {variant === "grid" && (
        <>
          <p className="text-sm">{info.costForTwo}</p>
          <p className="font-bold text-gray-800">
            {info.aggregatedDiscountInfoV3?.header || "15% OFF"} -{" "}
            {info.aggregatedDiscountInfoV3?.subHeader || "ABOVE 299"}
          </p>
        </>
      )}

      {variant === "carousel" && (
        <p className="text-sm">
          {truncate(`${info.locality} - ${info.areaName}`, 25)}
        </p>
      )}
    </Link>
  );
};

export default RestaurantCard;
