import React, { createContext, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });
    const data = res.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.name, email: data.email, _id: data._id })
    );
    setUser({ name: data.name, email: data.email, _id: data._id });
    return data;
  };

  const register = async (name, email, password) => {
    const res = await api.post("/users/register", { name, email, password });
    const data = res.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.name, email: data.email, _id: data._id })
    );
    setUser({ name: data.name, email: data.email, _id: data._id });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
