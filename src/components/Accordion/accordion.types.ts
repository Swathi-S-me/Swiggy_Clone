// src/types/menu.ts

export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  defaultPrice?: number;
  description?: string;
  imageId?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Props {
  categorizedItems: MenuCategory[];
}
