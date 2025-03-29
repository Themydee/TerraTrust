
import { User as LucideUser } from "lucide-react";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "farmer" | "distributor" | "financial" | "regulator" | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (this would be replaced with a proper token check)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // This would typically be an API call
  const login = async (email: string, password: string) => {
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(user); // Replace with actual user data when implementing login logic
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Create a mock user (in a real app, this would register via an API)
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    // Simulate API call for password reset
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // In a real app, this would trigger a password reset email
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
