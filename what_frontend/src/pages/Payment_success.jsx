import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import './Payment_success.css';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    sessionId: sessionId || 'N/A'
  });

  useEffect(() => {
    // Auto-redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        {/* Success Icon */}
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title and Message */}
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="order-details">
          <div className="detail-item">
            <span className="detail-label">Order Number:</span>
            <span className="detail-value">{orderDetails.orderNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{orderDetails.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-confirmed">Confirmed</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Session ID:</span>
            <span className="detail-value" style={{fontSize: '11px', wordBreak: 'break-all'}}>{orderDetails.sessionId}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>✓ We'll send you a confirmation email shortly</li>
            <li>✓ Track your order in your account dashboard</li>
            <li>✓ Your items will be shipped within 1-2 business days</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/catalogue')}
          >
            Continue Shopping
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>

        {/* Auto-redirect Notice */}
        <p className="redirect-notice">
          Redirecting to home page in 10 seconds...
        </p>
      </div>
    </div>
  );
}
