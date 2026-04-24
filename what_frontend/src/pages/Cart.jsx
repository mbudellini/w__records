import axios from "axios";
import { useState, useEffect } from "react";

function Cart({ userEmail }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userEmail) {
          setError("Please login first to view your cart");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:4444/cart/viewUserCart",
          {
            params: { userEmail: userEmail },
          },
        );

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
  }, []);

  const handleDeleteItem = async (instance_id) => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      const response = await axios.delete(
        "http://localhost:4444/cart/deleteOne",
        {
          data: {
            userEmail,
            instance_id,
          },
        },
      );

      if (response.data.ok) {
        // Aggiorna il carrello localmente
        const updatedItems = cartItems.filter(
          (item) => item.instance_id !== instance_id,
        );
        setCartItems(updatedItems);

        if (updatedItems.length > 0) {
          setTotalPrice(response.data.data.totalPrice);
        } else {
          setTotalPrice(0);
        }

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
      <div style={styles.container}>
        <div style={styles.loading}>Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Start adding records to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>

      <div style={styles.cartWrapper}>
        <div style={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.instance_id} style={styles.cartItem}>
              <div style={styles.itemImage}>
                <img
                  src={item.cover_image}
                  alt={item.title}
                  style={styles.image}
                />
              </div>

              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemInfo}>
                  <strong>Instance ID:</strong> {item.instance_id}
                </p>
                <p style={styles.itemInfo}>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p style={styles.itemInfo}>
                  <strong>Price per item:</strong> ${item.price.toFixed(2)}
                </p>
                <p style={styles.itemTotal}>
                  <strong>Subtotal:</strong> $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteItem(item.instance_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryContent}>
            <p style={styles.summaryLine}>
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </p>
            <p style={styles.summaryLine}>
              <span>Total Quantity:</span>
              <span>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </p>
            <div style={styles.divider}></div>
            <p style={styles.totalLine}>
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
            <button style={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#666",
  },
  error: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#d32f2f",
    backgroundColor: "#ffebee",
    borderRadius: "8px",
  },
  emptyCart: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  cartWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "30px",
    marginTop: "30px",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "120px 1fr 120px",
    gap: "20px",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  itemImage: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  itemTitle: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "16px",
    color: "#333",
  },
  itemInfo: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
  itemTotal: {
    margin: 0,
    fontSize: "15px",
    color: "#1976d2",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: "10px 20px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  summary: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "25px",
    height: "fit-content",
    position: "sticky",
    top: "20px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  divider: {
    height: "1px",
    backgroundColor: "#e0e0e0",
    margin: "10px 0",
  },
  totalLine: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1976d2",
    margin: 0,
  },
  checkoutBtn: {
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "15px",
    transition: "background-color 0.3s",
  },
};

export default Cart;
