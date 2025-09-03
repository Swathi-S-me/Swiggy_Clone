import { useQuery } from "@tanstack/react-query";
import type { CollectionData } from "../pages/CollectionPage";



const fetchCollection = async (id: string, tags?: string): Promise<CollectionData> => {
  const collectionUrl = `http://localhost:5000/api/collection?id=${id}${
    tags ? `&tags=${encodeURIComponent(tags)}` : ""
  }`;
  
  const res = await fetch(collectionUrl);
  if (!res.ok) throw new Error("Failed to fetch collection data");
  return res.json();
};

export const useCollection = (id: string, tags?: string) => {
  return useQuery({
    queryKey: ["collection", id, tags],
    queryFn: () => fetchCollection(id, tags),
    enabled: !!id,
  });
};