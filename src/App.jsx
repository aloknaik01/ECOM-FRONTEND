import React from "react";
import "./app.css";
import { Search, ShoppingCart, User } from "lucide-react";


const App = () => {
  return (
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
              <Search className="icon" size={40} />
              <User className="icon" size={40} />
              <ShoppingCart className="icon" size={40} />
            </div>
          </div>
        </div>
      </header>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <span>Let's talk! +57 444 11 00 35</span>
            <span>Free shipping on a purchase value of $200</span>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <main className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">
                Summer
                <br />
                Collection
              </h1>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                feugiat amet, libero ipsum enim pharetra hac.
              </p>
              <button className="cta-button">SHOP IT NOW →</button>
            </div>
            <div className="hero-right">
              <div className="hero-image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Yyfnh8__2y1Yy_HCzaFm122scVKTU6tvCQ&s"
                  alt="Summer Collection Model"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button className="nav-arrow nav-arrow-left">‹</button>
        <button className="nav-arrow nav-arrow-right">›</button>
      </main>
    </div>

  );
};

export default App;
