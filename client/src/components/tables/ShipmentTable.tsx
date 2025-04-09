
import React from "react";
import { Truck, PackageCheck, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function ShipmentTable() {
  // Mock shipment data
  const shipments = [
    {
      id: "SH238742",
      origin: "Green Acres Farm",
      destination: "FreshMart Distribution Center",
      contents: "Organic Tomatoes, Bell Peppers",
      quantity: "950kg",
      status: "in_transit",
      progress: 65,
      eta: "Nov 12, 2023",
    },
    {
      id: "SH238741",
      origin: "Valley Fresh Farm",
      destination: "City Fresh Foods",
      contents: "Sweet Corn, Carrots",
      quantity: "1,250kg",
      status: "loading",
      progress: 15,
      eta: "Nov 14, 2023",
    },
    {
      id: "SH238740",
      origin: "Sunshine Organics",
      destination: "Green Grocers Co-op",
      contents: "Bell Peppers",
      quantity: "580kg",
      status: "arrived",
      progress: 100,
      eta: "Nov 10, 2023 (Delivered)",
    },
    {
      id: "SH238739",
      origin: "Harmony Fields",
      destination: "FreshMart Distribution Center",
      contents: "Tomatoes, Carrots, Corn",
      quantity: "1,850kg",
      status: "in_transit",
      progress: 42,
      eta: "Nov 15, 2023",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            <Truck className="mr-1 h-3 w-3" />
            In Transit
          </Badge>
        );
      case "loading":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <Loader2 className="mr-1 h-3 w-3" />
            Loading
          </Badge>
        );
      case "arrived":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <PackageCheck className="mr-1 h-3 w-3" />
            Arrived
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Contents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <div>{shipment.contents}</div>
                  <div className="text-sm text-muted-foreground">{shipment.quantity}</div>
                </TableCell>
                <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                <TableCell className="w-[180px]">
                  <div className="space-y-1">
                    <Progress value={shipment.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      ETA: {shipment.eta}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </>
  );
}
