import React from "react";

type Variant = "primary" | "outline" | "gold-outline" | "navy" | "teal";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-gold-gradient text-white hover:shadow-lg shadow-md",
  outline: "border-2 border-white/80 text-white hover:bg-white hover:text-[#022b27]",
  "gold-outline": "border-2 border-[#c9a45c] text-[#c9a45c] hover:bg-[#c9a45c] hover:text-white",
  navy: "bg-[#022b27] text-white hover:bg-[#06453f]",
  teal: "bg-[#022b27] text-white hover:bg-[#06453f]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "font-semibold rounded-sm inline-flex items-center justify-center gap-2 transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
