"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCartStore, type CartItem } from "@/lib/store";

interface CartControlsProps {
  product: Omit<CartItem, "quantity">;
  variant?: "default" | "compact";
  showLabel?: boolean;
}

export function CartControls({
  product,
  variant = "default",
  showLabel = true,
}: CartControlsProps) {
  const quantity = useCartStore(
    (state) =>
      state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const increment = () => {
    addItem(product);
  };

  const decrement = () => {
    removeItem(product);
  };

  if (variant === "compact") {
    return (
      <div className="flex w-fit items-center border border-slate-300 rounded-lg">
        <button
          onClick={decrement}
          className="p-2 hover:bg-slate-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} className="text-slate-600" />
        </button>
        <div className="min-w-16 px-4 text-center text-sm font-semibold text-slate-900">
          {quantity}
        </div>
        <button
          onClick={increment}
          className="p-2 hover:bg-slate-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} className="text-slate-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          {showLabel && (
            <>
              <p className="text-sm font-medium text-slate-900">Quantity</p>
              <p className="text-xs text-slate-500">Select how many you need</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={decrement}
            aria-label="Decrease quantity"
            className="h-11 rounded-none border-0 px-4 text-lg font-semibold text-slate-700 hover:bg-slate-100"
          >
            -
          </Button>
          <div className="min-w-16 px-4 text-center text-sm font-semibold text-slate-900">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={increment}
            aria-label="Increase quantity"
            className="h-11 rounded-none border-0 px-4 text-lg font-semibold text-slate-700 hover:bg-slate-100"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}