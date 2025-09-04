export interface DishInfo {
  id: string;
  name: string;
  price?: number;
  defaultPrice?: number;
  description?: string;
  imageId?: string;
  nutrition?: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  avgRating?: number;
  sla?: { slaString: string };
  cloudinaryImageId?: string;
  costForTwo?: number;
  cuisines?: string[];
  adTrackingId?: string;
  aggregatedDiscountInfoV3?: {
    header?: string;
  };
}

export interface DishCardApi {
  card: {
    card: {
      "@type": string;
      info: DishInfo;
      restaurant?: { info: RestaurantInfo };
    };
  };
}

export interface RestaurantCardApi {
  card: {
    card: {
      info: RestaurantInfo;
    };
  };
}

export interface GroupedCardApi {
  groupedCard: {
    cardGroupMap: {
      DISH?: { cards: DishCardApi[] };
      RESTAURANT?: { cards: RestaurantCardApi[] };
    };
  };
}

export interface DishCard {
  dish: DishInfo;
  restaurant?: RestaurantInfo;
}
export type CardApi = GroupedCardApi | DishCardApi | RestaurantCardApi;
export interface RestaurantCard extends RestaurantInfo {}