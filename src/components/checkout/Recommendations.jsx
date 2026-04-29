export default function Recommendations() {
  return (
    <>
      {/* Before You Go */}
      <div className="section-recs">
        <div className="recs-hdr">
          <span className="recs-title">Before You Go</span>
          <div className="recs-nav">
            <button className="recs-nav-btn"><img src="https://www.figma.com/api/mcp/asset/44d90cf0-4dca-4f75-80d6-f672a171aa3e" alt="prev" /></button>
            <button className="recs-nav-btn"><img src="https://www.figma.com/api/mcp/asset/5cc0eac6-ec77-4be5-9279-0e0292dc3c00" alt="next" /></button>
          </div>
        </div>
        <div className="recs-scroll">
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/4c005694-4eba-4bd0-b1fb-25590a3aded2" alt="Ombre Windbreaker Jacket" /></div>
            <p className="rec-name">Ombre Windbreaker Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$199.00</span><span className="rec-sale">$79.60</span><span className="rec-pct">60% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/9d9ac55a-cd76-493d-b107-68c35fab92a1" alt="Allover Monogram Windbreaker Autumn Green" /></div>
            <p className="rec-name">Allover Monogram Windbreaker Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$179.00</span><span className="rec-sale">$71.60</span><span className="rec-pct">60% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/f26d7210-f2c0-42ff-a4a1-865f42b03c7d" alt="Nylon Bomber Jacket" /></div>
            <p className="rec-name">Nylon Bomber Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$149.00</span><span className="rec-sale">$59.60</span><span className="rec-pct">60% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/4732f392-5199-4ab8-9a7c-99dbe291adeb" alt="Hooded Softshell Zip Jacket Dark Grey" /></div>
            <p className="rec-name">Hooded Softshell Zip Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$189.00</span><span className="rec-sale">$56.70</span><span className="rec-pct">70% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/715e7131-ce81-4474-aa56-f7a91352a293" alt="Tech Knit Track Jacket Black" /></div>
            <p className="rec-name">Tech Knit Track Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$189.00</span><span className="rec-sale">$56.70</span><span className="rec-pct">70% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/4f6e5558-7a8a-4b7a-a075-f022053b86e5" alt="Reversible Puffer Jacket" /></div>
            <p className="rec-name">Allover Emblem Logo Reversible Puffer Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$329.00</span><span className="rec-sale">$98.70</span><span className="rec-pct">70% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/58187384-4038-4466-b69b-5d1b1dbba69e" alt="Allover Monogram Windbreaker Jacket Merlot" /></div>
            <p className="rec-name">Allover Monogram Windbreaker Jacket</p>
            <div className="rec-prices"><span className="rec-orig">$179.00</span><span className="rec-sale">$71.60</span><span className="rec-pct">60% off</span></div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="section-recs">
        <div className="recs-hdr" style={{marginBottom: '16px'}}>
          <span className="recs-title" style={{fontSize: '23.1px'}}>Recently Viewed</span>
        </div>
        <div className="recs-scroll">
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/7be2d470-0454-45f7-82e1-ed7e16cfd06c" alt="Tech Pique T-Shirt Bright White" /></div>
            <p className="rec-name">Tech Pique T-Shirt</p>
            <div className="rec-prices"><span className="rec-orig">$59.00</span><span className="rec-sale">$35.40</span><span className="rec-pct">40% off</span></div>
          </div>
          <div className="rec-card">
            <div className="rec-card-img"><img src="https://www.figma.com/api/mcp/asset/b7ec93b6-f70d-4535-ae1e-bb6aa5302705" alt="90s Tapered Jeans Raw Rinse" /></div>
            <p className="rec-name">90s Tapered Jeans</p>
            <div className="rec-prices"><span className="rec-orig">$169.00</span><span className="rec-sale">$84.50</span><span className="rec-pct">50% off</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
