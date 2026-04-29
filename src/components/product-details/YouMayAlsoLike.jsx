export default function YouMayAlsoLike() {
  return (
    <section className="ymal-section">
      <h2 className="ymal-heading">You May Also Like</h2>
      <div className="ymal-vp">
        <button className="ymal-nav ymal-prev" id="yPrev">
          <svg viewBox="0 0 14 14" fill="none"><path d="M9 11.5L4.5 7 9 2.5" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="ymal-track" id="yTrack">
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/5bf2210e-df99-46f1-9f3e-0fe7fcdb414e" alt="Gucci Giglio small tote bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">Gucci Giglio small tote bag</p>
              <p className="ymal-price">A$3,100</p>
            </div>
          </div>
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/1347e4df-6183-435b-b29e-a06b1b1485d1" alt="Gucci Giglio small tote bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">Gucci Giglio small tote bag</p>
              <p className="ymal-price">A$3,100</p>
            </div>
          </div>
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/e63c5677-4757-400c-8386-a9256ecb8d7b" alt="Gucci Vanity medium top handle bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">Gucci Vanity medium top handle bag</p>
              <p className="ymal-price">A$2,900</p>
            </div>
          </div>
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/12195b85-d47b-4085-b16e-97a8ff067cf5" alt="Gucci Giglio large tote bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">Gucci Giglio large tote bag</p>
              <p className="ymal-price">A$3,600</p>
            </div>
          </div>
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/2ef03a90-90a1-4336-a95f-e83e45b5a35a" alt="Gucci Giglio large tote bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">Gucci Giglio large tote bag</p>
              <p className="ymal-price">A$3,750</p>
            </div>
          </div>
          <div className="ymal-card">
            <div className="ymal-img">
              <span className="ymal-pers">Personalise with initials</span>
              <img src="https://www.figma.com/api/mcp/asset/39ed06e3-cf17-4e5b-82c8-751a2aee1c1c" alt="GG Emblem medium tote bag" />
            </div>
            <div className="ymal-info">
              <p className="ymal-name">GG Emblem medium tote bag</p>
              <p className="ymal-price">A$3,200</p>
            </div>
          </div>
        </div>
        <button className="ymal-nav ymal-next" id="yNext">
          <svg viewBox="0 0 14 14" fill="none"><path d="M5 2.5L9.5 7 5 11.5" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="ymal-dots">
        <button className="ymal-dot active"></button>
        <button className="ymal-dot"></button>
        <button className="ymal-dot"></button>
      </div>
    </section>
  );
}
