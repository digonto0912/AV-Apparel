import "./product-details.css";
import PDPNavbar from "@/components/product-details/PDPNavbar";
import Gallery from "@/components/product-details/Gallery";
import PDPInfo from "@/components/product-details/PDPInfo";
import YouMayAlsoLike from "@/components/product-details/YouMayAlsoLike";
import Breadcrumb from "@/components/product-details/Breadcrumb";
import PDPFooter from "@/components/product-details/PDPFooter";

export const metadata = {
  title: "Product Details",
};

export default function ProductDetailsPage() {
  return (
    <>
      <PDPNavbar />
      <Gallery />
      <PDPInfo />
      <YouMayAlsoLike />
      <Breadcrumb />
      <PDPFooter />
    </>
  );
}
