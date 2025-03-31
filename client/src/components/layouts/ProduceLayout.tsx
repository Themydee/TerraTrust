import React from 'react'
import { string } from 'zod';

interface ProduceLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}
const ProduceLayout = ({ children, title, subtitle}: ProduceLayoutProps) => {
  return (
    <div className='min-h-screen flex items-center justify-center p-4' >
      <div className="w-full max-w-xl space-y-8 bg-background p-4 rounded-lg shadow-lg animate-fade-in">
      <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
            </div>
            {children}
        </div>
    </div>
  )
}

export default ProduceLayout