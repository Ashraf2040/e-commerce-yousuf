"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(event.target.value, 10);
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
            <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Table Layout on Larger Screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                      <th className="text-center py-4 px-6 font-medium text-gray-700">Price</th>
                      <th className="text-center py-4 px-6 font-medium text-gray-700">Quantity</th>
                      <th className="text-center py-4 px-6 font-medium text-gray-700">Total</th>
                      <th className="py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-6 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-6 px-6 text-gray-700">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="text-center py-6 px-6">
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="text-center py-6 px-6 font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="text-center py-6 px-6">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 transition p-2"
                            title="Remove Item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card Fallback - Hidden on LG+ */}
                <div className="lg:hidden divide-y">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-24 h-24">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-700">Quantity:</span>
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            className="border border-gray-300 rounded-lg px-4 py-2"
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800 font-medium transition"
                >
                  Clear Cart
                </button>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cart.totalQuantity} items)</span>
                    <span>${cart.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  {/* Optional: Add tax line if needed */}
                  {/* <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div> */}
                </div>
                <div className="flex justify-between text-2xl font-bold mt-6">
                  <span>Total</span>
                  <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-8 w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition duration-200"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}