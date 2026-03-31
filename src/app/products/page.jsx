import "./products.css";
import FigmaScaler from "@/components/FigmaScaler";
import ProductsContent from "@/components/products/ProductsContent";

export const metadata = {
  title: "AV Apparel  Men's Clothing + Accessories",
};

export default function ProductsPage() {
  return (
    <div id="figmaPage" className="figma-page">
      <FigmaScaler baseWidth={1351} />
      <ProductsContent />
    </div>
  );
}
