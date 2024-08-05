import React from 'react';
import '../../styles/FAQPage.css';

const FAQPage = () => {
  return (
    <div className="faq-page">
      <header className="faq-header">
        <h1>Frequently Asked Questions (FAQ)</h1>
      </header>
      <section className="faq-content">
        <div className="faq-item">
          <h2>Question 1: What is this website about?</h2>
          <p>Answer: This website provides information and resources about various topics. You can explore different sections to find detailed information.</p>
        </div>
        <div className="faq-item">
          <h2>Question 2: How can I contact support?</h2>
          <p>Answer: You can contact support by emailing us at support@example.com or by filling out the contact form on our Contact page.</p>
        </div>
        <div className="faq-item">
          <h2>Question 3: Where can I find more information?</h2>
          <p>Answer: More information can be found on our About Us page or by visiting our Help Center.</p>
        </div>
        {/* Add more FAQ items as needed */}
      </section>
    </div>
  );
};

export default FAQPage;