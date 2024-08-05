import React from 'react';
import { Link } from 'react-router-dom';

const FaqInput = () => {
  return (
    <div className="faq-link">
      <Link to="/faq">
        Για περισσότερες πληροφορίες δείτε το FAQ από αυτή τη σελίδα
      </Link>
    </div>
  );
};


export default FaqInput;