'use client';

import { products, categories, filterProducts } from "@/lib/products";
import { Search, ShoppingCart } from "lucide-react";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import Link from "next/link";
import { ProductRating } from "@/components/ProductRating";
import { useCartStore } from "@/lib/store";
import { toast } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  // State for filter values
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Initialize filters from URL parameters
  useEffect(() => {
    const category = searchParams.get("category") || "All";
    const search = searchParams.get("search") || "";
    const priceMin = searchParams.get("priceMin") ? parseInt(searchParams.get("priceMin")!) : 0;
    const priceMax = searchParams.get("priceMax") ? parseInt(searchParams.get("priceMax")!) : 1000;

    setSelectedCategory(category);
    setSearchInput(search);
    setPriceRange([priceMin, priceMax]);

    // Apply filters
    const filtered = filterProducts({
      category: category !== "All" ? category : undefined,
      priceMin: priceMin,
      priceMax: priceMax,
      search: search,
    });

    setFilteredProducts(filtered);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrl({ category: category !== "All" ? category : null });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    updateUrl({ search: value || null });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    updateUrl({ priceMin: min, priceMax: max });
  };

  const updateUrl = (updates: { category?: string | null; search?: string | null; priceMin?: number; priceMax?: number }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.category !== undefined) {
      if (updates.category === null) {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }

    if (updates.search !== undefined) {
      if (updates.search === null) {
        params.delete("search");
      } else {
        params.set("search", updates.search);
      }
    }

    if (updates.priceMin !== undefined) {
      params.set("priceMin", updates.priceMin.toString());
    }

    if (updates.priceMax !== undefined) {
      params.set("priceMax", updates.priceMax.toString());
    }

    router.push(`?${params.toString()}`);
  };

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
    <>
      {/* Header */}
      <nav className="bg-[#0056b3] px-4 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="text-white text-3xl font-bold">Logo</div>
        <div className="flex-1 max-w-xl mx-4 md:mx-10 inline">
          <div className="relative xl:left-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-100" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full bg-blue-600/30 border border-blue-400/50 rounded-md py-2 pl-10 pr-4 text-white placeholder-blue-100 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
        <div>

        </div>
        <div className="flex justify-between gap-6">
        <Link href="/cart" className="flex items-center gap-2 bg-[#002d5b] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002d5b]/80 transition-colors">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline text-lg">Cart</span>
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
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                      className="h-4 w-4 cursor-pointer appearance-none rounded-full 
                        border-2 border-white/30 bg-transparent
                        checked:border-[3px] checked:border-white"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <PriceRangeSlider onPriceChange={handlePriceChange} initialMin={priceRange[0]} initialMax={priceRange[1]} />
          </div>
        </aside>

        {/* Product Grid (right) */}
        <section className="flex-1">
          <h1 className="text-3xl font-bold text-[#023a71] mb-6">
            Product Listing
          </h1>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                  <h3 className="font-sans font-semibold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-gray-900 font-semibold mb-4">
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
          )}
        </section>
      </main>
    </>
  );
}
