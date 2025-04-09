
import React from "react";
import { Link } from "react-router-dom";
import { CircleDollarSign, BarChart2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { LoanApplicationTable } from "@/components/tables/LoanApplicationTable";
import { AreaChart } from "@/components/ui/chart";

export function FinancialDashboard() {
  // Mock data
  const totalLoans = 125000;
  const disbursed = 98500;
  const repaid = 42000;
  const defaultRate = 2.4;

  // Mock chart data
  const chartData = [
    {
      name: "Jan",
      disbursed: 15000,
      repaid: 5000,
    },
    {
      name: "Feb",
      disbursed: 18000,
      repaid: 8000,
    },
    {
      name: "Mar",
      disbursed: 22000,
      repaid: 12000,
    },
    {
      name: "Apr",
      disbursed: 16000,
      repaid: 15000,
    },
    {
      name: "May",
      disbursed: 27000,
      repaid: 20000,
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Financial Institution Dashboard" 
        description="Monitor loan disbursements and repayments"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBox
          title="Total Active Loans"
          value={`$${totalLoans.toLocaleString()}`}
          description="25 active loans"
          icon={<CircleDollarSign className="h-6 w-6" />}
          footer="Across 14 farms"
          color="emerald"
        />
        <StatusBox
          title="Total Disbursed"
          value={`$${disbursed.toLocaleString()}`}
          description="78.8% of committed funds"
          icon={<ArrowUpRight className="h-6 w-6" />}
          footer="Last disbursement: Today"
          color="blue"
        />
        <StatusBox
          title="Total Repaid"
          value={`$${repaid.toLocaleString()}`}
          description="42.6% of disbursed amount"
          icon={<ArrowDownRight className="h-6 w-6" />}
          footer="Last repayment: Yesterday"
          color="amber"
        />
        <StatusBox
          title="Default Rate"
          value={`${defaultRate}%`}
          description="Below industry average"
          icon={<BarChart2 className="h-6 w-6" />}
          footer="Down 0.5% from last month"
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Loan Activity Chart */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>Loan Activity</CardTitle>
            <CardDescription>Disbursements and Repayments (Last 5 months)</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <AreaChart
                data={chartData}
                index="name"
                categories={["disbursed", "repaid"]}
                colors={["blue", "green"]}
                valueFormatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Repayments */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Repayments</CardTitle>
            <CardDescription>Due in the next 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Green Acres Farm</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    Due in 3 days
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Amount: $1,250</div>
                  <div>Loan #: L-2023-0042</div>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Valley Fresh Farm</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    Due tomorrow
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Amount: $2,100</div>
                  <div>Loan #: L-2023-0038</div>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Harmony Fields</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Due in 9 days
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Amount: $1,800</div>
                  <div>Loan #: L-2023-0045</div>
                </div>
              </div>

              <div className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Sunshine Organics</div>
                  <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Due in 12 days
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <div>Amount: $2,500</div>
                  <div>Loan #: L-2023-0049</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link to="/repayments" className="w-full">View All Repayments</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Loan Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Loan Applications</CardTitle>
          <CardDescription>Latest applications that need review</CardDescription>
        </CardHeader>
        <LoanApplicationTable />
      </Card>
    </div>
  );
}
