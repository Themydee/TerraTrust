
import React from "react";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, Activity, FileBarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { ComplianceTable } from "@/components/tables/ComplianceTable";
import { PieChart } from "@/components/ui/chart";

export function RegulatorDashboard() {
  // Mock data
  const participants = 42;
  const complianceRate = 94.5;
  const transactions = 1258;
  const auditsCompleted = 18;

  // Mock chart data
  const participantData = [
    {
      name: "Farmers",
      value: 24,
    },
    {
      name: "Distributors",
      value: 12,
    },
    {
      name: "Financial",
      value: 6,
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Regulator Dashboard" 
        description="Oversee system compliance and audit blockchain records"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBox
          title="Total Participants"
          value={participants.toString()}
          description="Across all roles"
          icon={<Users className="h-6 w-6" />}
          footer="+4 new this month"
          color="emerald"
        />
        <StatusBox
          title="Compliance Rate"
          value={`${complianceRate}%`}
          description="System-wide"
          icon={<ShieldCheck className="h-6 w-6" />}
          footer="3 violations pending review"
          color="blue"
        />
        <StatusBox
          title="Blockchain Transactions"
          value={transactions.toLocaleString()}
          description="Verified and recorded"
          icon={<Activity className="h-6 w-6" />}
          footer="Last 30 days"
          color="amber"
        />
        <StatusBox
          title="Audits Completed"
          value={auditsCompleted.toString()}
          description="Full verification cycle"
          icon={<FileBarChart className="h-6 w-6" />}
          footer="2 audits in progress"
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Participant Distribution */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Participant Distribution</CardTitle>
            <CardDescription>Breakdown by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart
                data={participantData}
                index="name"
                valueFormatter={(value: number) => `${value} participants`}
                category="value"
                colors={["emerald", "blue", "amber"]}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>24-hour operation summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Blockchain Transactions</div>
                  <div className="font-medium">124</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Produce Records</div>
                    <div>68</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Shipment Tracking</div>
                    <div>42</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Loan Activities</div>
                    <div>12</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">System Admin</div>
                    <div>2</div>
                  </div>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">New Participants</div>
                  <div className="font-medium">2</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Farmers</div>
                    <div>1</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Distributors</div>
                    <div>1</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">Compliance Alerts</div>
                  <div className="font-medium">3</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Data Discrepancies</div>
                    <div>2</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Late Reporting</div>
                    <div>1</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Monitoring</CardTitle>
          <CardDescription>Recent compliance reports and violations</CardDescription>
        </CardHeader>
        <ComplianceTable />
      </Card>
    </div>
  );
}
