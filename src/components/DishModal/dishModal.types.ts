export interface Dish {
  id:string;
  name: string;
  price: number;
  description: string;
  image?: string | null;
  nutrition?: string;
}