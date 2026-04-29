import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/config.js";
import "./Cart.css";


function Cart() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate= useNavigate()

   const createCheckoutSession = async (products) => {
    try {
      // 2. Sending request to the create_checkout_session controller and passing products to be paid for
      const response = await api.post(
        `/payment/create-checkout-session`,
        { products }
      );
      return response.data.ok
        ? // we save session id in localStorage to get it later
          (localStorage.setItem(
            "sessionId",
            JSON.stringify(response.data.sessionId)
          ),
          // 9. If server returned ok after making a session we send them to the URL of the checkout session at Stripe to the actual checkout / payment form
          window.location.href = response.data.url
        )
        : navigate("/payment/error");
    } catch (error) {
      navigate("/payment/error");
    }
  };



  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userEmail) {
          setError("Please login first to view your cart");
          setLoading(false);
          return;
        }

        const response = await api.get("/cart/viewUserCart", {
          params: { userEmail },
        });

        if (response.data.ok) {
          if (response.data.data && response.data.data.items) {
            setCartItems(response.data.data.items);
            setTotalPrice(response.data.data.totalPrice);
          } else {
            setCartItems([]);
            setTotalPrice(0);
          }
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(`Failed to load cart: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userEmail]);

  const handleDeleteItem = async (instance_id) => {
    try {
      const response = await api.delete("/cart/deleteOne", {
        data: { userEmail, instance_id },
      });

      if (response.data.ok) {
        const updatedItems = cartItems.filter(
          (item) => item.instance_id !== instance_id
        );
        setCartItems(updatedItems);
        setTotalPrice(updatedItems.length > 0 ? response.data.data.totalPrice : 0);
        alert("Item removed from cart");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Failed to delete item: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="cart-error">{error}</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Browse the catalogue to find records you love.</p>
          <Link to="/" className="cart-empty-link">Browse Records</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-heading">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.instance_id} className="cart-item">
              <div className="cart-item-img">
                <img src={item.cover_image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Qty: {item.quantity}</p>
                <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="cart-remove-btn"
                onClick={() => handleDeleteItem(item.instance_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="cart-summary-row">
              <span>Total Quantity</span>
              <span>{cartItems.reduce((sum, i) => sum + i.quantity, 0)}</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={()=>createCheckoutSession(cartItems)} className="cart-checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
