"use client";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed to newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/account/orders" className="text-sm text-gray-400 hover:text-white">Track Order</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-gray-400 hover:text-white">Shipping</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-gray-400 hover:text-white">Returns</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products?tag=new" className="text-sm text-gray-400 hover:text-white">New Arrivals</Link></li>
              <li><Link href="/products?sale=true" className="text-sm text-gray-400 hover:text-white">Sale</Link></li>
              <li><Link href="/products?gender=Men" className="text-sm text-gray-400 hover:text-white">Men</Link></li>
              <li><Link href="/products?gender=Women" className="text-sm text-gray-400 hover:text-white">Women</Link></li>
              <li><Link href="/products?gender=Kids" className="text-sm text-gray-400 hover:text-white">Kids</Link></li>
              <li><Link href="/products?category=Underwear" className="text-sm text-gray-400 hover:text-white">Underwear</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">About Calvin Klein</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">Sustainability</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Sign up for exclusive offers, new arrivals, and more.
            </p>
            <form onSubmit={handleNewsletter} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent border-b border-gray-600 text-sm py-2 outline-none focus:border-white transition-colors text-white placeholder:text-gray-500"
              />
              <button type="submit" className="ml-3 text-sm font-medium underline underline-offset-2 hover:text-gray-300">
                Join
              </button>
            </form>
            <div className="flex items-center gap-5 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FiInstagram size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FiTwitter size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FiFacebook size={18} /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/shipping-returns" className="hover:text-gray-300">Privacy Policy</Link>
            <span>|</span>
            <Link href="/shipping-returns" className="hover:text-gray-300">Terms & Conditions</Link>
            <span>|</span>
            <span>Cookie Settings</span>
          </div>
          <p>© 2026 Calvin Klein. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
