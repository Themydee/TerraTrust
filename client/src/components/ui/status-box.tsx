
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBoxProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  footer?: string;
  color?: "blue" | "green" | "amber" | "red" | "violet" | "emerald";
  className?: string;
}

export function StatusBox({
  title,
  value,
  description,
  icon,
  footer,
  color = "blue",
  className,
}: StatusBoxProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-200";
      case "green":
        return "bg-green-50 border-green-200";
      case "amber":
        return "bg-amber-50 border-amber-200";
      case "red":
        return "bg-red-50 border-red-200";
      case "violet":
        return "bg-violet-50 border-violet-200";
      case "emerald":
        return "bg-emerald-50 border-emerald-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getIconColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "green":
        return "bg-green-100 text-green-600";
      case "amber":
        return "bg-amber-100 text-amber-600";
      case "red":
        return "bg-red-100 text-red-600";
      case "violet":
        return "bg-violet-100 text-violet-600";
      case "emerald":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className={cn("rounded-lg border p-4", getColorClasses(), className)}>
      <div className="flex items-center">
        {icon && (
          <div className={cn("p-2 rounded-full mr-3", getIconColorClasses())}>
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-sm mt-1 text-muted-foreground">{description}</p>
          )}
          {footer && (
            <p className="text-xs mt-2 font-medium">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
