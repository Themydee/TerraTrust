import React from 'react'
import { DashboardTitle } from "@/components/DashboardTitle";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, AlertCircle } from "lucide-react"
import { Link } from 'react-router-dom';
const produce = () => {

  const Data = [
    {
      no : "001",
      name: "Okro",
      quantity: 500,
      unit: "kg",
      available: 300,
      type: "vegetable",
      status: "Good"

    },
    {
      no : "002",
      name: "Banana",
      quantity: 500,
      unit: "kg",
      available: 300,
      type: "vegetable",
      status: "Good"

    },
    {
      no : "003",
      name: "Spinach Leaves",
      quantity: 500,
      unit: "kg",
      available: 300,
      type: "vegetable",
      status: "Bad"

    },
    {
      no : "004",
      name: "Plantain",
      quantity: 500,
      unit: "kg",
      available: 300,
      type: "vegetable",
      status: "Good"

    },
    {
      no : "005",
      name: "Mango",
      quantity: 500,
      unit: "kg",
      available: 300,
      type: "vegetable",
      status: "Bad"

    }
  ];

  const statusBadge = (status: string) => {
    switch (status) {
      case "Good":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <Check className="mr-1 h-3 w-3" />
            Good
          </Badge>
        );

        case "Bad":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Bad
          </Badge>
        );
      default:
        return null;
          
    }
  }
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <DashboardTitle 
          title="Produce Dashboard" 
          description="Manage your farm products"
        />
        
        <div className='flex justify-center py-12'>
          <Button>
            <Link to="/produce/add">
            Add Products
            </Link>
          </Button>
        </div>
      </div>

      

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.map((dt) => (
                <TableRow key={dt.no}>
                <TableCell className="font-medium">{dt.no}</TableCell>
                <TableCell className="font-medium">{dt.name}</TableCell>
                <TableCell className="font-medium">{dt.quantity}</TableCell>
                <TableCell className="font-medium">{dt.unit}</TableCell>
                <TableCell className="font-medium">{dt.available}</TableCell>
                <TableCell className="font-medium">{statusBadge(dt.status)}</TableCell>
                <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  <Link to="/produce/edit">
                    Edit
                  </Link>
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

        
    </DashboardLayout>
  )
}

export default produce