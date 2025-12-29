'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const ShoppingCart = () => {
  const [items] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Classic White Tee',
      price: 25.0,
      quantity: 2,
      imageUrl: '/images/white-tee.jpg',
    },
    {
      id: 2,
      name: 'Blue Denim Jeans',
      price: 75.0,
      quantity: 1,
      imageUrl: '/images/denim-jeans.jpg',
    },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-600 mt-2">
          <p>Tax (10%)</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-800 mt-4">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>

      <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};
