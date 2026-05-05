import { Suspense } from 'react';
import ProductSection from '../components/ProductSection';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ProductSection />
      </Suspense>

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