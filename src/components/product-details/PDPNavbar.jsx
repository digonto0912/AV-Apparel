export default function PDPNavbar() {
  return (
    <header className="nav">
      <div className="nav-contact">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        Contact Us
      </div>
      <a className="nav-logo" href="#">
        <img src="https://www.figma.com/api/mcp/asset/2569d464-d7cf-455e-9833-1b9e3d66441b" alt="Gucci" />
      </a>
      <div className="nav-right">
        <div className="nav-icon" title="Shopping Bag">
          <img src="https://www.figma.com/api/mcp/asset/e1cddcbd-42ee-4d4d-bbf9-dc712e959059" alt="Bag" />
        </div>
        <div className="nav-icon" title="My Account">
          <img src="https://www.figma.com/api/mcp/asset/e87515e1-2c48-4d01-b8c7-1babf26d927a" alt="Account" />
        </div>
        <div className="nav-icon" title="Search">
          <img src="https://www.figma.com/api/mcp/asset/617a2a8d-17cc-4e69-ac6c-d5fce308dd42" alt="Search" />
        </div>
        <div className="nav-menu">
          <img src="https://www.figma.com/api/mcp/asset/17fbdbcd-5faf-4b16-9f11-d8290cf8d3f4" alt="" />
          MENU
        </div>
      </div>
    </header>
  );
}
