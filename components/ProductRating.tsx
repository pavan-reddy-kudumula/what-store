"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type ProductRatingProps = {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
};

export function ProductRating({
  rating,
  reviewCount,
  showCount = true,
  className = "",
  interactive = false,
  onRatingChange,
}: ProductRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const displayRating = Number.isFinite(rating) ? rating : 0;
  const safeRating = Math.max(0, Math.min(5, displayRating));

  // Determine which rating to display
  const currentRating = interactive
    ? selectedRating ?? safeRating
    : safeRating;

  const handleStarClick = (index: number) => {
    if (!interactive) return;
    const newRating = index + 1;
    setSelectedRating(newRating);
    onRatingChange?.(newRating);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      <div
        className={`flex items-center gap-0.5 ${
          interactive ? "cursor-pointer" : ""
        }`}
        aria-label={`Rated ${currentRating.toFixed(1)} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const isFilled = index < Math.round(currentRating);

          return (
            <button
              key={index}
              onClick={() => handleStarClick(index)}
              className={`inline-block transition-colors ${
                interactive ? "cursor-pointer" : ""
              }`}
              disabled={!interactive}
              type="button"
              aria-label={
                interactive ? `Rate ${index + 1} stars` : undefined
              }
            >
              <Star
                className={`h-4 w-4 transition-colors ${
                  isFilled ? "fill-[#0056b3] text-[#0056b3]" : "text-slate-300"
                }`}
              />
            </button>
          );
        })}
      </div>

      <span className="text-sm font-medium text-slate-600">
        {currentRating.toFixed(1)}
      </span>

      {showCount && typeof reviewCount === "number" ? (
        <span className="text-sm text-slate-500">({reviewCount} reviews)</span>
      ) : null}
    </div>
  );
}