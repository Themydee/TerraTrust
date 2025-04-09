import React from "react";
import { PackageCheck, Truck, CalendarCheck, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBox } from "@/components/ui/status-box";
import { DashboardTitle } from "@/components/DashboardTitle";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

export function DeliveriesDashboard() {
  const isMobile = useIsMobile();
  
  // Mock data for upcoming deliveries
  const upcomingDeliveries = [
    {
      id: "DEL1001",
      date: "2023-11-20",
      type: "Incoming",
      items: "Fertilizer, Seeds, Farming Tools",
      status: "scheduled",
      provider: "AgriSupplies Co."
    },
    {
      id: "DEL1002",
      date: "2023-11-25",
      type: "Incoming",
      items: "Pesticides, Growth Enhancers",
      status: "processing",
      provider: "FarmChem Solutions"
    },
    {
      id: "DEL1003",
      date: "2023-12-02",
      type: "Outgoing",
      items: "Organic Tomatoes (350kg)",
      status: "scheduled",
      destination: "FreshMart Distribution Center"
    }
  ];
  
  // Mock data for delivery history
  const deliveryHistory = [
    {
      id: "DEL998",
      date: "2023-10-25",
      type: "Incoming",
      items: "Seasonal Seeds, Organic Fertilizer",
      status: "completed",
      provider: "AgriSupplies Co."
    },
    {
      id: "DEL997",
      date: "2023-10-18",
      type: "Outgoing",
      items: "Bell Peppers (120kg), Carrots (200kg)",
      status: "completed",
      destination: "City Fresh Foods"
    },
    {
      id: "DEL996",
      date: "2023-10-10",
      type: "Incoming",
      items: "Farming Tools, Irrigation Supplies",
      status: "completed",
      provider: "Farm Equipment Depot"
    },
    {
      id: "DEL995",
      date: "2023-10-05",
      type: "Outgoing",
      items: "Sweet Corn (500kg)",
      status: "completed",
      destination: "Green Grocers Co-op"
    },
  ];
  
  // Mock data for requested deliveries
  const requestedDeliveries = [
    {
      id: "REQ101",
      date: "2023-11-30",
      items: "Greenhouse Materials",
      status: "pending",
      notes: "Materials for expanding the tomato greenhouse"
    },
    {
      id: "REQ102",
      date: "2023-12-05",
      items: "Winter Seeds, Cold Weather Equipment",
      status: "under_review",
      notes: "Preparation for winter planting"
    }
  ];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Scheduled
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Processing
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Pending
          </Badge>
        );
      case "under_review":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
            Under Review
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <DashboardTitle 
        title="Deliveries" 
        description="Manage your incoming and outgoing farm deliveries"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatusBox
          title="Upcoming Deliveries"
          value="3"
          description="Scheduled deliveries"
          icon={<Truck className="h-6 w-6" />}
          footer="Next: Nov 20, 2023"
          color="blue"
        />
        <StatusBox
          title="Delivery Requests"
          value="2"
          description="Pending requests"
          icon={<Package className="h-6 w-6" />}
          footer="Awaiting approval"
          color="violet"
        />
        <StatusBox
          title="This Month"
          value="8"
          description="Total deliveries"
          icon={<CalendarCheck className="h-6 w-6" />}
          footer="5 incoming, 3 outgoing"
          color="emerald"
        />
        <StatusBox
          title="Completed"
          value="28"
          description="Total completed"
          icon={<PackageCheck className="h-6 w-6" />}
          footer="Past 6 months"
          color="amber"
        />
      </div>

      <Tabs defaultValue="upcoming">
        <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
          <TabsList className={`${isMobile ? 'w-[400px]' : ''}`}>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="request">Request Delivery</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Scheduled incoming and outgoing deliveries</CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Source/Destination</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.date}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant={delivery.type === "Incoming" ? "default" : "secondary"}>
                            {delivery.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{delivery.items}</TableCell>
                        <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {delivery.provider || delivery.destination}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">
                  Showing {upcomingDeliveries.length} upcoming deliveries
                </span>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Requested Deliveries</CardTitle>
              <CardDescription>Pending delivery requests</CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requestedDeliveries.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.items}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[200px] truncate">{request.notes}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 hover:text-red-600">
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Delivery History</CardTitle>
              <CardDescription>Record of past deliveries</CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Source/Destination</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveryHistory.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.date}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant={delivery.type === "Incoming" ? "default" : "secondary"}>
                            {delivery.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{delivery.items}</TableCell>
                        <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {delivery.provider || delivery.destination}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Receipt</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request a Delivery</CardTitle>
              <CardDescription>Submit a new delivery request</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="delivery-type" className="text-sm font-medium">Delivery Type</label>
                    <select id="delivery-type" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="">Select type...</option>
                      <option value="incoming">Incoming (Supplies)</option>
                      <option value="outgoing">Outgoing (Produce)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="delivery-date" className="text-sm font-medium">Requested Date</label>
                    <input
                      id="delivery-date"
                      type="date"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="delivery-items" className="text-sm font-medium">Items</label>
                  <textarea 
                    id="delivery-items" 
                    rows={2} 
                    placeholder="List all items for delivery..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="delivery-quantity" className="text-sm font-medium">Quantity (if applicable)</label>
                    <div className="flex items-center gap-2">
                      <input
                        id="delivery-quantity"
                        type="number"
                        placeholder="Amount"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      />
                      <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <option value="kg">kg</option>
                        <option value="units">units</option>
                        <option value="tons">tons</option>
                        <option value="boxes">boxes</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="delivery-provider" className="text-sm font-medium">Provider/Destination</label>
                    <input
                      id="delivery-provider"
                      type="text"
                      placeholder="Enter company name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="delivery-notes" className="text-sm font-medium">Additional Notes</label>
                  <textarea 
                    id="delivery-notes" 
                    rows={3} 
                    placeholder="Any special instructions or details..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  ></textarea>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button className="w-full sm:w-auto">Submit Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
