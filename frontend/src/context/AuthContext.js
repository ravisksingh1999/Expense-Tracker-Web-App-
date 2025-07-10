import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { getProfile } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      jwtDecode(token); // ✅ Decode to check validity
      getProfile(token)
        .then((res) => setUser(res.data))
        .catch(() => logout());
    } catch (err) {
      logout();
    }
  }, []); // ✅ Run only once

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
