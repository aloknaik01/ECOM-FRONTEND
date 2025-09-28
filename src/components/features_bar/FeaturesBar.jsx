import React from 'react';
import './FeaturesBar.css';

const FeaturesBar = () => {
  const features = [
    {
      id: 1,
      icon: 'truck',
      title: 'Free shipping',
      description: 'Over $200'
    },
    {
      id: 2,
      icon: 'return',
      title: 'Money back',
      description: 'Return within 7 days'
    },
    {
      id: 3,
      icon: 'discount',
      title: 'Buy 4 get 5th',
      description: '50% off'
    },
    {
      id: 4,
      icon: 'support',
      title: 'Any questions?',
      description: 'experts are ready'
    }
  ];

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'truck':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 7H7C6.45 7 6 7.45 6 8V15C6 15.55 6.45 16 7 16H8.5C8.77 16 9 15.77 9 15.5C9 15.23 8.77 15 8.5 15H7V8H14V15H12.5C12.23 15 12 15.23 12 15.5C12 15.77 12.23 16 12.5 16H14C14.55 16 15 15.55 15 15V8C15 7.45 14.55 7 14 7Z" fill="currentColor"/>
            <path d="M17 10H16V9C16 8.45 15.55 8 15 8C14.45 8 14 8.45 14 9V10H13C12.45 10 12 10.45 12 11C12 11.55 12.45 12 13 12H14V13C14 13.55 14.45 14 15 14C15.55 14 16 13.55 16 13V12H17C17.55 12 18 11.55 18 11C18 10.45 17.55 10 17 10Z" fill="currentColor"/>
            <circle cx="9" cy="17" r="2" fill="currentColor"/>
            <circle cx="15" cy="17" r="2" fill="currentColor"/>
          </svg>
        );
      case 'return':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C21 16.418 17.418 20 13 20C8.582 20 5 16.418 5 12C5 7.582 8.582 4 13 4C17.418 4 21 7.582 21 12Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 12L5 10L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'discount':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V4M6 12H4M12 20V18M20 12H18M7.05 7.05L5.64 5.64M16.95 7.05L18.36 5.64M16.95 16.95L18.36 18.36M7.05 16.95L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'support':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="currentColor"/>
            <path d="M12 15V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="features-bar-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-item">
              <div className="feature-icon">
                {renderIcon(feature.icon)}
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
