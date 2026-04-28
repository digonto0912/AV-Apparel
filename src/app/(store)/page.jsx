"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import "./home-v2.css";

export default function HomePage() {
  const [offerDismissed, setOfferDismissed] = useState(false);
  const scaledRef = useRef(null);
  const [scale, setScale] = useState(1);

  const artboard = useMemo(() => ({ width: 1920, height: 6182 }), []);

  useEffect(() => {
    if (!scaledRef.current) return;

    const el = scaledRef.current;
    const ro = new ResizeObserver(() => {
      const nextWidth = Math.min(el.parentElement?.clientWidth || el.clientWidth, artboard.width);
      const nextScale = nextWidth / artboard.width;
      setScale(nextScale);
    });

    ro.observe(el.parentElement ?? el);
    return () => ro.disconnect();
  }, [artboard.height, artboard.width]);

  return (
    <div className="homev2">
      <div
        ref={scaledRef}
        className="homev2__scaled"
        style={{
          width: `${Math.round(artboard.width * scale)}px`,
          height: `${Math.round(artboard.height * scale)}px`,
          ["--homev2-scale"]: scale,
        }}
      >
        <main className="homev2__artboard" aria-label="Landing page">
          {!offerDismissed && (
            <section className="offerbar" aria-label="Promo">
              <div className="offerbar__text">
                Friends + Family__40% off Sitewide* | 30% off Underwear*
              </div>
              <Link className="offerbar__link offerbar__women" href="/products?gender=Women" aria-label="Women">
                Women
              </Link>
              <Link className="offerbar__link offerbar__men" href="/products?gender=Men" aria-label="Men">
                Men
              </Link>
              <button
                className="offerbar__close"
                aria-label="Close promo"
                onClick={() => setOfferDismissed(true)}
                type="button"
              >
                <img src="/home-v2/assets/icons/icon-close.svg" alt="" />
              </button>
            </section>
          )}

          <section className="hero" aria-label="Hero">
            <img className="hero__campaign" src="/home-v2/assets/images/hero-campaign.png" alt="" />
            <div className="hero__gradient" aria-hidden="true" />

            <header className="hero__header" aria-label="Header">
              <div className="hero__headerGlass" />
              <div className="hero__headerInner">
                <Link href="/" aria-label="AV APPAREL">
                  <img className="hero__logo" src="/home-v2/assets/images/logo.png" alt="AV APPAREL" />
                </Link>

                <nav className="hero__nav" aria-label="Primary">
                  <Link href="/products?tag=new" className="hero__navLink" style={{ left: 12 }}>
                    New
                  </Link>
                  <Link href="/products?gender=Women" className="hero__navLink" style={{ left: 66.85 }}>
                    Women
                  </Link>
                  <Link href="/products?gender=Men" className="hero__navLink" style={{ left: 140.92 }}>
                    Men
                  </Link>
                  <Link href="/products?category=Underwear" className="hero__navLink" style={{ left: 195.18 }}>
                    Underwear
                  </Link>
                  <Link href="/products?gender=Kids" className="hero__navLink" style={{ left: 296.03 }}>
                    Kids
                  </Link>
                </nav>

                <div className="hero__actions" aria-label="Actions">
                  <button className="hero__iconBtn" aria-label="Search" type="button">
                    <img src="/home-v2/assets/icons/icon-search.svg" alt="" />
                  </button>
                  <Link className="hero__iconBtn" href="/account" aria-label="Account">
                    <img src="/home-v2/assets/icons/icon-account.svg" alt="" />
                  </Link>
                  <Link className="hero__iconBtn" href="/wishlist" aria-label="Wishlist">
                    <img src="/home-v2/assets/icons/icon-wishlist.svg" alt="" />
                  </Link>
                  <Link className="hero__iconBtn" href="/checkout-bag" aria-label="Shopping bag">
                    <img src="/home-v2/assets/icons/icon-bag.svg" alt="" />
                  </Link>
                </div>
              </div>
            </header>

            <img className="hero__man" src="/home-v2/assets/images/hero-man.png" alt="" />
          </section>

          <section className="signature" aria-label="Signature Pieces">
            <div className="signature__title">Signature Pieces</div>
            <div className="signature__circle" aria-hidden="true" />
            <img className="signature__arrow" src="/home-v2/assets/icons/signature-arrow.svg" alt="" aria-hidden="true" />

            <div className="signature__grid" aria-label="Signature pieces grid">
              <div className="signature__card signature__card1">
                <img src="/home-v2/assets/images/signature-piece-1-10970c.png" alt="" />
                <div className="signature__caption">The Estate Heritage Ensemble</div>
              </div>
              <div className="signature__card signature__card2">
                <img src="/home-v2/assets/images/signature-piece-2.png" alt="" />
                <div className="signature__caption">The Monolithic Tonal Suite</div>
              </div>
              <div className="signature__card signature__card3">
                <img src="/home-v2/assets/images/signature-piece-3-575af7.png" alt="" />
                <div className="signature__caption">The Grand Tour Leisure</div>
              </div>
            </div>
          </section>

          <section className="chapters" aria-label="New Chapters">
            <div className="chapters__title">New Chapters</div>
            <div className="chapters__media" aria-label="New chapters media grid">
              <img src="/home-v2/assets/images/new-chapters-1.png" alt="" className="chapters__img chapters__img1" />
              <img src="/home-v2/assets/images/new-chapters-2.png" alt="" className="chapters__img chapters__img2" />
              <img src="/home-v2/assets/images/new-chapters-3.png" alt="" className="chapters__img chapters__img3" />
              <img src="/home-v2/assets/images/new-chapters-4.png" alt="" className="chapters__img chapters__img4" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
