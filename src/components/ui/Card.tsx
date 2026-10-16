import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
}

export default function Card({ children, className = "", image, imageAlt = "", badge }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-sm">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
