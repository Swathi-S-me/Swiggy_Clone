
export type Restaurant = {
  info: {
    id: string;
    name: string;
    cloudinaryImageId: string;
    locality:string;
    
    costForTwo: string;
    cuisines: string[];
    avgRating: string;
    veg?: boolean;
    sla: {
      deliveryTime: number;
      slaString: string;
      
    };
    aggregatedDiscountInfoV3?: {
      header: string;
      subHeader: string;
    };
  };
  
};
export interface SortOption {
  key: string;
  title: string;
}

export interface FacetInfo {
  id: string;
  label: string;
  value: string;
}

export interface Facet {
  label: string;
  facetInfo: FacetInfo[];
}

export interface FilterSortCard {
  card?: {
    card?: {
      ["@type"]?: string;
      sortConfigs?: SortOption[];
      facetList?: Facet[];
    };
  };
}