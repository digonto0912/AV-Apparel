export default function PDPInfo() {
  return (
    <div className="pdp-grid">
      {/* LEFT */}
      <div className="pdp-left">
        <p className="personalise-lbl">Personalise with initials</p>
        <h1 className="product-title">Gucci Giglio large tote bag</h1>
        <p className="product-price">A$3,400</p>

        <div className="var-row">
          <span className="var-label">Variation</span>
          <span>beige and brown GG canvas</span>
        </div>

        <div className="swatches">
          <button className="swatch" title="black leather"><div className="sw-dot sw-k"></div></button>
          <button className="swatch" title="dark brown leather"><div className="sw-dot sw-db"></div></button>
          <button className="swatch" title="brown GG suede"><div className="sw-dot sw-bs"></div></button>
          <button className="swatch" title="sand and brown GG fabric"><div className="sw-dot sw-sb"></div></button>
          <button className="swatch" title="dark brown GG canvas"><div className="sw-dot sw-dg"></div></button>
          <button className="swatch active" title="beige and brown GG canvas" aria-selected="true"><div className="sw-dot sw-bg"></div></button>
          <button className="swatch" title="blue and white GG denim"><div className="sw-dot sw-bw"></div></button>
          <button className="swatch" title="black GG canvas"><div className="sw-dot sw-gk"></div></button>
          <button className="swatch" title="black GG denim"><div className="sw-dot sw-kd"></div></button>
        </div>

        <div className="p-banner">
          <img src="https://www.figma.com/api/mcp/asset/5bf2210e-df99-46f1-9f3e-0fe7fcdb414e" alt="" />
          <span className="p-banner-text">Complimentary Personalisation</span>
          <span className="p-banner-chev">
            <svg viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>

        <div className="desc-area">
          <h2 className="desc-title">Product Description</h2>
          <p className="desc-style">Style ‎853971 FAFFP 2547</p>
          <p className="desc-body">Unveiled during the Cruise 2026 fashion show in Florence, Gucci Giglio is a tribute to the House's Italian roots, and the spirit of continuity and reinvention. Crafted in GG canvas, this capacious tote features the Web trim, and is complete with a detachable pouch.</p>
        </div>

        <div className="acc-wrap">
          <div className="acc-item">
            <button className="acc-trigger">
              Product Details
              <svg className="acc-chev" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="acc-body">Open top with magnetic closure. GG canvas with Web trim. Leather lining. Gold-toned hardware. Detachable pouch included. W 48 × H 39 × D 19 cm.</div>
          </div>
          <div className="acc-item">
            <button className="acc-trigger">
              Materials &amp; Care
              <svg className="acc-chev" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="acc-body">GG canvas exterior with leather trim. Wipe gently with a soft, dry cloth.</div>
          </div>
          <div className="acc-item">
            <button className="acc-trigger">
              Our Commitment
              <svg className="acc-chev" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="acc-body">Gucci is committed to responsible practices through Gucci Equilibrium, advancing sustainability across all facets of the business.</div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="pdp-right">
        <button className="atb-btn">
          <svg viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5L4 21h16L19 7zm-9-1a2 2 0 0 1 4 0v1h-4V6zm7 13H7l.71-10h10.58L17 19z"/></svg>
          Add to bag
        </button>

        <div className="delivery-row">
          <svg viewBox="0 0 14 16" fill="none">
            <path d="M7 0C4.24 0 2 2.24 2 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5C6.17 6.5 5.5 5.83 5.5 5S6.17 3.5 7 3.5 8.5 4.17 8.5 5 7.83 6.5 7 6.5z" fill="#000"/>
          </svg>
          <span>Estimated complimentary Express delivery or Collect in Store: Wed, 1 Apr – Thu, 2 Apr</span>
        </div>

        <div className="action-row">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M13.2 10.47l-1.87-.27a.94.94 0 0 0-.83.27L9.14 11.83A9.93 9.93 0 0 1 4.17 6.86l1.36-1.36a.94.94 0 0 0 .27-.83l-.27-1.87A.95.95 0 0 0 4.58 2H2.93A.95.95 0 0 0 2 3.05C2.48 9.18 6.82 13.52 12.95 14a.95.95 0 0 0 1.05-.93v-1.65a.95.95 0 0 0-.8-.95z" fill="#000"/>
          </svg>
          <span className="ul">Order by Phone</span>
        </div>

        <div className="action-row">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5C7.17 7.5 6.5 6.83 6.5 6S7.17 4.5 8 4.5 9.5 5.17 9.5 6 8.83 7.5 8 7.5z" fill="#000"/>
          </svg>
          <span className="ul">Find in store and Book an appointment</span>
        </div>

        <div>
          <div className="svc-top">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M8 1l1.8 3.6 4 .58-2.9 2.83.68 3.99L8 10.1l-3.58 1.9.68-4L2.2 5.18l4-.58L8 1z" stroke="#000" strokeWidth="1.1" strokeLinejoin="round"/>
            </svg>
            <span className="ul">Gucci Services</span>
          </div>
          <p className="svc-desc">Complimentary Shipping, Complimentary Exchanges &amp; Returns, Secure Payments and Signature Packaging</p>
        </div>
      </div>
    </div>
  );
}
