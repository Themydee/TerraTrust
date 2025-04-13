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
  _id: any;
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
  const [editProduce, setEditProduce] = useState<ProduceItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProduceData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/produce/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch produce data");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setProduceItems(Array.isArray(data.produce) ? data.produce : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching produce data:", error);
        alert("Something went wrong while fetching data.");
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
        status: "available",
        _id: undefined,
      };

      const response = await fetch("http://localhost:5000/api/produce/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduce),
      });

      if (response.ok) {
        const addedProduce = await response.json();
        console.log("Added produce:", addedProduce);

        // Update the state immediately
        setProduceItems((prevItems) => [...prevItems, addedProduce.produce]);

        // Reset the form
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

  const handleUpdateProduce = async () => {
    if (!editProduce) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/produce/update/${editProduce.id || editProduce._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduce),
      });
  
      if (response.ok) {
        const updatedProduce = await response.json();
        console.log("Updated produce:", updatedProduce);
  
        // Update the produceItems state
        setProduceItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedProduce.id || item._id === updatedProduce._id ? updatedProduce : item
          )
        );
  
        setIsEditDialogOpen(false);
        setEditProduce(null);
      } else {
        console.error("Error updating produce:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating produce:", error);
    }
  };

  const handleEditClick = (produce: ProduceItem) => {
    setEditProduce(produce);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProduce = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:5000/api/produce/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProduceItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } else {
        console.error("Error deleting produce:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting produce:", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/produce/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        const updatedProduce = await response.json();
        console.log("Updated status:", updatedProduce);
  
        // Update the produceItems state
        setProduceItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedProduce.produce._id ? updatedProduce.produce : item
          )
        );
      } else {
        console.error("Error updating status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <DashboardLayout requiredRoles={["farmer"]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <DashboardTitle title="My Produce" description="Manage your agricultural produce inventory" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" /> Add Produce
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Produce</DialogTitle>
                <DialogDescription>Fill in the details to add a new produce item.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variety" className="text-right">Variety</Label>
                  <Input
                    id="variety"
                    className="col-span-3"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    className="col-span-3"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    className="col-span-3"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="harvest-date" className="text-right">Harvest Date</Label>
                  <Input
                    id="harvest-date"
                    type="date"
                    className="col-span-3"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                  />
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

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current Products</TabsTrigger>
            <TabsTrigger value="history">Product History</TabsTrigger>
          </TabsList>

          {/* Current Products */}
          <TabsContent value="current">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produceItems
                  .filter((item) => item.status === "available")
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.harvestDate}</TableCell>
                      <TableCell>{item.availableQuantity} {item.unit}</TableCell>
                      <TableCell>₦{item.price}/{item.unit}</TableCell>
                      <TableCell>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleUpdateStatus(item._id, "sold")}
                        >
                          Mark as Sold
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Product History */}
          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produceItems
                  .filter((item) => item.status === "sold")
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.variety}</TableCell>
                      <TableCell>{item.harvestDate}</TableCell>
                      <TableCell>{item.availableQuantity} {item.unit}</TableCell>
                      <TableCell>₦{item.price}/{item.unit}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Produce</DialogTitle>
            <DialogDescription>Update the details of your produce item.</DialogDescription>
          </DialogHeader>
          {editProduce && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={editProduce.name}
                  onChange={(e) => setEditProduce({ ...editProduce, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-variety" className="text-right">Variety</Label>
                <Input
                  id="edit-variety"
                  className="col-span-3"
                  value={editProduce.variety}
                  onChange={(e) => setEditProduce({ ...editProduce, variety: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  className="col-span-3"
                  value={editProduce.quantity}
                  onChange={(e) => setEditProduce({ ...editProduce, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  className="col-span-3"
                  value={editProduce.price}
                  onChange={(e) => setEditProduce({ ...editProduce, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-harvest-date" className="text-right">Harvest Date</Label>
                <Input
                  id="edit-harvest-date"
                  type="date"
                  className="col-span-3"
                  value={editProduce.harvestDate}
                  onChange={(e) => setEditProduce({ ...editProduce, harvestDate: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={handleUpdateProduce}>
              Update Produce
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
