import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  icon: "/favicon.ico", // Points to public/favicon.ico
  title: "AV APPAREL | Official Online Store",
  description:
    "Shop AV APPAREL for timeless style and modern design. Explore clothing, underwear, and accessories for men, women, and kids.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{ duration: 3000, style: { fontSize: "14px" } }}
          />
        </Providers>
      </body>
    </html>
  );
}
