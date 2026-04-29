import Footer from "@/components/shared/Footer";
import StoreHeaderSwitch from "@/components/shared/StoreHeaderSwitch";

export default function StoreLayout({ children }) {
  return (
    <>
      <StoreHeaderSwitch />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
