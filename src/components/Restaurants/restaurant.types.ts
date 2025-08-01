
export type Restaurant = {
  info: {
    id: string;
    name: string;
    cloudinaryImageId: string;
    locality:string;
    areaName: string;
    costForTwo: string;
    cuisines: string[];
    avgRating: number;
    sla: {
      deliveryTime: number;
      slaString: string;
      lastMileTravelString: string;
    };
    aggregatedDiscountInfoV3?: {
      header: string;
      subHeader: string;
    };
  };
  cta: {
    link: string;
    type: string;
  };
};
