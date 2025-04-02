
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardTitle } from "@/components/DashboardTitle";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
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
import { UserRole } from "@/types/user";
import { Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InventoryPage() {
  // Mock inventory data
  const inventoryItems = [
    { 
      id: 1, 
      name: "Organic Tomatoes", 
      quantity: 4500, 
      unit: "kg", 
      source: "Green Acres Farm",
      status: "in-stock",
      lastUpdated: "2023-11-05"
    },
    { 
      id: 2, 
      name: "Sweet Corn", 
      quantity: 12000, 
      unit: "kg", 
      source: "Sunshine Organics",
      status: "in-stock",
      lastUpdated: "2023-11-04"
    },
    { 
      id: 3, 
      name: "Bell Peppers", 
      quantity: 3200, 
      unit: "kg", 
      source: "Valley Fresh Farm",
      status: "in-stock",
      lastUpdated: "2023-11-03"
    },
    { 
      id: 4, 
      name: "Carrots", 
      quantity: 4800, 
      unit: "kg", 
      source: "Harmony Fields",
      status: "in-stock",
      lastUpdated: "2023-11-02"
    },
    { 
      id: 5, 
      name: "Organic Spinach", 
      quantity: 850, 
      unit: "kg", 
      source: "Green Acres Farm",
      status: "low-stock",
      lastUpdated: "2023-11-01"
    },
    { 
      id: 6, 
      name: "Potatoes", 
      quantity: 8500, 
      unit: "kg", 
      source: "Harmony Fields",
      status: "in-stock",
      lastUpdated: "2023-10-30"
    },
    { 
      id: 7, 
      name: "Onions", 
      quantity: 6200, 
      unit: "kg", 
      source: "Valley Fresh Farm",
      status: "in-stock",
      lastUpdated: "2023-10-29"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "low-stock":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Low Stock
          </Badge>
        );
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout requiredRoles={["distributor" as UserRole]}>
      <div className="space-y-6">
        <DashboardTitle 
          title="Inventory Management" 
          description="Track and manage your current produce inventory"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Quantity
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">40,050 kg</div>
              <p className="text-xs text-muted-foreground">
                Current stock weight
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Items needing restock
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
            <CardDescription>
              Manage your current produce stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>
                        {item.quantity.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}