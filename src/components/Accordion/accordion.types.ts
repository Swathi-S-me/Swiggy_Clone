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

export interface MenuProps {
  categorizedItems: MenuCategory[];
}
