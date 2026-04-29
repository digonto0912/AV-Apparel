export default function Gallery() {
  return (
    <div className="gallery-wrap">
      <div className="gallery-track" id="gTrack">
        <div className="gallery-slide">
          <img src="https://www.figma.com/api/mcp/asset/5bf2210e-df99-46f1-9f3e-0fe7fcdb414e" alt="Gucci Giglio large tote bag — front" />
          <img src="https://www.figma.com/api/mcp/asset/1347e4df-6183-435b-b29e-a06b1b1485d1" alt="Gucci Giglio large tote bag — side" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/e63c5677-4757-400c-8386-a9256ecb8d7b" alt="Detail view 2" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/12195b85-d47b-4085-b16e-97a8ff067cf5" alt="Detail view 3" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/2ef03a90-90a1-4336-a95f-e83e45b5a35a" alt="Detail view 4" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/39ed06e3-cf17-4e5b-82c8-751a2aee1c1c" alt="Detail view 5" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/99dd617c-a29b-4315-bf57-7f6372dd363b" alt="Detail view 6" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/c5888329-6535-4fa5-b986-fda5f959a112" alt="Detail view 7" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/2215a717-d204-445d-92a3-b18640acbf46" alt="Detail view 8" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/f0d33696-1685-43f1-816f-fba210e267f7" alt="Detail view 9" />
        </div>
        <div className="gallery-slide single">
          <img src="https://www.figma.com/api/mcp/asset/34ba9c91-f3f4-47d8-a60e-498e33d794bd" alt="Detail view 10" />
        </div>
      </div>

      <div className="gallery-bar">
        <button className="g-arrow" id="gPrev">
          <svg viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="g-arrow" id="gNext">
          <svg viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5l-3 3" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="thumb active" data-i="0"><img src="https://www.figma.com/api/mcp/asset/5bf2210e-df99-46f1-9f3e-0fe7fcdb414e" alt="1" /></div>
        <div className="thumb" data-i="1"><img src="https://www.figma.com/api/mcp/asset/e63c5677-4757-400c-8386-a9256ecb8d7b" alt="2" /></div>
        <div className="thumb" data-i="2"><img src="https://www.figma.com/api/mcp/asset/12195b85-d47b-4085-b16e-97a8ff067cf5" alt="3" /></div>
        <div className="thumb" data-i="3"><img src="https://www.figma.com/api/mcp/asset/2ef03a90-90a1-4336-a95f-e83e45b5a35a" alt="4" /></div>
        <div className="thumb" data-i="4"><img src="https://www.figma.com/api/mcp/asset/39ed06e3-cf17-4e5b-82c8-751a2aee1c1c" alt="5" /></div>
        <div className="thumb-overflow">+ 5</div>
      </div>
    </div>
  );
}
