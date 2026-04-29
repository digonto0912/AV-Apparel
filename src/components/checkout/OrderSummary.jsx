export default function OrderSummary() {
  return (
    <div className="col-right">
      <div className="loyalty-banner">
        <div className="loyalty-logo">
          <img src="https://www.figma.com/api/mcp/asset/476d85af-266f-45cc-9b6c-48cf39c38065" alt="My AV Rewards" />
        </div>
        <div className="loyalty-earn">You could earn 950 points on this order.</div>
        <div className="loyalty-cta">
          <a href="#">Sign in</a>
          <span>&nbsp;or&nbsp;</span>
          <a href="#">Join</a>
          <span>&nbsp;My AV Rewards now.</span>
        </div>
      </div>

      <div className="order-summary-wrap">
        <div className="os-heading-row">
          <span className="os-title">Order Summary</span>
          <span className="os-count">&nbsp;(2 items)</span>
        </div>
        <div className="os-row">
          <span className="os-label">Subtotal</span>
          <span className="os-val">$95.00</span>
        </div>
        <div className="os-row">
          <span className="os-label">Tax</span>
          <span className="os-val">Calculated in checkout</span>
        </div>
        <div className="os-row">
          <span className="os-label">Standard Shipping</span>
          <span className="os-free">FREE</span>
        </div>
        <div className="promo-row">
          <span className="promo-label">Have a promo code?</span>
          <span className="promo-chevron">
            <img src="https://www.figma.com/api/mcp/asset/9b265864-50cd-4caf-bdc8-87a82e4b01d3" alt="›" />
          </span>
        </div>

        <div className="checkout-card">
          <div className="est-row">
            <span className="est-label">Estimated Total</span>
            <span className="est-total">$95.00</span>
          </div>
          <div className="installments">
            <span>4 payments of $23.75 with</span>
            <img className="klarna-sm" src="https://www.figma.com/api/mcp/asset/46dac271-8687-4681-8229-95b2e62fb721" alt="Klarna" />
            <span>or</span>
            <img className="afterpay-sm" src="https://www.figma.com/api/mcp/asset/e39deb7e-23af-41a0-a85b-d4944c199432" alt="Afterpay" />
          </div>

          <button className="btn-checkout">Start Checkout</button>

          <div className="or-text">or check out with</div>

          <div className="alt-btns">
            <div className="alt-btn">
              <img src="https://www.figma.com/api/mcp/asset/4fd087b8-dde1-4ef4-b19e-c9db2f7da547" alt="PayPal" />
            </div>
            <div className="alt-btn">
              <img src="https://www.figma.com/api/mcp/asset/5fc2fbd0-9479-4379-ae48-2e1f2d6e704e" alt="Klarna Express" />
            </div>
          </div>

          <div className="free-returns">My AV Rewards members enjoy free returns.</div>
          <div className="help-block">
            100% Authentic AV APPAREL<br />
            Need Help? Customer Support 866.513.0513
          </div>
          <div className="help-links">
            <a href="#">Shipping Info</a>
            <span className="sep">|</span>
            <a href="#">Returns</a>
          </div>
        </div>
      </div>
    </div>
  );
}
