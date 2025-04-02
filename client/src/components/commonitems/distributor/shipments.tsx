import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ShipmentTable } from "@/components/tables/ShipmentTable";
import { DashboardTitle } from "@/components/DashboardTitle";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/types/user";

export default function ShipmentsPage() {
  return (
    <DashboardLayout requiredRoles={["distributor" as UserRole]}>
      <div className="space-y-6">
        <DashboardTitle 
          title="Shipment Management" 
          description="Track and manage all your product shipments"
        />
        
        <Card>
          <ShipmentTable />
        </Card>
      </div>
    </DashboardLayout>
  );
}