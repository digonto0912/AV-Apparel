"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/context/ProductsContext";
import { useAuth } from "@/context/AuthContext";
import { fetchUserRewards } from "@/lib/firestore";
import ProductCard from "@/components/shared/ProductCard";

const CAMPAIGN_SECTIONS = [
  {
    title: "Spring Getaway Essentials",
    description: "Polished shirts and lightweight fabrics for long trips and warm days.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women" },
      { label: "Shop Men", href: "/products?gender=Men" },
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "The 90s Edit",
    description: "Iconic then. Iconic now. Minimalism that defined an era, styled for today.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women" },
      { label: "Shop Men", href: "/products?gender=Men" },
    ],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/70 via-black/40 to-transparent",
  },
  {
    title: "Spring Jackets",
    description: "Sporty silhouettes with modern detail. Lightweight jackets designed for life outdoors.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women&category=Outerwear" },
      { label: "Shop Men", href: "/products?gender=Men&category=Outerwear" },
    ],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/60 via-black/30 to-transparent",
  },
  {
    title: "New 90s Washes",
    description: "Signature denim fits in new shades for spring. Easy living in the classic straight leg.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women&subcategory=Jeans" },
      { label: "Shop Men", href: "/products?gender=Men&subcategory=Jeans" },
    ],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/70 via-black/40 to-transparent",
  },
];

