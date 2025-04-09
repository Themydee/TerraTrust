
import { User as LucideUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

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

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    setLoading(true);
  
    try {
      const response = await axios.post(
        "https://https://terratrust.onrender.com/api/auth/signup", // replace with your backend URL
        { name, email, password, role },
        {
          withCredentials: true, // ✅ allow cookies to be set
        }
      );
  
      // Assuming the response has a 'user' field with the registered user data
      const registeredUser = response.data.user;
  
      // Check if user data is available
      if (!registeredUser) {
        throw new Error('User data not returned from server');
      }
  
      // Save user info to state and localStorage (optional)
      const userData: User = {
        id: registeredUser._id,
        email: registeredUser.email,
        name: registeredUser.name,
        role: registeredUser.role,
      };
  
      setUser(userData); // Set user state in your Auth context
      localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage for persistence
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);

      if (error.response?.data) {
        toast.error(error.response.data.message || 'Registration failed');
      } else {
        toast.error('Something went wrong, please try again later.');
      }
      throw error;
  
      // Provide user feedback based on error response (you can customize this further)
      const errorMessage = error.response?.data?.message || 'Registration failed, please try again.';
      toast.error(errorMessage); 
      throw error; // Rethrow error if needed for further handling

      
    } finally {
      setLoading(false);
    }
  };
  

  

  const logout = async () => {
    const navigate = useNavigate();

    try {
      await axios.post("https://https://terratrust.onrender.com/api/auth/logout");

      localStorage.removeItem("user");

      setUser(null);
      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
        console.error("Logout failed:", error);
    }
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
