import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async (query: string, lat: number, lng: number) => {
  if (!query.trim()) return null;

  const url = `http://localhost:5000/api/search?lat=${lat}&lng=${lng}&str=${encodeURIComponent(query)}&includeIMItem=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch search suggestions");
  return res.json();
};

export const useSearchSuggestions = (query: string, lat: number, lng: number) => {
  return useQuery({
    queryKey: ["search", query, lat, lng],
    queryFn: () => fetchSuggestions(query, lat, lng),
    enabled: !!query && !!lat && !!lng,
  });
};
