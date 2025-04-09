
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Leaf,
  CircleDollarSign,
  Truck,
  BarChart4,
  ShieldCheck,
  FileBarChart,
  Package,
  BookOpen,
  FileText,
  Layers,
  User,
  Settings,
  Wallet,
  BarChart2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { user } = useAuth();

  // Define nav items based on user role
  const getNavItems = () => {
    const commonItems = [
      { title: "Dashboard", path: "/dashboard", icon: Home },
    ];

    switch (user?.role) {
      case "farmer":
        return [
          ...commonItems,
          { title: "My Produce", path: "/produce", icon: Leaf },
          { title: "Loans", path: "/loans", icon: CircleDollarSign },
          { title: "Deliveries", path: "/deliveries", icon: Truck },
        ];

      case "distributor":
        return [
          ...commonItems,
          { title: "Shipments", path: "/shipments", icon: Truck },
          { title: "Inventory", path: "/inventory", icon: Package },
          { title: "Orders", path: "/orders", icon: FileText },
        ];

      case "financial":
        return [
          ...commonItems,
          { title: "Loans", path: "/loans", icon: CircleDollarSign },
          { title: "Disbursements", path: "/disbursements", icon: Wallet },
          { title: "Repayments", path: "/repayments", icon: FileBarChart },
        ];

      case "regulator":
        return [
          ...commonItems,
          { title: "Overview", path: "/overview", icon: Layers },
          { title: "Compliance", path: "/compliance", icon: ShieldCheck },
          { title: "Participants", path: "/participants", icon: Users },
          { title: "Documentation", path: "/documentation", icon: BookOpen },
        ];

      default:
        return commonItems;
    }
  };

  return (
    <div
      className={cn(
        "sidebar h-screen fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar border-r transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0"
      )}
    >
      {/* Logo/Header */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-semibold text-sidebar-foreground"
        >
          
          <span className="text-xl">TerraTrust🌱</span>
        </Link>
      </div>

      {/* Nav items */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-1">
          {getNavItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "nav-link flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <Separator className="my-4 bg-sidebar-border" />

        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Blockchain Explorer
          </h3>
          <div className="mt-3 px-2 space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Layers className="h-5 w-5" />
              <Link to="/transaction">
                <span>View Transactions</span>
              </Link>

            </Button>
          </div>
        </div>
      </ScrollArea>

      <div className="bg-sidebar-accent/50 p-4 text-xs text-sidebar-foreground/70">
        <p>TerraTrust🌱 v1.0</p>
        <p className="mt-1">Blockchain-Based Supply Chain Transparency</p>
      </div>
    </div>
  );
}
