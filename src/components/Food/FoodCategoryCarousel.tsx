import React from "react";
import HorizontalScrollCarousel from "../Carousel/HorizontalScrollCarousel";
import type { ImageInfo } from "./foodcategory.types";
import { useNavigate } from "@tanstack/react-router";
import Button from "../Button/Button";
import { useFoodCategories } from "../../queries/useFoodCategories";
import Shimmer from "../Shimmer/Shimmer";

const FoodCategoryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useFoodCategories();

  const handleClick = (item: ImageInfo) => {
    const collectionId = item.action.link
      ?.split("collection_id=")[1]
      ?.split("&")[0];
    
    if (collectionId) {
      navigate({
        to: "/collection/$id",
        params: { id: collectionId },
        search: { tags: item.accessibility?.altText || "" },
      });
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading food categories</p>
      </div>
    );
  }
 if (!isLoading && categories.length === 0) {
    return null;
  }
  return (
        <div className="mb-10 border-b border-gray-200">

    <HorizontalScrollCarousel
      title="What's on your mind?"
      items={categories}
      loading={isLoading}
      renderItem={(item: ImageInfo) => isLoading ? (
            <Shimmer className="w-40 h-40 rounded-lg" />
          ) : (
        <Button
          key={item.id}
          onClick={() => handleClick(item)}
          className="flex-shrink-0"
        >
          <img
            src={`https://media-assets.swiggy.com/${item.imageId}`}
            alt={item.accessibility.altText}
            className="w-40 h-40 object-cover hover:scale-105 transition-transform"
          />
        </Button>
      )}
    />
    </div>
  );
};

export default FoodCategoryCarousel;


