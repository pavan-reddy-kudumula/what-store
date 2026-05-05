// components/ProductDetails.tsx
"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductRating } from "@/components/ProductRating";
import { CartControls } from "@/components/CartControls";

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
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    const storedRating = window.localStorage.getItem(`product-rating-${product.id}`);

    if (storedRating === null) return;

    const parsedRating = Number(storedRating);

    if (Number.isFinite(parsedRating) && parsedRating >= 1 && parsedRating <= 5) {
      setUserRating(parsedRating);
    }
  }, [product.id]);

  useEffect(() => {
    if (userRating === null) return;

    window.localStorage.setItem(`product-rating-${product.id}`, String(userRating));
  }, [product.id, userRating]);

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

        <CartControls
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
          }}
          variant="default"
        />

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Orders ship with tracking, secure packaging, and responsive support.
        </p>
      </div>
    </section>
  );
}