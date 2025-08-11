// import React, { useEffect, useState } from "react";
// import HorizontalScrollCarousel from "../Carousel/HorizontalScrollCarousel";
// import type { ImageInfo } from "./foodcategory.types";
// import { useNavigate } from "@tanstack/react-router";
// import Button from "../Button/Button";

// const FoodCategoryCarousel: React.FC = () => {
//   const [categories, setCategories] = useState<ImageInfo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(
//       "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const cards = data?.data?.cards || [];
//         const gridWidget = cards.find(
//           (card: any) =>
//             card.card?.card?.["@type"] ===
//             "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
//         );
//         const info = gridWidget?.card?.card?.imageGridCards?.info || [];
//         setCategories(info);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleClick = (item: ImageInfo) => {
//     const collectionId = item.action.link
//       ?.split("collection_id=")[1]
//       ?.split("&")[0];

//     if (collectionId) {
//       navigate({
//         to: "/collection/$id",
//         params: { id: collectionId },
//         search: { tags: item.accessibility?.altText || "" },
//       });
//     }
//   };

//   return (
//     <HorizontalScrollCarousel
//       title="What's on your mind?"
//       items={categories}
//       loading={loading}
//       renderItem={(item: ImageInfo) => (
//         <Button
//           key={item.id}
//           onClick={() => handleClick(item)}
//           className="flex-shrink-0 "
//         >
//           <img
//             src={`https://media-assets.swiggy.com/${item.imageId}`}
//             alt={item.accessibility.altText}
//             className="w-40 h-40 object-cover   hover:scale-105 transition-transform"
//           />
//         </Button>
//       )}
//     />
//   );
// };

// export default FoodCategoryCarousel;


import React from "react";
import HorizontalScrollCarousel from "../Carousel/HorizontalScrollCarousel";
import type { ImageInfo } from "./foodcategory.types";
import { useNavigate } from "@tanstack/react-router";
import Button from "../Button/Button";
import { useFoodCategories } from "../../queries/useFoodCategories";

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

  return (
    <HorizontalScrollCarousel
      title="What's on your mind?"
      items={categories}
      loading={isLoading}
      renderItem={(item: ImageInfo) => (
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
  );
};

export default FoodCategoryCarousel;
