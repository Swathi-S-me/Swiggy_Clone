import { useQuery } from "@tanstack/react-query";
import type { ImageInfo } from "../components/Food/foodcategory.types";

interface CategoryResponse {
  data: {
    cards: Array<{
      card: {
        card: {
          "@type": string;
          imageGridCards?: {
            info: ImageInfo[];
          };
        };
      };
    }>;
  };
}

const fetchFoodCategories = async (): Promise<ImageInfo[]> => {
  const res = await fetch(
    "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  
  if (!res.ok) throw new Error("Failed to fetch food categories");
  
  const data: CategoryResponse = await res.json();
  const cards = data?.data?.cards || [];
  
  const gridWidget = cards.find(
    (card: any) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
  );
  
  return gridWidget?.card?.card?.imageGridCards?.info || [];
};

export const useFoodCategories = () => {
  return useQuery({
    queryKey: ["foodCategories"],
    queryFn: fetchFoodCategories,
  });
};
