import type { Restaurant } from "../Restaurants/restaurant.types";
export interface CardProps {
  rest: Restaurant; 
  variant?: "grid" | "carousel"; 
}