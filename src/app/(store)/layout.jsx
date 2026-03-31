import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function StoreLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
