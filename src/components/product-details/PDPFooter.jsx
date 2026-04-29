export default function PDPFooter() {
  return (
    <>
      <footer className="footer">
        <div className="footer-grid">
          <div className="fc">
            <p className="fh">May We Help You?</p>
            <a className="fl">Contact Us</a>
            <a className="fl">My Order</a>
            <a className="fl">FAQs</a>
            <a className="fl">Email Unsubscribe</a>
            <a className="fl">Sitemap</a>
            <p className="fh" style={{marginTop: '44px'}}>Gucci Services</p>
            <a className="fl">Discover Our Services</a>
            <a className="fl">Book an Appointment</a>
          </div>
          <div className="fc">
            <p className="fh">The Company</p>
            <a className="fl">About Gucci</a>
            <a className="fl">Gucci Equilibrium</a>
            <a className="fl">Code of Ethics</a>
            <a className="fl">Careers</a>
            <a className="fl">Legal</a>
            <a className="fl">Privacy Policy</a>
            <a className="fl">Cookie Policy</a>
            <a className="fl" style={{fontWeight: 700, textTransform: 'uppercase', fontSize: '11px'}}>Cookies Settings</a>
            <a className="fl">Corporate Information</a>
            <a className="fl">Vulnerability Disclosure Policy</a>
          </div>
          <div className="fc">
            <p className="fh">Store Locator</p>
            <div className="f-input-row">
              <input className="f-input" type="text" placeholder="City, Region, Country" />
              <button className="f-sub">
                <svg viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="#000" strokeWidth="1.4"/><path d="M10 10l3 3" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
          <div className="fc">
            <p className="fh">Sign Up For Gucci Updates</p>
            <p style={{fontSize: '12px', color: '#555', lineHeight: 1.65, marginBottom: '16px'}}>
              By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. More details on this are provided in our <a href="#" style={{textDecoration: 'underline'}}>Privacy Policy</a>.
            </p>
            <div className="f-input-row">
              <input className="f-input" type="email" placeholder="Email" />
              <button className="f-sub">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <p className="fh" style={{marginTop: '36px'}}>Language</p>
            <a className="fl" style={{display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
              English
              <svg viewBox="0 0 10 10" style={{width: '11px', height: '11px'}} fill="none"><path d="M2 3.5l3 3 3-3" stroke="#000" strokeWidth="1.3"/></svg>
            </a>
            <p className="fh" style={{marginTop: '28px'}}>Country/Region</p>
            <a className="fl">Australia</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2016 – 2025 Guccio Gucci S.p.A. – All rights reserved.<br />SIAE LICENCE # 2294/I/1936 and 5647/I/1936</p>
        </div>

        <div className="footer-wm" style={{marginTop: '44px'}}>
          <svg viewBox="0 0 1223 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <text x="0" y="182"
              fontFamily="'Times New Roman',Times,serif"
              fontSize="215"
              fontWeight="400"
              letterSpacing="20"
              fill="#e0dbd6">GUCCI</text>
          </svg>
        </div>
      </footer>

      <div className="chat-fab" title="Chat with an Advisor">
        <div className="chat-dot"></div>
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
      </div>
    </>
  );
}
