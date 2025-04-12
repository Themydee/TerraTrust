// React imports and hooks
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// UI Components
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardTitle } from "@/components/DashboardTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProduceItem {
  name: string;
  variety: string;
  quantity: number;
  price: number;
  unit: string;
  harvestDate: string;
  certifications: string[];
  availableQuantity: number; // Added this line
  status: string; // Added this line
}

export default function ProducePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("current");
  const [produceItems, setProduceItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [harvestDate, setHarvestDate] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchProduceData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/produce/fetch");
        const data = await response.json();
        setProduceItems(data);
      } catch (error) {
        console.error("Error fetching produce data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduceData();
  }, []);

  const handleAddProduce = async () => {
    setLoadingAdd(true);
    try {
      const newProduce: ProduceItem = {
        name,
        variety,
        quantity,
        price,
        unit,
        harvestDate,
        certifications,
        availableQuantity: quantity,
        status: "available", // Ensure the status is set
      };

      const response = await fetch("http://localhost:5000/api/produce/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduce),
      });

      if (response.ok) {
        const addedProduce = await response.json();
        console.log("Added produce:", addedProduce);
        setProduceItems((prevItems) => (Array.isArray(prevItems) ? [...prevItems, addedProduce] : [addedProduce]));
        console.log("Updated produce items:", produceItems);
        resetForm();
      } else {
        console.error("Error adding produce:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding produce:", error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const resetForm = () => {
    setName("");
    setVariety("");
    setQuantity(0);
    setPrice(0);
    setUnit("kg");
    setHarvestDate("");
    setCertifications([]);
  };

  const filteredProduceItems = Array.isArray(produceItems)
  ? produceItems.filter((item) => {
      if (activeTab === "current") return item.status === "available";
      return item.status === "sold";
    })
  : [];

  return (
    <DashboardLayout requiredRoles={["farmer"]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <DashboardTitle title="My Produce" description="Manage your agricultural produce inventory" />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add New Produce
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Produce</DialogTitle>
                <DialogDescription>Enter the details of your new produce item.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" placeholder="Tomatoes, Corn, etc." className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variety" className="text-right">Variety</Label>
                  <Input id="variety" placeholder="Roma, Golden Bantam, etc." className="col-span-3" value={variety} onChange={(e) => setVariety(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input id="quantity" type="number" className="col-span-2" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                  <Select defaultValue="kg" onValueChange={setUnit}>
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
                  <Label htmlFor="price" className="text-right">Price (₦)</Label>
                  <Input id="price" type="number" className="col-span-3" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="harvest-date" className="text-right">Harvest Date</Label>
                  <Input id="harvest-date" type="date" className="col-span-3" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="certifications" className="text-right">Certifications</Label>
                  <Select onValueChange={(value) => setCertifications(value ? [value] : [])}>
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
                <Button type="button" onClick={handleAddProduce} disabled={loadingAdd}>
                  {loadingAdd ? "Adding..." : "Add Produce"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="current" onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${isMobile ? 'w-[400px]' : 'w-[400px] md:w-auto'}`}>
            <TabsTrigger value="current">Current Inventory</TabsTrigger>
            <TabsTrigger value="sold">Sold History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Current Produce Inventory</CardTitle>
                <CardDescription>Manage your available produce items</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Variety</TableHead>
                        <TableHead className="hidden lg:table-cell">Harvest Date</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead className="hidden md:table-cell">Price per Unit</TableHead>
                        <TableHead className="hidden lg:table-cell">Certifications</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProduceItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.variety}</TableCell>
                          <TableCell className="hidden lg:table-cell">{item.harvestDate}</TableCell>
                          <TableCell>
                            {item.availableQuantity} {item.unit}
                            <div className="text-xs text-muted-foreground">
                              of {item.quantity} {item.unit}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">₦{item.price}/{item.unit}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {item.certifications.map(cert => (
                                <Badge key={cert} variant="outline" className="text-xs">{cert}</Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
