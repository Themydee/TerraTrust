
import React from "react";
import { Link } from "react-router-dom";
import { Leaf, CircleDollarSign, Truck, BarChart2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { TransactionTable } from "@/components/tables/TransactionTable";

export function FarmerDashboard() {
  // Mock data for farmer dashboard
  const loanStatus = {
    amount: 5000,
    repaid: 2500,
    dueDate: "2023-12-31",
    status: "active",
  };

  const produceItems = [
    { id: 1, name: "Organic Tomatoes", quantity: 500, unit: "kg", available: 350 },
    { id: 2, name: "Sweet Corn", quantity: 1200, unit: "kg", available: 1200 },
    { id: 3, name: "Bell Peppers", quantity: 300, unit: "kg", available: 120 },
  ];

  const upcomingDeliveries = [
    { id: 1, date: "2023-11-15", items: "Fertilizer, Seeds", status: "scheduled" },
    { id: 2, date: "2023-11-22", items: "Tools, Pesticide", status: "processing" },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Farmer Dashboard" 
        description="Manage your farm operations and track your produce"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBox
          title="Loan Status"
          value={`$${loanStatus.amount}`}
          description="Total loan amount"
          icon={<CircleDollarSign className="h-6 w-6" />}
          footer={`Due date: ${loanStatus.dueDate}`}
          color="amber"
        />
        <StatusBox
          title="Available Produce"
          value="1,670kg"
          description="Total available produce"
          icon={<Leaf className="h-6 w-6" />}
          footer="3 active listings"
          color="emerald"
        />
        <StatusBox
          title="Upcoming Deliveries"
          value="2"
          description="Pending deliveries"
          icon={<Truck className="h-6 w-6" />}
          footer="Next: Nov 15, 2023"
          color="blue"
        />
        <StatusBox
          title="Market Trends"
          value="+12.5%"
          description="Price increase this month"
          icon={<BarChart2 className="h-6 w-6" />}
          footer="Average market index"
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Summary</CardTitle>
            <CardDescription>Current loan status and repayment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Loan Amount</span>
                <span className="font-medium">${loanStatus.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Repaid</span>
                <span className="font-medium">${loanStatus.repaid} (50%)</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining</span>
                <span className="font-medium">${loanStatus.amount - loanStatus.repaid}</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Repayment Progress</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/loans" className="w-full">View Loan Details</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Produce Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Produce Inventory</CardTitle>
            <CardDescription>Current produce availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {produceItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Total: {item.quantity} {item.unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {item.available} {item.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/produce" className="w-full">Manage Produce</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Upcoming Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Scheduled input deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Delivery #{delivery.id}</div>
                    <div className={`px-2 py-1 rounded-full text-xs ${delivery.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {delivery.status === 'scheduled' ? 'Scheduled' : 'Processing'}
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    <div>Date: {delivery.date}</div>
                    <div>Items: {delivery.items}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/deliveries" className="w-full">View All Deliveries</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Transactions */}
      
    </div>
  );
}
