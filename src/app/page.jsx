import "./home.css";
import FigmaScaler from "@/components/FigmaScaler";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import DenimCarousel from "@/components/home/DenimCarousel";
import SpringSection from "@/components/home/SpringSection";
import The90sEdit from "@/components/home/The90sEdit";
import SpringJacketsSection from "@/components/home/SpringJacketsSection";
import New90sWashesSection from "@/components/home/New90sWashesSection";
import LiveInSection from "@/components/home/LiveInSection";
import RewardsSection from "@/components/home/RewardsSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "AV Apparel Homepage",
};

export default function HomePage() {
  return (
    <div
      id="figmaPage"
      className="figma-node n-4-2"
    >
      <FigmaScaler baseWidth={1920} />
      <div
        className="figma-node n-4-3"
        data-node-id="4:3"
        data-node-name="Background"
        data-node-type="FRAME"
      >
        <div
          className="figma-node n-4-4"
          data-node-id="4:4"
          data-node-name="Main Content"
          data-node-type="FRAME"
        >
          <HeroSection />
          <DenimCarousel />
          <SpringSection />
          <The90sEdit />
          <SpringJacketsSection />
          <New90sWashesSection />
          <LiveInSection />
          <RewardsSection />
          <NewArrivalsSection />
        </div>
        <Footer />
        <Navbar />
      </div>
    </div>
  );
}
