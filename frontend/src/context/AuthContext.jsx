import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    if (token) {
      try {
        console.log("Refreshing user data...");
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to refresh user, logging out.", error);
        logout();
      }
    }
  }, [token]);

  useEffect(() => {
    setLoading(true);
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
