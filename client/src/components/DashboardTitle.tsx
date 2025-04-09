
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export function DashboardTitle({ title, description, className }: DashboardTitleProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-1 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
