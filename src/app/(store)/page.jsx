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
    label: "THE GETAWAY EDIT",
    title: "Somewhere\nWarm",
    description: "Linen. Cotton. Nothing else. Pack light, live slow.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women" },
      { label: "Shop Men", href: "/products?gender=Men" },
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/60 via-black/30 to-transparent",
  },
  {
    label: "ICONS REBORN",
    title: "The 90s\nEdit",
    description: "Iconic then. Iconic now. The era that defined minimalism — reimagined.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women" },
      { label: "Shop Men", href: "/products?gender=Men" },
    ],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/70 via-black/40 to-transparent",
  },
  {
    label: "LAYER UP",
    title: "Between\nSeasons",
    description: "Not too heavy. Not too light. Just right for right now.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women&category=Outerwear" },
      { label: "Shop Men", href: "/products?gender=Men&category=Outerwear" },
    ],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/60 via-black/30 to-transparent",
  },
  {
    label: "RAW DENIM",
    title: "New\nWashes",
    description: "Worn-in from day one. Faded to perfection.",
    links: [
      { label: "Shop Women", href: "/products?gender=Women&subcategory=Jeans" },
      { label: "Shop Men", href: "/products?gender=Men&subcategory=Jeans" },
    ],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400&h=800&fit=crop&q=80",
    overlay: "from-black/70 via-black/40 to-transparent",
  },
];

const DENIM_FITS = [
  { name: "Baggy", subtitle: "Relaxed. Effortless.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=540&fit=crop&q=80" },
  { name: "90s Straight", subtitle: "The one that started it all.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=540&fit=crop&q=80" },
  { name: "Tapered", subtitle: "Sharp from hip to hem.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=540&fit=crop&q=80" },
  { name: "Slim", subtitle: "Close. Clean. Classic.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1475178626620-a4d074967571?w=400&h=540&fit=crop&q=80" },
  { name: "Straight", subtitle: "Timeless for a reason.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1565084888279-aca5ecc59969?w=400&h=540&fit=crop&q=80" },
  { name: "Skinny", subtitle: "Body-conscious. Bold.", href: "/products?subcategory=Jeans", image: "https://images.unsplash.com/photo-1598554793905-075461621b1b?w=400&h=540&fit=crop&q=80" },
];

