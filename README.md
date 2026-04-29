AV Apparel - Next.js App
========================

# Development
npm run dev     → starts dev server at http://localhost:3000
npm run build   → production build
npm run start   → production server

# Routes
/           → Homepage  (src/app/page.tsx)
/products   → Product Listings page  (src/app/products/page.tsx)

# Structure
src/
  app/
    layout.tsx              - Root layout
    page.tsx                - Homepage
    globals.css             - Tailwind base styles
    figma-homepage.css      - Pixel-perfect homepage styles (from Figma export)
    figma-products.css      - Pixel-perfect products page styles (from Figma export)
    products/
      page.tsx              - Product Listings page
  components/
    FigmaScaler.tsx         - Client component: scales fixed-width canvas to viewport
public/
  assets/                   - All images and SVGs
    page2/                  - Assets used by the products page
"# AV-Apparel" 
