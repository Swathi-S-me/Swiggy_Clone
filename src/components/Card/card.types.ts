import type { Restaurant } from "../Restaurants/restaurant.types";

export interface CardProps {
  rest: Restaurant; // restaurant object
  variant?: "grid" | "carousel"; // layout style
}