"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cartSlice';

interface ProductCardProps {
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  id: string;
}


export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  category,
  name,
  price,
  rating,
  id,
}) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // منع الانتقال إلى صفحة التفاصيل
    dispatch(addItemToCart({
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    }));
    alert(`${name} added to cart!`); // رسالة تأكيد مؤقتة
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative cursor-pointer" onClick={() => router.push(`/productDetails/${id}`)}>
        <Image src={imageUrl} alt={name} width={400} height={300} className="w-full" />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-bl-lg">
          NEW
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-1">{category}</h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{name}</h2>
        <div className="flex items-center justify-between ">
          <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
          <div className="flex items-center">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 text-yellow-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-gray-600 ml-1">{rating}</span>
          </div>
          <button
            className="bg-purple-800 text-white font-semibold p-2 rounded-md cursor-pointer hover:bg-purple-900 transition"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
