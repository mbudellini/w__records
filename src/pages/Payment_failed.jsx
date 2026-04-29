import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Payment_failed.css';

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [errorReason] = useState('Payment could not be processed');

  const reasons = [
    'Insufficient funds in your account',
    'Card expired or invalid',
    'Billing address mismatch',
    'Temporary connection issue',
    'Daily transaction limit exceeded',
  ];

  return (
    <div className="payment-failed-container">
      <div className="failed-card">
        {/* Error Icon */}
        <div className="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        {/* Title and Message */}
        <h1 className="error-title">Payment Failed</h1>
        <p className="error-message">
          We couldn't process your payment. Please try again with a different payment method.
        </p>

        {/* Error Reason */}
        <div className="error-reason">
          <p className="reason-label">Common reasons this might happen:</p>
          <ul className="reasons-list">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>

        {/* Important Info Box */}
        <div className="info-box">
          <h3>ℹ️ Important</h3>
          <p>
            Your items are still in your cart. No charges have been made to your account.
            You can try again at any time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/cart')}
          >
            Return to Cart & Retry
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
          <button
            className="btn btn-tertiary"
            onClick={() => navigate('/catalogue')}
          >
            Continue Shopping
          </button>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>Need Help?</h3>
          <p>
            If you continue to experience issues, please contact our support team at{' '}
            <a href="mailto:support@whatrecords.com">support@whatrecords.com</a> or call us at
            <span className="phone"> +1 (555) 123-4567</span>
          </p>
        </div>
      </div>
    </div>
  );
}
