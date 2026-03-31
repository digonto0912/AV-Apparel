export default function CheckoutFooter() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-col" style={{flex: 1.3}}>
          <ul className="footer-links footer-links-white">
            <li><a href="#">Promotions</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Stores</a></li>
            <li><a href="#">Store Directory</a></li>
            <li><a href="#">My AV Rewards</a></li>
            <li><a href="#">Klarna</a></li>
            <li><a href="#">Cash App Afterpay</a></li>
            <li><a href="#">Student and Service Discount</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-head">Help</div>
          <ul className="footer-links">
            <li><a href="#">Customer Service</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Accessibility</a></li>
            <li>
              <a href="#" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <img src="https://www.figma.com/api/mcp/asset/22b5b225-2cf9-4b13-8375-ebbfe486fdac" alt="" style={{width: '20px', height: '16px', objectFit: 'contain', filter: 'brightness(0.45)'}} />
                Chat
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-head">About</div>
          <ul className="footer-links">
            <li><a href="#">About AV APPAREL</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Commitment</a></li>
            <li><a href="#">Sustainability + Inclusivity</a></li>
          </ul>
          <div className="footer-head footer-head-sub">Explore</div>
          <ul className="footer-links">
            <li><a href="#">Underwear Guide</a></li>
            <li><a href="#">Denim Fit Guide</a></li>
            <li><a href="#">#MYCALVINS</a></li>
            <li><a href="#">Re-Calvin</a></li>
          </ul>
        </div>
        <div className="footer-col" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
          <div className="footer-social">
            <img src="https://www.figma.com/api/mcp/asset/4ba2fc29-f4da-4266-b44c-ac6435a8474a" alt="Instagram" />
            <img src="https://www.figma.com/api/mcp/asset/c23ebebc-346c-4bde-b54c-77bb80ea22c5" alt="TikTok" />
            <img src="https://www.figma.com/api/mcp/asset/a52086cc-1082-4622-aec7-4309236349fb" alt="Facebook" />
            <img src="https://www.figma.com/api/mcp/asset/f72b5e12-1909-4873-bfbb-7c06cc721a2d" alt="X" />
            <img src="https://www.figma.com/api/mcp/asset/1607048a-5d50-4bd2-b0e2-51d81a74e254" alt="Pinterest" />
            <img src="https://www.figma.com/api/mcp/asset/9b265864-50cd-4caf-bdc8-87a82e4b01d3" alt="YouTube" style={{filter: 'brightness(0.4)'}} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <img className="footer-pvh-logo" src="https://www.figma.com/api/mcp/asset/164301c9-69ea-46e3-b799-a0dcbfcf1a69" alt="PVH" />
        <div className="footer-legal">
          <a href="#">PVH Corp. Joint Modern Slavery Act Statement</a>
          <span className="sep">|</span>
          <a href="#">Privacy Policy</a>
          <span className="sep">|</span>
          <a href="#">Interest Based Ads</a>
          <span className="sep">|</span>
          <a href="#">Do Not Sell or Share My Personal Information</a>
          <span className="sep">|</span>
          <a href="#">Terms &amp; Conditions</a>
        </div>
        <div className="footer-meta">
          <span className="footer-webid">Web ID: 353163256</span>
          <span className="footer-pipe">|</span>
          <span className="footer-copy">Copyright © 2026 AV APPAREL. All rights reserved.</span>
        </div>
        <div className="footer-country">
          <img src="https://www.figma.com/api/mcp/asset/c81b912d-874a-4549-bc4e-03acada69939" alt="" />
          United States
        </div>
      </div>
    </footer>
  );
}
