export interface RestaurantInfo {
  id: string;
  name: string;
  cuisines: string[];
  locality: string;
  areaName: string;
  costForTwoMessage: string;
  avgRatingString: string;
  totalRatingsString: string;
  sla: {
    slaString: string;
  };
}

export interface RegularCard {
  card: {
    card: {
      "@type": string;
      title?: string;
      itemCards?: ItemCard[];
    };
  };
}

export interface Card {
  card?: {
    card?: {
      "@type"?: string;
      info?: RestaurantInfo;
      itemCards?: ItemCard[];
      title?: string;
    };
  };
  groupedCard?: {
    cardGroupMap: {
      REGULAR: {
        cards: RegularCard[];
      };
    };
  };
}
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  defaultPrice?: number;
  imageId?: string;
}
export interface ItemCard {
  card: {
    info: MenuItem;
  };
}
export interface RestaurantMenuResponse {
  data: {
    cards: Card[];
  };
}
