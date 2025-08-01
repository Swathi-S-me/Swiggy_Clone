import { useQuery } from "@tanstack/react-query";

const fetchRestaurants = async () => {
  const res = await fetch("http://localhost:5000/api/swiggy");
  if (!res.ok) throw new Error("Failed to fetch Swiggy data");
  return res.json();
};

export const useRestaurants = () =>
  useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
