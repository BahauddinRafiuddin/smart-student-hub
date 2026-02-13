import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  const loadUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data.data);
      } catch {
        // Assume admin, decode token for role
        try {
          const decoded = jwt_decode(token);
          if (decoded.role === "admin") {
            setUser({
              id: decoded.id,
              email: "", // optional, or store in token if possible
              role: "admin",
            });
          } else {
            setUser(null);
            localStorage.removeItem("token");
          }
        } catch {
          setUser(null);
          localStorage.removeItem("token");
        }
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (creds) => {
    const { data } = await api.post("/auth/login", creds);
    console.log(data);
    localStorage.setItem("token", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    await loadUser();
  };

  const register = async (values) => {
    const { data } = await api.post("/v1/auth/register", values);
  };

  const loginAdmin = async (credentials) => {
    const { data } = await api.post("/admin/login", credentials);
    localStorage.setItem("token", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, loginAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
