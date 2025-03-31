
import React from "react";
import { Calendar, CircleDollarSign, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { LoanApplicationTable } from "@/components/tables/LoanApplicationTable";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function LoansDashboard() {
  const { toast } = useToast();
  
  // Mock data for active loans
  const activeLoans = [
    {
      id: "L1001",
      amount: 5000,
      repaid: 2500,
      dueDate: "2023-12-31",
      interestRate: "4.5%",
      nextPayment: {
        date: "2023-11-25",
        amount: 500,
      },
    },
    {
      id: "L1002",
      amount: 2500,
      repaid: 500,
      dueDate: "2024-03-15",
      interestRate: "3.8%",
      nextPayment: {
        date: "2023-11-30",
        amount: 250,
      },
    },
  ];
  
  // Mock data for payment history
  const paymentHistory = [
    { id: "P1001", date: "2023-10-25", amount: 500, status: "completed" },
    { id: "P1002", date: "2023-09-25", amount: 500, status: "completed" },
    { id: "P1003", date: "2023-08-25", amount: 500, status: "completed" },
    { id: "P1004", date: "2023-07-25", amount: 500, status: "completed" },
  ];
  
  const handleApplyForLoan = () => {
    toast({
      title: "Loan Application Submitted",
      description: "Your loan application has been submitted for review.",
    });
  };

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Farm Loans" 
        description="Manage your agricultural loans and financing"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBox
          title="Total Active Loans"
          value="2"
          description="Current loans"
          icon={<CircleDollarSign className="h-6 w-6" />}
          footer="$7,500 total amount"
          color="emerald"
        />
        <StatusBox
          title="Repayment Progress"
          value="$3,000"
          description="Total repaid"
          icon={<Progress value={40} className="h-2 w-16" />}
          footer="40% of total loans"
          color="blue"
        />
        <StatusBox
          title="Next Payment Due"
          value="Nov 25, 2023"
          description="$500 payment"
          icon={<Calendar className="h-6 w-6" />}
          footer="7 days remaining"
          color="amber"
        />
        <StatusBox
          title="Loan Eligibility"
          value="$15,000"
          description="Additional credit available"
          icon={<Clock className="h-6 w-6" />}
          footer="Based on your farm performance"
          color="violet"
        />
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeLoans.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Loan #{loan.id}</span>
                    <span className="text-primary">${loan.amount}</span>
                  </CardTitle>
                  <CardDescription>Agricultural Term Loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Repaid</span>
                      <span className="font-medium">${loan.repaid} ({Math.round((loan.repaid / loan.amount) * 100)}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining</span>
                      <span className="font-medium">${loan.amount - loan.repaid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate</span>
                      <span className="font-medium">{loan.interestRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date</span>
                      <span className="font-medium">{loan.dueDate}</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Repayment Progress</span>
                        <span>{Math.round((loan.repaid / loan.amount) * 100)}%</span>
                      </div>
                      <Progress value={Math.round((loan.repaid / loan.amount) * 100)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next payment:</span>
                      <span className="font-medium">${loan.nextPayment.amount} due on {loan.nextPayment.date}</span>
                    </div>
                    <Button variant="default" className="w-full">Make Payment</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of your previous loan payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">Payment #{payment.id}</div>
                      <div className="text-sm text-muted-foreground">{payment.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${payment.amount}</div>
                      <div className="text-xs text-emerald-600">Completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle>Apply for a New Loan</CardTitle>
              <CardDescription>Complete the form below to request farm financing</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="loan-amount" className="text-sm font-medium">Loan Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        id="loan-amount"
                        type="number"
                        placeholder="5000"
                        className="w-full pl-8 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="loan-purpose" className="text-sm font-medium">Purpose</label>
                    <select id="loan-purpose" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="">Select purpose...</option>
                      <option value="seeds">Seeds & Planting Materials</option>
                      <option value="equipment">Farm Equipment</option>
                      <option value="fertilizer">Fertilizers & Pesticides</option>
                      <option value="infrastructure">Farm Infrastructure</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="loan-description" className="text-sm font-medium">Description</label>
                  <textarea 
                    id="loan-description" 
                    rows={4} 
                    placeholder="Describe what you need the loan for and how it will improve your farm operations..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  ></textarea>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Important Notice</p>
                    <p className="mt-1">
                      All loan applications undergo verification through our blockchain network to ensure 
                      transparency and accelerate approval. Applications typically receive a response within 2-3 business days.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Submit Application</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Loan Application</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to submit this loan application? Once submitted, your farm production data
                      will be analyzed to determine eligibility.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" className="mt-2 sm:mt-0">Cancel</Button>
                    <Button onClick={handleApplyForLoan}>Confirm Submission</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
