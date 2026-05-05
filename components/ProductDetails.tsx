// components/ProductDetails.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductRating } from "@/components/ProductRating";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  rating?: number;
};

export default function ProductDetails({ product }: { product: Product }) {
  const [qty, setQty] = useState<number>(1);
  const [userRating, setUserRating] = useState<number | null>(null);
  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => Math.max(1, q - 1));

  const addToCart = () => {
    // Replace with real cart logic / API call
    console.log("Add to cart:", { productId: product.id, qty });
    // Optionally show UI feedback
    alert(`${qty} × ${product.name} added to cart`);
  };

  const handleRatingSubmit = (rating: number) => {
    setUserRating(rating);
    console.log(`User rated product ${product.id} with ${rating} stars`);
  };

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.4)] backdrop-blur">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            {product.category}
          </span>

          <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Verified purchase support
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Purchase details
          </p>
          <div className="text-3xl font-semibold tracking-tight text-slate-950">
            {formattedPrice}
          </div>
          <ProductRating
            rating={product.rating ?? 0}
            reviewCount={Math.max(18, Math.round((product.rating ?? 4.2) * 38))}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Rate this product
          </p>
          <ProductRating
            rating={userRating ?? 0}
            showCount={false}
            interactive={true}
            onRatingChange={handleRatingSubmit}
            className="py-2"
          />
          {userRating && (
            <p className="text-xs text-slate-600">
              Thank you for rating! Your feedback helps others.
            </p>
          )}
        </div>

        <p className="text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <Truck className="mb-2 h-4 w-4 text-slate-900" />
            Fast delivery
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <RotateCcw className="mb-2 h-4 w-4 text-slate-900" />
            30-day returns
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <BadgeCheck className="mb-2 h-4 w-4 text-slate-900" />
            Secure checkout
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Quantity</p>
              <p className="text-xs text-slate-500">Select how many you need</p>
            </div>
            <span className="text-xs font-medium text-slate-500">Limit 1-9</span>
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
                {qty}
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

            <Button
              onClick={addToCart}
              size="lg"
              className="w-full sm:flex-1 bg-slate-950 text-white shadow-lg shadow-slate-950/15 transition-all hover:bg-slate-800"
            >
              Add to Cart
            </Button>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Orders ship with tracking, secure packaging, and responsive support.
          </p>
        </div>
      </div>
    </section>
  );
}