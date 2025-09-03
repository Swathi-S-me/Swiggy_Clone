export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  defaultPrice?: number;
  description?: string;
  imageId?: string;
  quantity?:number;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface MenuProps {
  categorizedItems: MenuCategory[];
}