const DENIM_IMAGES = [
  { name: "Baggy", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=540&fit=crop&q=80" },
  { name: "90s Straight", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=540&fit=crop&q=80" },
  { name: "Tapered", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=540&fit=crop&q=80" },
  { name: "Slim", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1475178626620-a4d074967571?w=400&h=540&fit=crop&q=80" },
  { name: "Straight", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1565084888279-aca5ecc59969?w=400&h=540&fit=crop&q=80" },
  { name: "Skinny", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1598554793905-075461621b1b?w=400&h=540&fit=crop&q=80" },
];

const CELEBRITY_SECTIONS = [
  { name: "Dakota Johnson", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop&q=80", gender: "Women" },
  { name: "Raphinha", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80", gender: "Men" },
  { name: "Jung Kook", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80", gender: "Men" },
];

const CATEGORY_LINKS = [
  { title: "New Arrivals", links: [{ label: "Women", href: "/products?gender=Women&tag=new" }, { label: "Men", href: "/products?gender=Men&tag=new" }] },
  { title: "Underwear", links: [{ label: "Women", href: "/products?gender=Women&category=Underwear" }, { label: "Men", href: "/products?gender=Men&category=Underwear" }] },
  { title: "Tops", links: [{ label: "Women", href: "/products?gender=Women&category=Tops" }, { label: "Men", href: "/products?gender=Men&category=Tops" }] },
  { title: "Bottoms", links: [{ label: "Women", href: "/products?gender=Women&category=Bottoms" }, { label: "Men", href: "/products?gender=Men&category=Bottoms" }] },
];

export default function HomePage() {
  const { toggleItem, isInWishlist } = useWishlist();
  const { products, loading } = useProducts();
  const { user } = useAuth();
  const [rewards, setRewards] = useState(null);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const denimRef = useRef(null);

  const scrollDenim = (dir) => {
    if (!denimRef.current) return;
    const amount = denimRef.current.offsetWidth * 0.6;
    denimRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      fetchUserRewards(user.uid).then(setRewards).catch(() => {});
    }
  }, [user]);

  return (
    <div>
      {/* Hero */}
      <section className="relative text-white min-h-[60vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1800&h=1100&fit=crop&q=80"
          alt="AV APPAREL Campaign"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-gray-300 mb-3">SPRING / SUMMER 2026</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[0.04em] mb-4 md:mb-6 drop-shadow-xl" style={{fontFamily:"'Montserrat',sans-serif"}}>
            LIVE IN<br />AV APPAREL
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-6 tracking-wide">The new essentials. Nothing more. Nothing less.</p>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Link href="/products?gender=Women" className="border border-white px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-white/10">
              Shop Women
            </Link>
            <Link href="/products?gender=Men" className="border border-white px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-white/10">
              Shop Men
            </Link>
          </div>
        </div>
      </section>

      {/* Denim Carousel */}
      <section className="py-10 overflow-hidden">
        <div className="flex items-center justify-between px-4 md:px-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-medium">Shop by Denim Fit</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollDenim("left")}
              className="w-9 h-9 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollDenim("right")}
              className="w-9 h-9 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              aria-label="Scroll right"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
        <div ref={denimRef} className="flex gap-4 px-4 md:px-6 overflow-x-auto no-scrollbar scroll-smooth">
          {DENIM_IMAGES.map((style) => (
            <Link
              key={style.name}
              href={style.href}
              className="flex-shrink-0 w-44 md:w-56 aspect-[3/4] relative overflow-hidden rounded-sm group"
            >
              <img src={style.image} alt={style.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-sm md:text-base font-medium">{style.name}</span>
            </Link>
          ))}
          <Link
            href="/products?subcategory=Jeans"
            className="flex-shrink-0 w-44 md:w-56 aspect-[3/4] bg-black text-white flex items-center justify-center text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors rounded-sm"
          >
            Shop all Denim →
          </Link>
        </div>
      </section>

      {/* Campaign Sections */}
      {CAMPAIGN_SECTIONS.map((section, i) => (
        <section
          key={section.title}
          className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
        >
          <img
            src={section.image}
            alt={section.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${section.overlay}`} />
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[0.03em] mb-4 drop-shadow-lg" style={{fontFamily:"'Montserrat',sans-serif"}}>{section.title}</h2>
            <p className="text-sm md:text-base max-w-lg mx-auto mb-8 text-gray-100 drop-shadow">
              {section.description}
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {section.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-5 md:px-6 py-2.5 text-xs md:text-sm font-medium tracking-wide border border-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Best Sellers */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium">Best Sellers</h2>
            <Link href="/products?sort=best-selling" className="text-sm underline underline-offset-2 hover:text-gray-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={toggleItem}
                isWishlisted={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="relative py-20 px-4 md:px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&h=700&fit=crop&q=80"
          alt="Rewards"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-[1440px] mx-auto text-center relative z-10 text-white">
          {user ? (
            <>
              <p className="text-xs tracking-[0.2em] text-gray-400 mb-2">CALVIN REWARDS — {rewards?.tier || "Member"}</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>
                You have <span className="text-white">{rewards?.points || 0}</span> points
              </h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-2">
                That's <span className="font-medium text-white">${((rewards?.points || 0) * 0.01).toFixed(2)}</span> in rewards ready to redeem.
              </p>
              <p className="text-xs text-gray-400 mb-8">Earn 1 point for every $1 you spend. Shop to unlock higher tiers.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/account/rewards" className="inline-block border border-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors">
                  View My Rewards
                </Link>
                <Link href="/products" className="inline-block border border-white/40 px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors text-gray-300">
                  Shop & Earn
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>My AV Rewards</h2>
              <p className="text-lg font-light mb-2">Earn. Redeem. Enjoy.</p>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-8">
                A new way to experience AV APPAREL. Unlock exclusive benefits designed for you, every time you shop.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/auth/register" className="inline-block border border-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors">
                  Join Now — It's Free
                </Link>
                <Link href="/auth/login" className="inline-block border border-white/40 px-8 py-3 text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors text-gray-300">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium">New Arrivals</h2>
            <Link href="/products?tag=new" className="text-sm underline underline-offset-2 hover:text-gray-600">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={toggleItem}
                isWishlisted={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-12 px-4 md:px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORY_LINKS.map((cat) => (
            <div key={cat.title} className="text-center">
              <h3 className="text-lg font-medium mb-3">{cat.title}</h3>
              <div className="flex items-center justify-center gap-3">
                {cat.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-sm text-gray-600 underline underline-offset-2 hover:text-black">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live in CK Campaign */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] text-center mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>Live in AV APPAREL</h2>
          <p className="text-sm text-gray-600 text-center mb-10">Live like an icon. Shop our latest campaigns.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CELEBRITY_SECTIONS.map((celeb) => (
              <Link
                key={celeb.name}
                href={`/products?gender=${celeb.gender}`}
                className="aspect-[3/4] relative group overflow-hidden rounded-sm"
              >
                <img src={celeb.image} alt={celeb.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-6 left-6 text-white text-lg font-medium drop-shadow-lg">{celeb.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
