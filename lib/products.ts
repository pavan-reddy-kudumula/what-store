export const categories = ["All", "Electronics", "Footwear", "Accessories", "Clothing"];

export interface FilterParams {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
}

export const products = [
    {
      id: 1,
      name: "Running Shoes",
      price: 99,
      category: "Footwear",
      description: "Lightweight and breathable shoes designed for long-distance comfort and support.",
      images: ["/running-shoes.avif"],
      rating: 4.5
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 129,
      category: "Electronics",
      description: "Noise-canceling over-ear headphones with up to 40 hours of battery life.",
      images: ["/wireless-headphones.webp"],
      rating: 4.8
    },
    {
      id: 3,
      name: "Backpack",
      price: 129,
      category: "Accessories",
      description: "Durable, water-resistant backpack with a dedicated 15-inch laptop sleeve.",
      images: ["/backpack.jpg"],
      rating: 4.2
    },
    {
      id: 4,
      name: "Smartwatch",
      price: 249,
      category: "Electronics",
      description: "Track your fitness, heart rate, and notifications with this sleek wearable.",
      images: ["/smartwatch.jpg"],
      rating: 4.6
    },
    {
      id: 5,
      name: "Sunglasses",
      price: 149,
      category: "Accessories",
      description: "Classic polarized sunglasses providing 100% UV protection and style.",
      images: ["/sunglasses.jpg"],
      rating: 4.4
    },
    {
      id: 6,
      name: "Digital Camera",
      price: 499,
      category: "Electronics",
      description: "Compact mirrorless camera with 4K video capabilities and autofocus.",
      images: ["/digital-camera.avif"],
      rating: 4.7
    },
    {
      id: 7,
      name: "T-shirt",
      price: 29,
      category: "Clothing",
      description: "Premium organic cotton crewneck t-shirt with a relaxed fit.",
      images: ["/t-shirt.jpg"],
      rating: 4.1
    },
    {
      id: 8,
      name: "Smartphone",
      price: 999,
      category: "Electronics",
      description: "Latest generation smartphone featuring an advanced triple-camera system.",
      images: ["/iphone-front.png", "/iphone-back.webp"],
      rating: 4.9
    },
  ];

export function filterProducts(filters: FilterParams) {
  return products.filter((product) => {
    // Filter by category
    if (filters.category && filters.category !== "All" && product.category !== filters.category) {
      return false;
    }

    // Filter by price range
    if (filters.priceMin !== undefined && product.price < filters.priceMin) {
      return false;
    }

    if (filters.priceMax !== undefined && product.price > filters.priceMax) {
      return false;
    }

    // Filter by search term
    if (filters.search && filters.search.trim() !== "") {
      const searchTerm = filters.search.toLowerCase().trim();
      const matchesName = product.name.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description.toLowerCase().includes(searchTerm);

      if (!matchesName && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
}