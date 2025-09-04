
import { createContext, useContext, useState, useEffect } from "react";
import type { AuthContextType, User } from "./authContext.types";
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };


  return (
    <AuthContext.Provider value={{ user, setUser,logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
