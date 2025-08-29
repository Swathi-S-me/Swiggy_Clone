import { useQuery } from "@tanstack/react-query";

const fetchIssues = async (key: string) => {
  const res = await fetch(`http://localhost:5000/api/help/${key}`);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
};

export const useHelpQuery = (key: string) => {
  return useQuery({
    queryKey: ["help-section", key],
    queryFn: () => fetchIssues(key),
    enabled: !!key
  });
};
