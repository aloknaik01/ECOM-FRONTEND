import React from "react";
import "./Hero.css";

const Hero = ({ title, subtitle, buttonText, image, bgColor }) => {
  return (
    <section className="hero" style={{ backgroundColor: bgColor }}>
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">{subtitle}</p>
          <h1 className="hero-title">{title}</h1>
          <button className="hero-btn">{buttonText}</button>
        </div>
        <div className="hero-image">
          <img src={image} alt="Hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
