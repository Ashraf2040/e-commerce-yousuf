'use client';

import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

const categories = ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Sports'];
const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E', 'Brand F', 'Brand G', 'Brand H', 'Brand I', 'Brand J'];

export const Sidebar = () => {
  const [priceRange, setPriceRange] = useState(50);

  return (
    <div className="w-full md:w-64 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2" /> Filters
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">Clear All</button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3 flex justify-between items-center cursor-pointer">
          Categories <ChevronDown className="w-4 h-4" />
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              <span className="ml-2">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3 flex justify-between items-center cursor-pointer">
          Brands <ChevronDown className="w-4 h-4" />
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              <span className="ml-2">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
