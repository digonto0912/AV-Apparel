"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { fetchSiteOffers } from "@/lib/firestore";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const NAV_LINKS = [
  { label: "New", href: "/products?tag=new" },
  {
    label: "Women",
    href: "/products?gender=Women",
    children: [
      { label: "All Women's", href: "/products?gender=Women" },
      { label: "Tops", href: "/products?gender=Women&category=Tops" },
      { label: "Bottoms", href: "/products?gender=Women&category=Bottoms" },
      { label: "Outerwear", href: "/products?gender=Women&category=Outerwear" },
      { label: "Underwear", href: "/products?gender=Women&category=Underwear" },
      { label: "Dresses", href: "/products?gender=Women&subcategory=Dresses" },
    ],
  },
  {
    label: "Men",
    href: "/products?gender=Men",
    children: [
      { label: "All Men's", href: "/products?gender=Men" },
      { label: "Tops", href: "/products?gender=Men&category=Tops" },
      { label: "Bottoms", href: "/products?gender=Men&category=Bottoms" },
      { label: "Outerwear", href: "/products?gender=Men&category=Outerwear" },
      { label: "Underwear", href: "/products?gender=Men&category=Underwear" },
      { label: "Denim", href: "/products?gender=Men&subcategory=Jeans" },
    ],
  },
  { label: "Underwear", href: "/products?category=Underwear" },
  { label: "Kids", href: "/products?gender=Kids" },
  { label: "Sale", href: "/products?sale=true" },
];

export default function Header() {
  const { itemCount, lastAddedItem, showMiniCart, closeMiniCart, subtotal } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, signOut, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accOpen, setAccOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerDismissed, setOfferDismissed] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);
  const accRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (accRef.current && !accRef.current.contains(e.target)) setAccOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("ck_offer_dismissed");
    if (dismissed) { setOfferDismissed(true); return; }
    fetchSiteOffers()
      .then((data) => setOffers(data.filter((o) => o.active)))
      .catch(() => {});
  }, []);

  const dismissOffer = () => {
    setOfferDismissed(true);
    sessionStorage.setItem("ck_offer_dismissed", "1");
  };

  const activeOffer = offers.length > 0 ? offers[0] : null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      {activeOffer && !offerDismissed && (
        <div className="bg-black text-white text-center py-2.5 text-[10px] sm:text-xs tracking-wide relative z-50 px-8">
          <span dangerouslySetInnerHTML={{ __html: activeOffer.text }} />
          {activeOffer.linkWomen || activeOffer.linkMen ? (
            <span className="hidden nav:inline-flex items-center gap-4 absolute right-12 top-1/2 -translate-y-1/2">
              {activeOffer.linkWomen && (
                <Link href={activeOffer.linkWomen} className="underline text-xs">Women</Link>
              )}
              {activeOffer.linkMen && (
                <Link href={activeOffer.linkMen} className="underline text-xs">Men</Link>
              )}
            </span>
          ) : null}
          <button
            onClick={dismissOffer}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Close offer"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto flex items-center h-[60px] nav:h-[72px] px-3 nav:px-6">
          {/* Mobile menu toggle */}
          <button className="nav:hidden mr-2 flex-shrink-0" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-4 nav:mr-8 min-w-0">
            <span className="text-base sm:text-lg nav:text-2xl font-bold tracking-[0.15em] nav:tracking-[0.2em] text-black whitespace-nowrap">AV APPAREL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden nav:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-[13px] font-medium tracking-wide hover:underline underline-offset-4 ${
                    link.label === "Sale" ? "text-red-600" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 rounded-sm min-w-[200px] py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 nav:gap-4 ml-auto flex-shrink-0">
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" className="p-1.5 sm:p-1">
              <FiSearch size={18} className="nav:w-5 nav:h-5" />
            </button>

            {/* Account */}
            <div className="relative" ref={accRef}>
              <button onClick={() => setAccOpen(!accOpen)} aria-label="Account" className="p-1.5 sm:p-1">
                <FiUser size={18} className="nav:w-5 nav:h-5" />
              </button>
              {accOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-100 rounded-sm min-w-[200px] py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm font-medium border-b border-gray-100">
                        Hi, {user.displayName || "User"}
                      </div>
                      <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setAccOpen(false)}>My Account</Link>
                      <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setAccOpen(false)}>Order History</Link>
                      <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setAccOpen(false)}>Wishlist</Link>
                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50" onClick={() => setAccOpen(false)}>Admin Panel</Link>
                      )}
                      <button onClick={() => { signOut(); setAccOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-t border-gray-100">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setAccOpen(false)}>Sign In</Link>
                      <Link href="/auth/register" className="block px-4 py-2 text-sm hover:bg-gray-50" onClick={() => setAccOpen(false)}>Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-1.5 sm:p-1 relative" aria-label="Wishlist">
              <FiHeart size={18} className="nav:w-5 nav:h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <div className="relative">
              <Link href="/checkout-bag" className="p-1.5 sm:p-1 relative block" aria-label="Shopping Bag">
                <FiShoppingBag size={18} className="nav:w-5 nav:h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mini Cart Dropdown */}
              {showMiniCart && lastAddedItem && (
                <div className="absolute right-0 top-full mt-2 w-[300px] sm:w-[340px] bg-white shadow-lg border border-gray-200 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="text-xs font-medium uppercase tracking-wider">Added to bag</span>
                    <button onClick={closeMiniCart} className="text-gray-400 hover:text-black">
                      <FiX size={14} />
                    </button>
                  </div>

                  <div className="flex gap-3 p-4">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                      {lastAddedItem.image ? (
                        <img src={lastAddedItem.image} alt={lastAddedItem.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      ) : null}
                      <div className={`w-full h-full items-center justify-center bg-gray-100 text-gray-400 text-[10px] font-bold ${lastAddedItem.image ? 'hidden' : 'flex'}`}>AV</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{lastAddedItem.name}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{lastAddedItem.size} / {lastAddedItem.color}</p>
                      <p className="text-xs font-medium mt-1.5">
                        ${(lastAddedItem.salePrice || lastAddedItem.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 space-y-2">
                    <Link
                      href="/checkout-bag"
                      onClick={closeMiniCart}
                      className="w-full h-10 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors flex items-center justify-center"
                    >
                      View Bag ({itemCount})
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={closeMiniCart}
                      className="w-full h-9 border border-gray-300 text-black text-xs font-medium tracking-wider uppercase hover:border-black transition-colors flex items-center justify-center"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-3">
              <FiSearch className="text-gray-400" size={20} />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 outline-none text-sm py-2 border-b border-gray-300 focus:border-black transition-colors"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-black">
                <FiX size={20} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 nav:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold tracking-[0.15em]">AV APPAREL</span>
              <button onClick={() => setMobileOpen(false)}><FiX size={22} /></button>
            </div>
            <nav className="py-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block px-5 py-3 text-sm font-medium border-b border-gray-50 ${
                      link.label === "Sale" ? "text-red-600" : ""
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-8 bg-gray-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2 text-sm text-gray-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="border-t p-4 space-y-2">
              {user ? (
                <>
                  <Link href="/account" className="block text-sm py-1" onClick={() => setMobileOpen(false)}>My Account</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-sm text-gray-500">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block text-sm py-1" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/auth/register" className="block text-sm py-1" onClick={() => setMobileOpen(false)}>Create Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
