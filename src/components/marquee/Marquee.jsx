import React from 'react';
import './Marquee.css';

const brands = [
  'DOROSHIE SCHIECHER',
  'MARTAN',
  'CasinPasin',
  'Wooford Remix',
  'KGS1'
];

const Marquee = () => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        {/* repeat brands twice for seamless scroll */}
        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
          <div className="marquee-item" key={index}>
            <img
              src="https://themewagon.github.io/ultras/images/brand2.png"
              alt={brand}
              className="brand-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
