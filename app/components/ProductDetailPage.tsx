'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Product {
  name: string;
  price: number;
  description: string;
  images: string[];
}

export const ProductDetailPage = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
                  selectedImage === image ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
          <div className="flex items-center mb-8">
            <label htmlFor="quantity" className="mr-4 font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={1}
              defaultValue={1}
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
