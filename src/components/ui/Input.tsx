import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "dark" | "light";
}

export default function Input({ label, error, id, className = "", variant = "dark", ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const isLight = variant === "light";

  const inputClasses = [
    "w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2",
    isLight
      ? "bg-white border-gray-300 text-navy placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
      : "bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:border-gold/30 focus:ring-gold/20",
    error ? (isLight ? "border-red-400" : "border-red-400/50") : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium mb-1.5"
        style={{ color: isLight ? "#4A5568" : "#D1D5DB" }}
      >
        {label}
        {props.required && <span className={isLight ? "text-teal-500" : "text-gold"} style={{ marginLeft: "2px" }}>*</span>}
      </label>
      <input id={inputId} className={inputClasses} {...props} />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
