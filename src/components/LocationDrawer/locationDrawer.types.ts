export interface LocationProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RecentLocation {
  lat: number;
  lng: number;
  address: string;
}
export type Suggestion = {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
};
