export interface Dish {
  name: string;
  price: number;
  description: string;
  image?: string | null;
  nutrition?: string;
}