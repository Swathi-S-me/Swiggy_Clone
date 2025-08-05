
export interface Option {
  id: string;
  label: string;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratingFilters: Option[];
  vegOptions: Option[];
  sortOptions: Option[];
}
