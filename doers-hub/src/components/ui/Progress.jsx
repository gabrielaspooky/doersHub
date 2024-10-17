import React from "react";

export function Progress({ value, className, ...props }) {
  return (
    <div className={`w-full bg-purple-200 rounded-full h-2.5 ${className}`} {...props}>
      <div
        className="bg-green-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}