
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DeliveriesDashboard } from "@/components/dashboards/deliveries";

export default function DeliveriesPage() {
  return (
    <DashboardLayout requiredRoles={["farmer"]}>
      <DeliveriesDashboard />
    </DashboardLayout>
  );
}