
import React from "react";
import { Link } from "react-router-dom";
import { Package, Truck, BarChart2, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { ShipmentTable } from "@/components/tables/ShipmentTable";

export function DistributorDashboard() {
  // Mock data for distributor dashboard
  const activeShipments = 8;
  const totalInventory = 24500;
  const pendingOrders = 12;
  const deliveryEfficiency = 94;

  const inventoryItems = [
    { id: 1, name: "Organic Tomatoes", quantity: 4500, unit: "kg", source: "Green Acres Farm" },
    { id: 2, name: "Sweet Corn", quantity: 12000, unit: "kg", source: "Sunshine Organics" },
    { id: 3, name: "Bell Peppers", quantity: 3200, unit: "kg", source: "Valley Fresh Farm" },
    { id: 4, name: "Carrots", quantity: 4800, unit: "kg", source: "Harmony Fields" },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Distributor Dashboard" 
        description="Track shipments and manage your inventory"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBox
          title="Active Shipments"
          value={activeShipments.toString()}
          description="In transit"
          icon={<Truck className="h-6 w-6" />}
          footer="2 arriving today"
          color="blue"
        />
        <StatusBox
          title="Total Inventory"
          value={`${totalInventory}kg`}
          description="Current stock"
          icon={<Package className="h-6 w-6" />}
          footer="4 product categories"
          color="emerald"
        />
        <StatusBox
          title="Pending Orders"
          value={pendingOrders.toString()}
          description="To be processed"
          icon={<ShoppingCart className="h-6 w-6" />}
          footer="3 urgent orders"
          color="amber"
        />
        <StatusBox
          title="Delivery Efficiency"
          value={`${deliveryEfficiency}%`}
          description="On-time delivery"
          icon={<BarChart2 className="h-6 w-6" />}
          footer="Last 30 days"
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Current produce stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Source: {item.source}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {item.quantity.toLocaleString()} {item.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">In stock</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/inventory" className="w-full">View Full Inventory</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Order #38942</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Shipped
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Customer: FreshMart Supermarkets</div>
                  <div>Items: Organic Tomatoes, Bell Peppers</div>
                  <div>Total: 850kg</div>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Order #38941</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    Processing
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Customer: Green Grocers Co-op</div>
                  <div>Items: Sweet Corn, Carrots</div>
                  <div>Total: 1,200kg</div>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Order #38940</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Pending
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Customer: City Fresh Foods</div>
                  <div>Items: Bell Peppers, Tomatoes, Carrots</div>
                  <div>Total: 950kg</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/orders" className="w-full">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Active Shipments */}
      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>Track your deliveries in progress</CardDescription>
        </CardHeader>
        <ShipmentTable />
      </Card>
    </div>
  );
}
