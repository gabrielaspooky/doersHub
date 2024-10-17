import React from "react";

export function Button({ children, variant, className, ...props }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "bg-transparent border border-purple-300 text-purple-700 hover:bg-purple-100 focus:ring-purple-500",
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className || ''}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}