import { useQuery } from "@tanstack/react-query";
import type { ImageInfo } from "../components/Food/foodcategory.types";
import { userLocation } from "../context/LocationContext";
interface CategoryCard {
  card: {
    card: {
      "@type": string;
      imageGridCards?: {
        info: ImageInfo[];
      };
    };
  };
}

interface FoodCategoryResponse {
  data: {
    cards: CategoryCard[];
  };
}

const fetchFoodCategories = async (lat: number, lng: number): Promise<ImageInfo[]> => {
  const res = await fetch(
      `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
  );
  
  if (!res.ok) throw new Error("Failed to fetch food categories");
  
  const data: FoodCategoryResponse = await res.json();
  const cards = data?.data?.cards || [];
  
  const gridWidget = cards.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
  );
  
  return gridWidget?.card?.card?.imageGridCards?.info || [];
};

export const useFoodCategories = () => {
  const { location } = userLocation();
  const lat = location?.lat ?? 0;
  const lng = location?.lng ?? 0;
   return useQuery<ImageInfo[], Error>({
    queryKey: ["foodCategories", lat, lng],
    queryFn: () => fetchFoodCategories(lat, lng),
    enabled: !!location, 
  });
};
