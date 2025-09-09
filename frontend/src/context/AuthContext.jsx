import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fake login (no backend)
  const login = async (email, password) => {
    setLoading(true);

    // Hardcoded test credentials
    if (email === "admin@test.com" && password === "admin123") {
      setUser({ name: "Admin User", email });
      localStorage.setItem("token", "dummy-token-123");
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  // Fake signup
  const signup = async (name, email, password) => {
    setLoading(true);
    // Just pretend signup succeeded
    setUser({ name, email });
    localStorage.setItem("token", "dummy-token-123");
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
