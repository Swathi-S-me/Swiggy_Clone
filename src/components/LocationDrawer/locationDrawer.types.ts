export interface LocationProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RecentLocation {
  lat: number;
  lng: number;
  address: string;
}
