export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface FilterOptions {
  Ratings?: string;
  "Veg/Non-Veg"?: string;
  "Sort by"?: string;
  Cuisine?: string[];
  "Cost for Two"?: string;
}

export type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ratingFilters: Option[];
  vegOptions: Option[];
  sortOptions: Option[];
  cuisineOptions: Option[];
  costOptions: Option[];
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
};
