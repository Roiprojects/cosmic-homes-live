import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`bg-gold text-[#0B1930] text-xs font-semibold px-3 py-1 rounded-lg inline-block ${className}`}
    >
      {children}
    </span>
  );
}
