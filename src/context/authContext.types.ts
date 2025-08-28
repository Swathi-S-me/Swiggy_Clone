export type User = {
  name: string;
  phone: string;
  email: string;
  role: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};
