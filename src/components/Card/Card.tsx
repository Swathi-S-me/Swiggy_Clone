import React from "react";
import { Link } from "@tanstack/react-router";
import Icon from "../Icons/Icon";
import type { CardProps } from "./card.types";




const Card: React.FC<CardProps> = ({ rest, variant = "grid" }) => {
  const { info } = rest;

  return (
    <Link
      to={`/restaurant/${info.id}`}
      className={`bg-white p-4 rounded-lg hover:scale-[1.02] transition-transform
        ${variant === "carousel" ? "min-w-[300px] flex-shrink-0" : ""}
      `}
    >
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`}
        alt={info.name}
        className="w-full h-40 object-cover rounded-2xl mb-2"
      />

      <h3 className="text-lg font-bold mb-1 text-gray-900 truncate">
        {info.name}
      </h3>

      <p className="text-sm font-bold flex items-center gap-1 text-gray-950">
        {info.avgRating} <Icon name="star" size={10} />
        {info.sla?.slaString}
      </p>

     
                    <p className="text-sm text-gray-500">
                 {info.cuisines.join(", ").length > 20
                  ? info.cuisines.join(", ").slice(0, 25) + "..."
                  : info.cuisines.join(", ")}
              </p>

      {info.costForTwo && (
        <p className="text-sm text-gray-700">{info.costForTwo}</p>
      )}
      {variant === "grid" && (
        <>
         
          <p className="font-bold text-gray-800">
            {info.aggregatedDiscountInfoV3?.header || "15% OFF"} -{" "}
            {info.aggregatedDiscountInfoV3?.subHeader || "ABOVE 299"}
          </p>
        </>
      )}
    
    </Link>
  );
};

export default Card;
