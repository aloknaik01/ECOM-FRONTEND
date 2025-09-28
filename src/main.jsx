import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FeaturedProducts from "./pages/featured_products/FeaturedProducts.jsx";
import CollectionsGrid from "./pages/Collection/CollectionsGrid.jsx";
import Newsletter from "./components/newsletter/Newsletter.jsx";
import BestSellingProducts from "./pages/best_selling/BestSellingProducts.jsx";
import FlashSales from "./pages/flash_sell/FlashSales.jsx";
import CasualSelection from "./pages/casual_selection/CasualSelection.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import FeaturesBar from "./components/features_bar/FeaturesBar.jsx";
import Footer from "./components/footer/Footer.jsx";


createRoot(document.getElementById("root")).render(
  <>
   <App />
   <FeaturedProducts/>
   <CollectionsGrid/>
   <Newsletter/>
   <BestSellingProducts />
   <FlashSales/>
   <CasualSelection/>
   <Marquee/>
   <FeaturesBar/>
   <Footer/>
  </>
);
