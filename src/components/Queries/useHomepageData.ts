
import { useQuery } from "@tanstack/react-query";

export const useHomepageData = (lat: number, lng: number) => {
  return useQuery({
    queryKey: ["homepage-data", lat, lng],
    queryFn: async () => {
    const res = await fetch(
  `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
);
 
    const data = await res.json();
      return data;
    },
  });
};
