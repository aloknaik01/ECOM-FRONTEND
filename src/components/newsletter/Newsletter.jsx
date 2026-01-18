import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
 
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      console.log('Subscribed with email:', email);
      
    
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-left">
            <h2 className="newsletter-title">Get 25% Off Discount Coupons</h2>
            <p className="newsletter-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst amet, metus, 
              sit massa posuere maecenas. At tellus ut nunc amet vel egestas.
            </p>
          </div>
          
          <div className="newsletter-right">
            {isSubscribed ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="email-input-container">
                  <input
                    type="email"
                    placeholder="Enter your email address here"
                    value={email}
                    onChange={handleEmailChange}
                    className="email-input"
                    required
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="subscribe-btn"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
