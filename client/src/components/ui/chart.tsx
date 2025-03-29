
import * as React from "react"
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Area, AreaChart as RechartsAreaChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, Legend } from "recharts"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["blue", "green", "red", "yellow", "purple", "pink", "indigo"],
  valueFormatter = (value: number) => `${value}`,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip formatter={(value: number) => valueFormatter(value)} />
        <CartesianGrid strokeDasharray="3 3" />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={`hsl(var(--${colors[i % colors.length]}))`} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["blue", "green", "red", "yellow", "purple", "pink", "indigo"],
  valueFormatter = (value: number) => `${value}`,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip formatter={(value: number) => valueFormatter(value)} />
        <CartesianGrid strokeDasharray="3 3" />
        {categories.map((category, i) => (
          <Line key={category} type="monotone" dataKey={category} stroke={`hsl(var(--${colors[i % colors.length]}))`} />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ["blue", "green", "red", "yellow", "purple", "pink", "indigo"],
  valueFormatter = (value: number) => `${value}`,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          {categories.map((category, i) => (
            <linearGradient key={category} id={`color-${category}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`hsl(var(--${colors[i % colors.length]}))`} stopOpacity={0.8} />
              <stop offset="95%" stopColor={`hsl(var(--${colors[i % colors.length]}))`} stopOpacity={0.2} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey={index} />
        <YAxis />
        <Tooltip formatter={(value: number) => valueFormatter(value)} />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        {categories.map((category, i) => (
          <Area 
            key={category} 
            type="monotone" 
            dataKey={category} 
            stroke={`hsl(var(--${colors[i % colors.length]}))`} 
            fillOpacity={1} 
            fill={`url(#color-${category})`} 
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

interface PieChartProps {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
}

export function PieChart({
  data,
  index,
  category,
  colors = ["primary", "secondary", "accent", "blue", "green", "red", "yellow", "purple", "pink", "indigo"],
  valueFormatter = (value: number) => `${value}`,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Tooltip formatter={(value: number) => valueFormatter(value)} />
        <Legend />
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={`hsl(var(--${colors[i % colors.length]}))`} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
