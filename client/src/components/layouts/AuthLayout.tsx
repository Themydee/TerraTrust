
import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-lg shadow-lg animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center text-5xl">
          
            🌱
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
       
      </div>
    </div>
  );
}
