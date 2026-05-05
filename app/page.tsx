'use client';

import Image from "next/image";
import { products, categories } from "@/lib/products";
import { Search, ShoppingCart } from "lucide-react";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import Link from "next/link";
import { ProductRating } from "@/components/ProductRating";
import { useCartStore } from "@/lib/store";
import { Toaster, toast } from "react-hot-toast";

export default function HomePage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      duration: 2200,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <nav className="bg-[#0056b3] px-4 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="text-white text-3xl font-bold">WhatStore</div>
        <div className="flex-1 max-w-xl mx-4 md:mx-10">
          <div className="relative xl:left-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-blue-600/30 border border-blue-400/50 rounded-md py-2 pl-10 pr-4 text-white placeholder-blue-100 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
        <div>

        </div>
        <div className="flex justify-between gap-6">
        <Link href="/cart" className="flex items-center gap-2 bg-[#002d5b] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002d5b]/80 transition-colors">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
        </Link>
        <Image src="/avatar.png" alt="avatar" height={50} width={50} className="rounded"/>
        </div>
      </nav>

      {/* Main Content */}
      <main className="grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar (left) */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-[#0056b3] text-white p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-6">
              <p className="font-semibold mb-3">Category</p>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full 
                        border-2 border-white/30 bg-transparent
                        checked:border-[3px] checked:border-white"
                      defaultChecked={cat === "All"}
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <PriceRangeSlider />
          </div>
        </aside>

        {/* Product Grid (right) */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Product Listing
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
              >
                <Link href={`/product/${product.id}`} className="aspect-square bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-700 font-semibold mb-4">
                  ${product.price}
                </p>
                <ProductRating
                  rating={product.rating ?? 0}
                  reviewCount={Math.max(12, Math.round((product.rating ?? 4) * 20))}
                  className="mb-4"
                />
                <button 
                  onClick={() =>
                    handleAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                    })
                  }
                  className="mt-auto rounded-lg bg-[#0056b3] px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#0466ce] focus:outline-none">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "9999px",
              padding: "12px 16px",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.25)",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "#0f172a",
            },
          },
        }}
      />

      {/* Footer */}
      <footer className="bg-[#002d5b] text-white py-12 px-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Filters</h4>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>All</span>
              <span>Electronics</span>
            </div>
            <span className="block mt-8 text-sm text-gray-400">
              © 2024 American
            </span>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/facebook%20(1).png"
                  alt="Facebook"
                  width={40}
                  height={40}
                  className="block"
                />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/twitter.png"
                  alt="Twitter"
                  width={40}
                  height={40}
                  className="block"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="block"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};