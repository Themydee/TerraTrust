
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { FarmerDashboard } from "@/components/dashboards/FarmerDashboard";
import { DistributorDashboard } from "@/components/dashboards/DistributorDashboard";
import { FinancialDashboard } from "@/components/dashboards/FinancialDashboard";
import { RegulatorDashboard } from "@/components/dashboards/RegulatorDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case "farmer":
        return <FarmerDashboard />;
      case "distributor":
        return <DistributorDashboard />;
      case "financial":
        return <FinancialDashboard />;
      case "regulator":
        return <RegulatorDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}
