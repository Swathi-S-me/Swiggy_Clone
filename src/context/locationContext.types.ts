export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface LocationContextType {

  location: Location | null;
  setLocation: (loc: Location) => void;
}