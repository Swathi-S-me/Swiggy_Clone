import { useQuery } from "@tanstack/react-query";

const fetchSuggestions = async (query: string) => {
  if (!query.trim()) return null;

  const url = `http://localhost:5000/api/search?lat=13.0843007&lng=80.2704622&str=${encodeURIComponent(query)}&includeIMItem=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch search suggestions");
  return res.json();
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSuggestions(query),
    enabled: !!query,
  });
};
