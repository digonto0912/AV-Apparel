import "./globals.css";

export const metadata = {
  title: "AV Apparel",
  description: "AV Apparel – Fashion for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
