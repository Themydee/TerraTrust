
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Placeholder routes for other dashboard pages */}
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            
            {/* Farmer routes */}
            <Route path="/produce" element={<Dashboard />} />
            <Route path="/loans" element={<Dashboard />} />
            <Route path="/deliveries" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            
            {/* Distributor routes */}
            <Route path="/shipments" element={<Dashboard />} />
            <Route path="/inventory" element={<Dashboard />} />
            <Route path="/orders" element={<Dashboard />} />
            
            {/* Financial routes */}
            <Route path="/disbursements" element={<Dashboard />} />
            <Route path="/repayments" element={<Dashboard />} />
            
            {/* Regulator routes */}
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/compliance" element={<Dashboard />} />
            <Route path="/participants" element={<Dashboard />} />
            <Route path="/documentation" element={<Dashboard />} />
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
