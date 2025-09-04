import type { Restaurant } from "../../components/Restaurants/restaurant.types";

export type MastheadCard = {
  "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead";
  title: string;
  description: string;
  count: string;
};

export type RestaurantCardType = {
  "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
  info: Restaurant["info"];
};

export type CardType = { card?: { card?: MastheadCard | RestaurantCardType| unknown } };

export interface CollectionData {
  data: { cards: CardType[] };
}