import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-purple-100 p-1 text-purple-500 ${className}`}
    {...props}
  />
));

export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm ${className}`}
    {...props}
  />
));

export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
));