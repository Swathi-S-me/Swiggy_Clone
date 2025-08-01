
import { useQuery } from "@tanstack/react-query";

export const useHomepageData = () => {
  return useQuery({
    queryKey: ["homepage-data"],
    queryFn: async () => {
    //   const res = await fetch("/swiggy-api/dapi/restaurants/list/v5?lat=...&lng=...&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const res = await fetch(
  "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
);
 
    const data = await res.json();
      return data;
    },
  });
};
