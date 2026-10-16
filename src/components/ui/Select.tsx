import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  variant?: "dark" | "light";
}

export default function Select({ label, options, id, className = "", error, variant = "dark", ...props }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
  const isLight = variant === "light";

  const selectClasses = [
    "w-full px-4 py-3 border rounded-xl text-sm appearance-none transition-all focus:outline-none focus:ring-2",
    isLight
      ? "bg-white border-gray-300 text-navy focus:border-teal-500 focus:ring-teal-500/20"
      : "bg-white/[0.03] border-white/10 text-white focus:border-gold/30 focus:ring-gold/20",
    error ? (isLight ? "border-red-400" : "border-red-400/50") : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-4">
      <label htmlFor={selectId} className="block text-sm font-medium mb-1.5" style={{ color: isLight ? "#4A5568" : "#D1D5DB" }}>
        {label}
        {props.required && <span className={isLight ? "text-teal-500" : "text-gold"} style={{ marginLeft: "2px" }}>*</span>}
      </label>
      <div className="relative">
        <select id={selectId} className={selectClasses} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className={isLight ? "bg-white text-navy" : "bg-[#0B1930] text-white"}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4" style={{ color: isLight ? "#9CA3AF" : "#6B7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
