import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import ProductDetails from "@/components/ProductDetails";
// import { ProductRating } from "@/components/ProductRating";
import { products } from "@/lib/products";

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  const product = products.find((p) => p.id === parsedId);
//   const formattedPrice = new Intl.NumberFormat(undefined, {
//     style: "currency",
//     currency: "USD",
//   }).format(product?.price ?? 0);
//   const reviewCount = Math.max(18, Math.round((product?.rating ?? 4.2) * 38));

  if (!product) return notFound();

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_52%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </Link>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="space-y-4">
              <span className="inline-flex w-fit items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                {product.category}
              </span>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {product.name}
              </h1>

              {/* <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                {product.description}
              </p> */}
            </div>

            {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Price
                </p>
                <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {formattedPrice}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Free shipping with secure checkout and easy returns.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Rating
                </p>
                <ProductRating
                  rating={product.rating ?? 0}
                  reviewCount={reviewCount}
                  className="mt-2"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-start">
          <div className="space-y-4 rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_28px_80px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
            <div className="flex items-center justify-between px-2 pb-1 pt-2 text-sm text-slate-500">
              <span className="font-medium uppercase tracking-[0.24em]">
                Gallery
              </span>
              <span>
                {product.images.length} image{product.images.length === 1 ? "" : "s"}
              </span>
            </div>
            <ImageCarousel images={product.images} />
          </div>

          <div className="lg:sticky lg:top-6">
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
