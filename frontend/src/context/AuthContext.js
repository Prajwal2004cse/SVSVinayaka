import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [admin, setAdmin] = useState(
    localStorage.getItem("adminToken")
  );

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdmin(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
