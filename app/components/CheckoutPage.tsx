'use client';

import { useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { clearCart } from '../store/cartSlice';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const CheckoutPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState({
    email: session?.user?.email || '',
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.items.length === 0) return;

    setIsProcessing(true);

    const orderData = {
      cartItems: cart.items,
      totalAmount: cart.totalAmount,
      // يمكن إضافة بيانات الشحن هنا لاحقًا
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Order Placed Successfully! Order ID: ${result.orderId}`);
        dispatch(clearCart()); // مسح سلة التسوق بعد نجاح الطلب
        router.push('/');
      } else {
        const error = await response.json();
        alert(`Failed to place order: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An unexpected error occurred during checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
              required
            />
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                name="zip"
                id="zip"
                value={formData.zip}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800">Payment Details (Simulated)</h2>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                required
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isProcessing || cart.items.length === 0}
            className="w-full bg-purple-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-900 transition-colors disabled:bg-gray-400"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};
