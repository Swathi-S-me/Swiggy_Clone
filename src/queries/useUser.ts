import { useQuery} from "@tanstack/react-query";

interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  role:string
}

const fetchUser = async (phone: string): Promise<User> => {
  const res = await fetch(`http://localhost:5000/users?phone=${phone}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  const users = await res.json();
  return users[0];
};

export const useUser = (phone: string) => {
  return useQuery({
    queryKey: ["user", phone],
    queryFn: () => fetchUser(phone),
    enabled: !!phone,
  });
};