const CAMPAIGN_FACES = [
  { name: "Her World", tagline: "Bold. Refined. Unapologetic.", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop&q=80", gender: "Women" },
  { name: "His Edge", tagline: "Quiet confidence. Loud presence.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80", gender: "Men" },
  { name: "The Icon", tagline: "No rules. Just style.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80", gender: "Men" },
];

const CATEGORY_LINKS = [
  { title: "Just In", description: "Be first.", links: [{ label: "Women", href: "/products?gender=Women&tag=new" }, { label: "Men", href: "/products?gender=Men&tag=new" }] },
  { title: "Underwear", description: "The essentials.", links: [{ label: "Women", href: "/products?gender=Women&category=Underwear" }, { label: "Men", href: "/products?gender=Men&category=Underwear" }] },
  { title: "Tops", description: "From AM to PM.", links: [{ label: "Women", href: "/products?gender=Women&category=Tops" }, { label: "Men", href: "/products?gender=Men&category=Tops" }] },
  { title: "Bottoms", description: "Every fit. Every day.", links: [{ label: "Women", href: "/products?gender=Women&category=Bottoms" }, { label: "Men", href: "/products?gender=Men&category=Bottoms" }] },
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
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-gray-300/80 mb-4 uppercase">Spring / Summer 2026</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[0.04em] mb-5 md:mb-7 drop-shadow-xl" style={{fontFamily:"'Montserrat',sans-serif"}}>
            Between You<br />and What You Wear
          </h1>
          <p className="text-sm md:text-base text-gray-200/90 mb-8 tracking-wide max-w-md mx-auto leading-relaxed">Stripped back. Pared down. Designed to move with you.</p>
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
          <div>
            <h2 className="text-2xl md:text-3xl font-medium">Find Your Fit</h2>
            <p className="text-xs text-gray-500 tracking-wide mt-1">One denim. Six ways to wear it.</p>
          </div>
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
          {DENIM_FITS.map((style) => (
            <Link
              key={style.name}
              href={style.href}
              className="flex-shrink-0 w-44 md:w-56 aspect-[3/4] relative overflow-hidden rounded-sm group"
            >
              <img src={style.image} alt={style.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-sm md:text-base font-medium block">{style.name}</span>
                <span className="text-white/60 text-[10px] tracking-wide">{style.subtitle}</span>
              </div>
            </Link>
          ))}
          <Link
            href="/products?subcategory=Jeans"
            className="flex-shrink-0 w-44 md:w-56 aspect-[3/4] bg-black text-white flex flex-col items-center justify-center text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors rounded-sm gap-2"
          >
            <span className="text-xs tracking-[0.2em] text-gray-400">EXPLORE</span>
            All Denim →
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
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-gray-300/70 mb-4">{section.label}</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[0.03em] mb-4 drop-shadow-lg whitespace-pre-line leading-tight" style={{fontFamily:"'Montserrat',sans-serif"}}>{section.title}</h2>
            <p className="text-sm md:text-base max-w-md mx-auto mb-8 text-gray-200/80 drop-shadow leading-relaxed">
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
            <div>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-1">MOST WANTED</p>
              <h2 className="text-2xl md:text-3xl font-medium">Best Sellers</h2>
            </div>
            <Link href="/products?sort=best-selling" className="text-xs tracking-widest uppercase text-gray-500 hover:text-black transition-colors">
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
              <p className="text-[10px] tracking-[0.3em] text-gray-400/80 mb-3">AV REWARDS — {rewards?.tier?.toUpperCase() || "MEMBER"}</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] mb-4" style={{fontFamily:"'Montserrat',sans-serif"}}>
                {rewards?.points || 0} Points
              </h2>
              <p className="text-sm text-gray-300/80 max-w-sm mx-auto mb-1 leading-relaxed">
                ${((rewards?.points || 0) * 0.01).toFixed(2)} in rewards. Yours to use.
              </p>
              <p className="text-[11px] text-gray-500 mb-8">Every dollar spent is a point earned.</p>
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
              <p className="text-[10px] tracking-[0.3em] text-gray-400/80 mb-3">EXCLUSIVE ACCESS</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] mb-4" style={{fontFamily:"'Montserrat',sans-serif"}}>AV Rewards</h2>
              <p className="text-sm text-gray-300/80 max-w-sm mx-auto mb-8 leading-relaxed">
                Shop. Earn points. Unlock early access, birthday perks, and member-only drops.
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
            <div>
              <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-1">JUST DROPPED</p>
              <h2 className="text-2xl md:text-3xl font-medium">New Arrivals</h2>
            </div>
            <Link href="/products?tag=new" className="text-xs tracking-widest uppercase text-gray-500 hover:text-black transition-colors">
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
      <section className="py-14 px-4 md:px-6 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {CATEGORY_LINKS.map((cat) => (
            <div key={cat.title} className="text-center">
              <h3 className="text-base font-medium tracking-wide mb-1">{cat.title}</h3>
              <p className="text-[11px] text-gray-400 mb-3">{cat.description}</p>
              <div className="flex items-center justify-center gap-4">
                {cat.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-xs text-gray-500 tracking-widest uppercase hover:text-black transition-colors">
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
          <p className="text-[10px] tracking-[0.3em] text-gray-400 text-center mb-3">THE CAMPAIGN</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[0.03em] text-center mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>Live in AV</h2>
          <p className="text-sm text-gray-500 text-center mb-10">Real people. Real style. Nothing posed.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CAMPAIGN_FACES.map((face) => (
              <Link
                key={face.name}
                href={`/products?gender=${face.gender}`}
                className="aspect-[3/4] relative group overflow-hidden rounded-sm"
              >
                <img src={face.image} alt={face.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-white text-lg font-medium drop-shadow-lg block">{face.name}</span>
                  <span className="text-white/60 text-xs tracking-wide">{face.tagline}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
