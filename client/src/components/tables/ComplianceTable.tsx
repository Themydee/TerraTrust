
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
import { ShieldAlert, ShieldCheck, AlertCircle } from "lucide-react";

export function ComplianceTable() {
  // Mock compliance data
  const complianceItems = [
    {
      id: "C238742",
      entity: "Valley Fresh Farm",
      type: "Data Discrepancy",
      description: "Reported quantity does not match blockchain record",
      date: "2023-11-09",
      severity: "medium",
      status: "investigating",
    },
    {
      id: "C238741",
      entity: "FreshMart Distribution",
      type: "Late Reporting",
      description: "Shipment confirmation delayed by 3 days",
      date: "2023-11-08",
      severity: "low",
      status: "resolved",
    },
    {
      id: "C238740",
      entity: "Agri Finance Corp",
      type: "Documentation Issue",
      description: "Missing loan collateral documentation",
      date: "2023-11-06",
      severity: "medium",
      status: "investigating",
    },
    {
      id: "C238739",
      entity: "Harmony Fields",
      type: "Data Discrepancy",
      description: "Produce grade certification mismatch",
      date: "2023-11-05",
      severity: "high",
      status: "flagged",
    },
    {
      id: "C238738",
      entity: "Green Acres Farm",
      type: "Procedure Violation",
      description: "Input supply chain validation incomplete",
      date: "2023-11-03",
      severity: "low",
      status: "resolved",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "investigating":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Investigating
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Resolved
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <ShieldAlert className="mr-1 h-3 w-3" />
            Flagged
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Low
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
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
              <TableHead>Report ID</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.entity}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{getSeverityBadge(item.severity)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Review
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
