"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX, FiMenu } from "react-icons/fi";
import { useProducts } from "@/context/ProductsContext";
import { fetchSiteOffers } from "@/lib/firestore";
import "./home-v2.css";

export default function HomePage() {
  const { products, loading: productsLoading } = useProducts();
  const [offerDismissed, setOfferDismissed] = useState(false);
  const [offers, setOffers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch real offers from Firestore
  useEffect(() => {
    fetchSiteOffers().then((data) => {
      const activeOffers = data.filter((o) => o.active);
      setOffers(activeOffers);
    });

    const isDismissed = sessionStorage.getItem("ck_offer_dismissed") === "1";
    if (isDismissed) setOfferDismissed(true);
  }, []);

  const activeOffer = offers.length > 0 ? offers[0] : null;

  const dismissOffer = () => {
    setOfferDismissed(true);
    sessionStorage.setItem("ck_offer_dismissed", "1");
  };

  // Filter for best sellers
  const bestSellers = useMemo(() => {
    return products.filter((p) => p.isBestSeller);
  }, [products]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      checkScroll();
      // Add a small delay to ensure content is rendered
      const timeout = setTimeout(checkScroll, 500);
      scrollEl.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        clearTimeout(timeout);
        scrollEl.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [bestSellers, productsLoading]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="homev2">
      <main className="homev2__container" aria-label="Landing page">
        {activeOffer && !offerDismissed && (
          <section className="offerbar" aria-label="Promo">
            <div
              className="offerbar__text"
              dangerouslySetInnerHTML={{ __html: activeOffer.text }}
            />
            {(activeOffer.linkWomen || activeOffer.linkMen) && (
              <div className="offerbar__links">
                {activeOffer.linkWomen && (
                  <Link
                    className="offerbar__link"
                    href={activeOffer.linkWomen}
                    aria-label="Women"
                  >
                    Women
                  </Link>
                )}
                {activeOffer.linkMen && (
                  <Link
                    className="offerbar__link"
                    href={activeOffer.linkMen}
                    aria-label="Men"
                  >
                    Men
                  </Link>
                )}
              </div>
            )}
            <button
              className="offerbar__close"
              aria-label="Close promo"
              onClick={dismissOffer}
              type="button"
            >
              <FiX size={14} />
            </button>
          </section>
        )}

        <section className="hero" aria-label="Hero">
          <img
            className="hero__campaign"
            src="/home-v2/assets/images/hero-campaign.png"
            alt=""
          />
          <div className="hero__gradient" aria-hidden="true" />

          <header className="hero__header" aria-label="Header">
            <div className="hero__headerGlass" />
            <div className="hero__headerInner">
              <div className="hero__headerInnerContent">
                <Link href="/" aria-label="AV APPAREL">
                  <img
                    className="hero__logo"
                    src="/home-v2/assets/images/logo.png"
                    alt="AV APPAREL"
                  />
                </Link>

                <nav className="hero__nav" aria-label="Primary">
                  <Link href="/products?tag=new" className="hero__navLink">
                    New
                  </Link>
                  <Link href="/products?gender=Women" className="hero__navLink">
                    Women
                  </Link>
                  <Link href="/products?gender=Men" className="hero__navLink">
                    Men
                  </Link>
                  <Link
                    href="/products?category=Underwear"
                    className="hero__navLink"
                  >
                    Underwear
                  </Link>
                  <Link href="/products?gender=Kids" className="hero__navLink">
                    Kids
                  </Link>
                </nav>
              </div>

              <div className="hero__actions" aria-label="Actions">
                {/* <button
                  className="hero__iconBtn"
                  aria-label="Search"
                  type="button"
                >
                  <img src="/home-v2/assets/icons/icon-search.svg" alt="" />
                </button> */}
                <Link
                  className="hero__iconBtn"
                  href="/account"
                  aria-label="Account"
                >
                  <img src="/home-v2/assets/icons/icon-account.svg" alt="" />
                </Link>
                <Link
                  className="hero__iconBtn"
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <img src="/home-v2/assets/icons/icon-wishlist.svg" alt="" />
                </Link>
                <Link
                  className="hero__iconBtn"
                  href="/checkout-bag"
                  aria-label="Shopping bag"
                >
                  <img src="/home-v2/assets/icons/icon-bag.svg" alt="" />
                </Link>
                <button
                  className="hero__menuBtn"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <FiMenu size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
              <div className="hero__mobileMenu">
                <div className="hero__mobileMenuHeader">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="AV APPAREL"
                  >
                    <img
                      className="hero__logo"
                      src="/home-v2/assets/images/logo.png"
                      alt="AV APPAREL"
                    />
                  </Link>
                  <button
                    className="hero__mobileMenuClose"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <nav className="hero__mobileNav">
                  <Link
                    href="/products?tag=new"
                    className="hero__mobileNavLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    href="/products?gender=Women"
                    className="hero__mobileNavLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                    href="/products?gender=Men"
                    className="hero__mobileNavLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    href="/products?category=Underwear"
                    className="hero__mobileNavLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Underwear
                  </Link>
                  <Link
                    href="/products?gender=Kids"
                    className="hero__mobileNavLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Kids
                  </Link>
                </nav>
                <div className="hero__mobileMenuFooter">
                  <Link
                    href="/account"
                    className="hero__mobileFooterLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link
                    href="/wishlist"
                    className="hero__mobileFooterLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/checkout-bag"
                    className="hero__mobileFooterLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                </div>
              </div>
            )}
          </header>

          <img
            className={`hero__man ${isMobileMenuOpen ? "hero__man--behind" : ""}`}
            src="/home-v2/assets/images/hero-man.png"
            alt=""
            style={{ maxWidth: "none" }}
          />
        </section>

        <section className="chapters" aria-label="New Chapters">
          <div className="chapters__title">New Chapters</div>
          <div className="chapters__media" aria-label="New chapters media grid">
            <Link href="/products?gender=Men" className="chapters__link">
              <img
                src="/home-v2/assets/images/new-chapters-1.png"
                alt=""
                className="chapters__img chapters__img1"
              />
            </Link>
            <Link href="/products?gender=Men" className="chapters__link">
              <img
                src="/home-v2/assets/images/new-chapters-2.png"
                alt=""
                className="chapters__img chapters__img2"
              />
            </Link>
            <Link href="/products?gender=Men" className="chapters__link">
              <img
                src="/home-v2/assets/images/new-chapters-3.png"
                alt=""
                className="chapters__img chapters__img3"
              />
            </Link>
            <Link href="/products?gender=Men" className="chapters__link">
              <img
                src="/home-v2/assets/images/new-chapters-4.png"
                alt=""
                className="chapters__img chapters__img4"
              />
            </Link>
          </div>
        </section>

        <section className="signature" aria-label="Signature Pieces">
          <div className="signature__header">
            <h2 className="signature__title">Signature Pieces</h2>
            <div className="signature__nav">
              <button
                className="signature__navBtn"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <FiChevronLeft />
              </button>
              <button
                className="signature__navBtn"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div
            className="signature__grid"
            ref={scrollRef}
            aria-label="Signature pieces grid"
          >
            {productsLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, i) => (
                <div key={i} className="signature__card animate-pulse">
                  <div className="bg-gray-200 w-full aspect-[610/932] mb-4"></div>
                  <div className="bg-gray-200 h-6 w-3/4"></div>
                </div>
              ))
            ) : bestSellers.length > 0 ? (
              bestSellers.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="signature__card"
                >
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                  />
                  <div className="signature__caption">{product.name}</div>
                </Link>
              ))
            ) : (
              <div className="text-center w-full py-10 text-gray-500">
                No best sellers found at the moment.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
