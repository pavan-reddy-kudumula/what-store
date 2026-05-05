'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { CartControls } from '@/components/CartControls';

export default function CartPage() {
  const { items, removeItem, deleteItem, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const tax = parseFloat((subtotal * 0.1).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-600 text-lg mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-slate-200 last:border-b-0 p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="shrink-0 w-24 h-24 bg-slate-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="grow">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Price: ${item.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="mb-4">
                        <CartControls
                          product={item}
                          variant="compact"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => deleteItem(item)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Tax (10%):</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total:</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
