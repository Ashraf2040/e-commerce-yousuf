"use client";

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CheckoutPage as CheckoutForm } from '../components/CheckoutPage';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('Please sign in to proceed to checkout.');
      router.push('/');
    }
    if (cart.items.length === 0) {
      alert('Your cart is empty. Cannot proceed to checkout.');
      router.push('/cart');
    }
  }, [status, cart.items.length, router]);

  if (status === 'loading' || status === 'unauthenticated' || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <CheckoutForm />
              </div>
            </div>
          </div>

          {/* Order Summary - Right Side (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.totalQuantity} items)</span>
                  <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {/* Optional: Add tax if needed */}
                {/* <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div> */}
              </div>

              <div className="mt-6 flex justify-between text-2xl font-bold text-gray-900 border-t pt-6">
                <span>Total</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>

              <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure checkout powered by industry-leading encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}