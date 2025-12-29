'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            E-Shop-Practice
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon with Counter */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {session ? (
              <button
                onClick={() => signOut()}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-1"
                title="Sign Out"
              >
                <LogOut className="w-6 h-6 text-gray-600" />
                <span className="hidden sm:inline text-sm text-gray-600">{session.user?.name || 'Sign Out'}</span>
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-1"
                title="Sign In"
              >
                <LogIn className="w-6 h-6 text-gray-600" />
                <span className="hidden sm:inline text-sm text-gray-600">Sign In</span>
              </button>
            )}

            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
