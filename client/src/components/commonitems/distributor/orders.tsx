
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardTitle } from "@/components/DashboardTitle";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user";
import { ShoppingCart, Package, TruckIcon, Filter } from "lucide-react";

export default function OrdersPage() {
  // Mock order data
  const orders = [
    {
      id: "ORD-38942",
      customer: "FreshMart Supermarkets",
      items: [
        { name: "Organic Tomatoes", quantity: 500, unit: "kg" },
        { name: "Bell Peppers", quantity: 350, unit: "kg" }
      ],
      total: 850,
      status: "shipped",
      date: "2023-11-10",
      delivery: "2023-11-15"
    },
    {
      id: "ORD-38941",
      customer: "Green Grocers Co-op",
      items: [
        { name: "Sweet Corn", quantity: 800, unit: "kg" },
        { name: "Carrots", quantity: 400, unit: "kg" }
      ],
      total: 1200,
      status: "processing",
      date: "2023-11-09",
      delivery: "2023-11-14"
    },
    {
      id: "ORD-38940",
      customer: "City Fresh Foods",
      items: [
        { name: "Bell Peppers", quantity: 300, unit: "kg" },
        { name: "Tomatoes", quantity: 400, unit: "kg" },
        { name: "Carrots", quantity: 250, unit: "kg" }
      ],
      total: 950,
      status: "pending",
      date: "2023-11-08",
      delivery: "2023-11-13"
    },
    {
      id: "ORD-38939",
      customer: "Health Foods Inc",
      items: [
        { name: "Organic Spinach", quantity: 200, unit: "kg" },
        { name: "Sweet Corn", quantity: 500, unit: "kg" },
        { name: "Onions", quantity: 350, unit: "kg" }
      ],
      total: 1050,
      status: "completed",
      date: "2023-11-05",
      delivery: "2023-11-10"
    },
    {
      id: "ORD-38938",
      customer: "Metro Grocery Chain",
      items: [
        { name: "Potatoes", quantity: 1200, unit: "kg" },
        { name: "Onions", quantity: 800, unit: "kg" },
        { name: "Carrots", quantity: 600, unit: "kg" }
      ],
      total: 2600,
      status: "completed",
      date: "2023-11-03",
      delivery: "2023-11-08"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Processing</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Shipped</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout requiredRoles={["distributor" as UserRole]}>
      <div className="space-y-6">
        <DashboardTitle 
          title="Order Management" 
          description="View and manage customer orders"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                New Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Pending/processing orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Shipped
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Orders in transit
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completed
              </CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered orders
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Customer Orders</CardTitle>
              <CardDescription>
                View and manage all customer orders
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.name}: {item.quantity} {item.unit}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{order.total} kg</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Showing 5 of 24 orders
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
