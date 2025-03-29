
import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
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

export function TransactionTable() {
  // Mock transaction data
  const transactions = [
    {
      id: "TX923847",
      date: "2023-11-10",
      type: "Produce Registration",
      description: "Organic Tomatoes - 500kg",
      status: "confirmed",
    },
    {
      id: "TX923846",
      date: "2023-11-08",
      type: "Loan Disbursement",
      description: "Working Capital Loan - $2,500",
      status: "confirmed",
    },
    {
      id: "TX923845",
      date: "2023-11-05",
      type: "Input Delivery",
      description: "Fertilizer Delivery - 200kg",
      status: "pending",
    },
    {
      id: "TX923844",
      date: "2023-11-01",
      type: "Loan Repayment",
      description: "Monthly Installment - $500",
      status: "confirmed",
    },
    {
      id: "TX923843",
      date: "2023-10-28",
      type: "Produce Sale",
      description: "Bell Peppers - 180kg",
      status: "confirmed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <Check className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
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
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{getStatusBadge(tx.status)}</TableCell>
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
