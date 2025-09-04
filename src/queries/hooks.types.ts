import type { ImageInfo } from "../components/Food/foodcategory.types";
import type { Restaurant } from "../components/Restaurants/restaurant.types";

export interface CategoryResponse {
  data: {
    cards: Array<{
      card: {
        card: {
          "@type": string;
          id?: string;
          imageGridCards?: {
            info: ImageInfo[];
          };
          gridElements?: {
            infoWithStyle?: {
              restaurants: Restaurant[];
            };
          };
        };
      };
    }>;
  };
}

export interface CategoryCard {
  card: {
    card: {
      "@type": string;
      imageGridCards?: {
        info: ImageInfo[];
      };
    };
  };
}

export interface FoodCategoryResponse {
  data: {
    cards: CategoryCard[];
  };
}
 export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  role:string
}
