export default function CartItems() {
  return (
    <div className="col-left">
      <div className="bag-heading">
        <div className="bag-title-row">
          <span className="bag-title">Shopping Bag</span>
          <span className="bag-count">&nbsp;(2 items)</span>
          <span className="bag-subtotal">$95.00</span>
        </div>
        <div className="bag-reserve">
          <img src="https://www.figma.com/api/mcp/asset/4fa7ff40-2fa0-4179-9055-1407a584efa9" alt="" />
          Items in bag are not reserved and may sell out. Order now.
        </div>
      </div>

      {/* Item 1 */}
      <div className="cart-item">
        <div className="item-img-wrap">
          <img src="https://www.figma.com/api/mcp/asset/b60f2d3d-1d8e-4acf-ab5c-f78e9d4edb01" alt="Tech Pique T-Shirt Bright White" />
        </div>
        <div className="item-body">
          <div className="item-top-row">
            <span className="item-name">Tech Pique T-Shirt</span>
            <div className="item-right">
              <div className="item-price-wrap">
                <span className="price-orig">$59.00</span>
                <span className="price-sale">$35.40</span>
              </div>
              <div className="qty-wrap">
                <span className="qty-btn"><img src="https://www.figma.com/api/mcp/asset/5d6fcce4-951b-467b-98e0-e77b13c3b56d" alt="-" /></span>
                <div className="qty-num">1</div>
                <span className="qty-btn"><img src="https://www.figma.com/api/mcp/asset/11b039b1-75d2-4792-878f-85156837775f" alt="+" /></span>
              </div>
            </div>
          </div>
          <div className="item-color">Bright White</div>
          <div className="item-size">S</div>
          <div className="item-promo-row">
            <span className="item-promo">40% off</span>
            <a className="item-details-lnk">Details</a>
          </div>
          <div className="item-bottom">
            <div className="item-stock-row">
              <span className="stock-green">In Stock:&nbsp;</span>
              <span className="stock-ship">Ships in 1-2 business days</span>
            </div>
            <div className="item-actions">
              <span className="item-action">Edit</span>
              <span className="item-action">Save for Later</span>
              <span className="item-action">Remove</span>
            </div>
          </div>
        </div>
      </div>

      {/* Item 2 */}
      <div className="cart-item">
        <div className="item-img-wrap">
          <img src="https://www.figma.com/api/mcp/asset/1ac841d7-2610-4330-ba0f-f46a4087e320" alt="Lightweight Windbreaker Jacket Chase Blue" />
        </div>
        <div className="item-body">
          <div className="item-top-row">
            <span className="item-name item-name-lg">Lightweight Windbreaker Jacket</span>
            <div className="item-right">
              <div className="item-price-wrap">
                <span className="price-orig" style={{fontSize: '12px'}}>$149.00</span>
                <span className="price-sale" style={{fontSize: '12.2px'}}>$59.60</span>
              </div>
              <div className="qty-wrap">
                <span className="qty-btn"><img src="https://www.figma.com/api/mcp/asset/5d6fcce4-951b-467b-98e0-e77b13c3b56d" alt="-" /></span>
                <div className="qty-num">1</div>
                <span className="qty-btn"><img src="https://www.figma.com/api/mcp/asset/11b039b1-75d2-4792-878f-85156837775f" alt="+" /></span>
              </div>
            </div>
          </div>
          <div className="item-color">Chase Blue</div>
          <div className="item-size">XS</div>
          <div className="item-promo-row">
            <span className="item-promo" style={{fontSize: '12.4px'}}>Sale: 60% off</span>
            <a className="item-details-lnk">Details</a>
          </div>
          <div className="item-bottom">
            <div className="item-stock-row">
              <span className="stock-red">Only 3 left in stock:&nbsp;</span>
              <span className="stock-ship">Ships in 1-2 business days</span>
            </div>
            <div className="item-actions">
              <span className="item-action">Edit</span>
              <span className="item-action">Save for Later</span>
              <span className="item-action">Remove</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Options */}
      <div className="gift-bar">
        <div className="gift-inner">
          <span>Gift options available in checkout</span>
        </div>
      </div>
    </div>
  );
}
