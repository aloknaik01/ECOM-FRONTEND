import React from "react";
import "./Home.css";
import { Search, ShoppingCart, User } from "lucide-react";
import FeaturedProducts from "./pages/featured_products/FeaturedProducts.jsx";
import CollectionsGrid from "./pages/Collection/CollectionsGrid.jsx";
import Newsletter from "./components/newsletter/Newsletter.jsx";
import BestSellingProducts from "./pages/best_selling/BestSellingProducts.jsx";
import FlashSales from "./pages/flash_sell/FlashSales.jsx";
import CasualSelection from "./pages/casual_selection/CasualSelection.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import FeaturesBar from "./components/features_bar/FeaturesBar.jsx";
import HeroSlider from "./components/HeroSlider/HeroSlider.jsx";
const Home = () => {
  return (
    <>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <h1>Ultras.</h1>
                <span className="tagline">Casual Wear Store</span>
              </div>
              <nav className="nav">
                <ul className="nav-list">
                  <li>
                    <a href="#" className="nav-link active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Pages
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="header-icons">
                <Search className="icon" size={38} />
                <User className="icon" size={38} />
                <ShoppingCart className="icon" size={38} />
              </div>
            </div>
          </div>
        </header>

        {/* Top Bar */}
        <HeroSlider />
      </div>



      {/* Other pages */}
      <FeaturedProducts />
      <CollectionsGrid />
      <Newsletter />
      <BestSellingProducts />
      <FlashSales />
      <CasualSelection />
      <Marquee />
      <FeaturesBar />
    </>

  );
};

export default Home;
