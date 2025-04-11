
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
import Profile from "./pages/Profile"
import Verify from "./pages/VerifyPage";

//farmer common items
import Produce from "./components/commonitems/farmer/produce"
import Loan from "@/components/commonitems/farmer/loan"
import Delivery from "@/components/commonitems/farmer/deliveries"
// distributor common items
import Inventory from "./components/commonitems/distributor/Inventory";
import Orders from "./components/commonitems/distributor/orders";
import Shipment from "./components/commonitems/distributor/shipments"



// import Transaction from "./components/tables/TransactionTable"

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
            <Route path="/verify" element={<Verify />} />
            
            {/* Placeholder routes for other dashboard pages */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Farmer routes */}
            <Route path="/produce" element={<Produce />} />
            <Route path="/loans" element={<Loan />} />
            <Route path="/deliveries" element={<Delivery />} />
             
            {/* Distributor routes */}
            <Route path="/shipments" element={<Shipment />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            
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

            

            {/* <Route path="/transaction" element={<Transaction />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
