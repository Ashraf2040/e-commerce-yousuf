import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">E-Shop</h3>
            <p className="text-gray-400 text-sm">
              The best place to find all your needs. Quality products, fast shipping, and excellent
              customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/about" className="text-gray-400 hover:text-white block text-sm">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white block text-sm">
                Contact
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-white block text-sm">
                FAQ
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white block text-sm">
                Shipping
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <nav className="space-y-2">
              <Link href="/terms" className="text-gray-400 hover:text-white block text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white block text-sm">
                Privacy Policy
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-white block text-sm">
                Return Policy
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
