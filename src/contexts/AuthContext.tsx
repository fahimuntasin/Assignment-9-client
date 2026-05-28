"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "@/lib/api";
import { toast } from "sonner";

type User = {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: "user" | "owner";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (data: {
    name: string;
    email: string;
    photoURL: string;
    googleId: string;
  }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    photoURL: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function storeToken(data: any) {
  if (data.token) {
    localStorage.setItem("token", data.token);
    delete data.token;
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    storeToken(data);
    setUser(data);
    toast.success("Logged in successfully");
  };

  const googleLogin = async (googleData: {
    name: string;
    email: string;
    photoURL: string;
    googleId: string;
  }) => {
    const { data } = await api.post("/auth/google", googleData);
    storeToken(data);
    setUser(data);
    toast.success("Logged in with Google");
  };

  const register = async (registerData: {
    name: string;
    email: string;
    photoURL: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { data } = await api.post("/auth/register", registerData);
    storeToken(data);
    setUser(data);
    toast.success("Account created successfully");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, googleLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
