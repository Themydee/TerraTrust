
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardTitle } from "@/components/DashboardTitle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Plus, Filter, ArrowUpDown, BarChart2 } from "lucide-react";

export default function ProducePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("current");

  // Mock data for produce items
  const produceItems = [
    { 
      id: 1, 
      name: "Organic Tomatoes", 
      variety: "Roma",
      quantity: 500, 
      availableQuantity: 350,
      unit: "kg", 
      price: 2.5,
      harvestDate: "2023-10-15",
      certifications: ["Organic", "Fair Trade"],
      status: "available" 
    },
    { 
      id: 2, 
      name: "Sweet Corn", 
      variety: "Golden Bantam",
      quantity: 1200, 
      availableQuantity: 1200,
      unit: "kg", 
      price: 1.8,
      harvestDate: "2023-10-20",
      certifications: ["Pesticide-free"],
      status: "available" 
    },
    { 
      id: 3, 
      name: "Bell Peppers", 
      variety: "California Wonder",
      quantity: 300, 
      availableQuantity: 120,
      unit: "kg", 
      price: 3.2,
      harvestDate: "2023-10-12",
      certifications: ["Organic"],
      status: "available" 
    },
    { 
      id: 4, 
      name: "Carrots", 
      variety: "Nantes",
      quantity: 800, 
      availableQuantity: 0,
      unit: "kg", 
      price: 1.5,
      harvestDate: "2023-09-30",
      certifications: ["Organic", "Local"],
      status: "sold" 
    },
    { 
      id: 5, 
      name: "Lettuce", 
      variety: "Romaine",
      quantity: 200, 
      availableQuantity: 0,
      unit: "kg", 
      price: 2.0,
      harvestDate: "2023-09-25",
      certifications: ["Pesticide-free", "Non-GMO"],
      status: "sold" 
    }
  ];

  // Filter produce items based on active tab
  const filteredProduceItems = produceItems.filter(item => {
    if (activeTab === "current") return item.status === "available";
    return item.status === "sold";
  });

  return (
    <DashboardLayout requiredRoles={["farmer"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <DashboardTitle 
            title="My Produce" 
            description="Manage your agricultural produce inventory"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Produce
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Produce</DialogTitle>
                <DialogDescription>
                  Enter the details of your new produce item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Tomatoes, Corn, etc." className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variety" className="text-right">
                    Variety
                  </Label>
                  <Input id="variety" placeholder="Roma, Golden Bantam, etc." className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input id="quantity" type="number" placeholder="100" className="col-span-2" />
                  <Select defaultValue="kg">
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="ton">ton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (USD)
                  </Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="harvest-date" className="text-right">
                    Harvest Date
                  </Label>
                  <Input id="harvest-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="certifications" className="text-right">
                    Certifications
                  </Label>
                  <Select defaultValue="organic">
                    <SelectTrigger id="certifications" className="col-span-3">
                      <SelectValue placeholder="Select certifications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="fairtrade">Fair Trade</SelectItem>
                      <SelectItem value="pesticidefree">Pesticide-free</SelectItem>
                      <SelectItem value="nongmo">Non-GMO</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Produce</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Total Produce</CardTitle>
              <div className="text-2xl font-bold">3,000 kg</div>
              <CardDescription>5 different produce varieties</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="text-xs text-muted-foreground mb-1">Storage Capacity Used</div>
              <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "65%" }} />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>65% used</span>
                <span>35% available</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Available for Sale</CardTitle>
              <div className="text-2xl font-bold">1,670 kg</div>
              <CardDescription>3 active listings</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-sm">All produce verified on blockchain</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tomatoes</span>
                  <div className="flex items-center text-emerald-600 text-sm">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    +12.5%
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Corn</span>
                  <div className="flex items-center text-emerald-600 text-sm">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    +8.2%
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peppers</span>
                  <div className="flex items-center text-red-500 text-sm">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    -3.1%
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                <BarChart2 className="h-3 w-3 mr-1" />
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="current">Current Inventory</TabsTrigger>
              <TabsTrigger value="sold">Sold History</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="current" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Current Produce Inventory</CardTitle>
                <CardDescription>Manage your available produce items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Variety</TableHead>
                      <TableHead>Harvest Date</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Price per Unit</TableHead>
                      <TableHead>Certifications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProduceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.variety}</TableCell>
                        <TableCell>{item.harvestDate}</TableCell>
                        <TableCell>
                          {item.availableQuantity} {item.unit}
                          <div className="text-xs text-muted-foreground">
                            of {item.quantity} {item.unit}
                          </div>
                        </TableCell>
                        <TableCell>${item.price}/{item.unit}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.certifications.map(cert => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProduceItems.length} items
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sold" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Sold Produce History</CardTitle>
                <CardDescription>History of your sold produce items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Variety</TableHead>
                      <TableHead>Harvest Date</TableHead>
                      <TableHead>Quantity Sold</TableHead>
                      <TableHead>Price per Unit</TableHead>
                      <TableHead>Certifications</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProduceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.variety}</TableCell>
                        <TableCell>{item.harvestDate}</TableCell>
                        <TableCell>{item.quantity} {item.unit}</TableCell>
                        <TableCell>${item.price}/{item.unit}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.certifications.map(cert => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProduceItems.length} items
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
