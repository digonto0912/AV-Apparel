import "./checkout.css";
import AnnouncementBar from "@/components/checkout/AnnouncementBar";
import CheckoutNavbar from "@/components/checkout/CheckoutNavbar";
import CartItems from "@/components/checkout/CartItems";
import OrderSummary from "@/components/checkout/OrderSummary";
import Recommendations from "@/components/checkout/Recommendations";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";

export const metadata = {
  title: "Shopping Bag",
};

export default function CheckoutBagPage() {
  return (
    <>
      <AnnouncementBar />
      <CheckoutNavbar />
      <div className="page-main">
        <CartItems />
        <OrderSummary />
      </div>
      <Recommendations />
      <CheckoutFooter />
    </>
  );
}
