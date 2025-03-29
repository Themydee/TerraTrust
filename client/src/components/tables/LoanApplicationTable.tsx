
import React from "react";
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

export function LoanApplicationTable() {
  // Mock loan application data
  const applications = [
    {
      id: "LA238742",
      farmer: "Green Acres Farm",
      amount: "$5,000",
      purpose: "Seed Purchase",
      date: "2023-11-08",
      status: "pending",
    },
    {
      id: "LA238741",
      farmer: "Valley Fresh Farm",
      amount: "$12,500",
      purpose: "Equipment Upgrade",
      date: "2023-11-07",
      status: "under_review",
    },
    {
      id: "LA238740",
      farmer: "Sunshine Organics",
      amount: "$8,200",
      purpose: "Working Capital",
      date: "2023-11-05",
      status: "pending",
    },
    {
      id: "LA238739",
      farmer: "Harmony Fields",
      amount: "$15,000",
      purpose: "Irrigation System",
      date: "2023-11-03",
      status: "approved",
    },
    {
      id: "LA238738",
      farmer: "Blue Sky Farms",
      amount: "$3,500",
      purpose: "Fertilizer Purchase",
      date: "2023-11-01",
      status: "rejected",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Pending
          </Badge>
        );
      case "under_review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Rejected
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
              <TableHead>Application ID</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.id}</TableCell>
                <TableCell>{app.farmer}</TableCell>
                <TableCell>{app.amount}</TableCell>
                <TableCell>{app.purpose}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                  {app.status === "pending" && (
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                      Approve
                    </Button>
                  )}
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
