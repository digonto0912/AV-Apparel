export default function CheckoutNavbar() {
  return (
    <header className="site-header">
      <div className="header-logo">
        <img src="https://www.figma.com/api/mcp/asset/116dbb54-1fba-477a-a485-2ec608c753aa" alt="Calvin Klein" />
      </div>
      <nav className="header-nav">
        <a href="#">New</a>
        <a href="#">Women</a>
        <a href="#">Men</a>
        <a href="#">Underwear</a>
        <a href="#">Collection</a>
        <a href="#">Kids</a>
        <a href="#">Home</a>
        <a href="#">Sale</a>
      </nav>
      <div className="header-icons">
        <img src="https://www.figma.com/api/mcp/asset/f7bfb000-d681-4425-8cd4-5d30603f7e6e" alt="Search" />
        <img src="https://www.figma.com/api/mcp/asset/00358956-9119-4394-aad7-5b81892d5fb6" alt="Account" />
        <div className="cart-wrap">
          <img src="https://www.figma.com/api/mcp/asset/f4f4f897-50b6-4977-9793-4320da41b575" alt="Cart" />
          <div className="cart-badge">2</div>
        </div>
      </div>
    </header>
  );
}
