import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LoansDashboard } from "@/components/dashboards/loan";

export default function LoansPage() {
  return (
    <DashboardLayout requiredRoles={["farmer", "financial"]}>
      <LoansDashboard />
    </DashboardLayout>
  );
}
