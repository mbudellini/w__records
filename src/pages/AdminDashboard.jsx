import { useState, useEffect } from "react";
import api from "../api/config.js";
import { BeatLoader } from "react-spinners";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/records/getCollectionFromDB");
        if (response.data.ok && response.data.data) {
          calculateStats(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };
    fetchStats();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await api.get("/payment/all-orders");
      if (response.data.ok) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const calculateStats = (records) => {
    const uniqueRecords = [
      ...new Map(records.map((r) => [r.id, r])).values(),
    ];

    const totalRecords = uniqueRecords.length;
    const avgPrice =
      uniqueRecords.reduce((sum, r) => sum + (r.price || 15.99), 0) /
      totalRecords;

    const genreCount = {};
    uniqueRecords.forEach((record) => {
      (record.basic_information.genres || []).forEach((genre) => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });
    const topGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const decadeCount = {};
    uniqueRecords.forEach((record) => {
      const year = record.basic_information.year;
      if (year) {
        const decade = Math.floor(year / 10) * 10;
        decadeCount[decade] = (decadeCount[decade] || 0) + 1;
      }
    });
    const topDecade = Object.entries(decadeCount).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const totalValue = uniqueRecords.reduce(
      (sum, r) => sum + (r.price || 15.99),
      0
    );

    setStats({
      totalRecords,
      avgPrice: avgPrice.toFixed(2),
      totalValue: totalValue.toFixed(2),
      topGenres,
      topDecade: topDecade
        ? `${topDecade[0]}s (${topDecade[1]} records)`
        : "N/A",
      latestSync: new Date().toLocaleString(),
    });
  };

  const handleSync = async (records) => {
    setSyncing(true);
    setSyncMessage("");

    try {
      const response = await api.post("/records/saveCollection");
      if (response.data.ok) {
        setSyncMessage(`Synced successfully, ${response.data.message}`);
        const statsResponse = await api.get("/records/getCollectionFromDB");
        if (statsResponse.data.ok) {
          calculateStats(statsResponse.data.data);
        }
      } else {
        setSyncMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setSyncMessage(`Sync failed: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <BeatLoader color="var(--accent)" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="admin-heading">Admin Dashboard</h1>

      <div className="admin-sync">
        <h2>Sync Collection</h2>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="admin-sync-btn"
        >
          {syncing ? "Syncing..." : "Sync from Discogs"}
        </button>
        {syncMessage && (
          <p className="admin-sync-msg">{syncMessage}</p>
        )}
      </div>

      {stats && (
        <div className="admin-stats">
          <div className="admin-stat">
            <h3>Total Records</h3>
            <p className="admin-stat-val">{stats.totalRecords}</p>
          </div>
          <div className="admin-stat">
            <h3>Average Price</h3>
            <p className="admin-stat-val">${stats.avgPrice}</p>
          </div>
          <div className="admin-stat">
            <h3>Collection Value</h3>
            <p className="admin-stat-val">${stats.totalValue}</p>
          </div>
          <div className="admin-stat">
            <h3>Peak Decade</h3>
            <p className="admin-stat-val">{stats.topDecade}</p>
          </div>

          <div className="admin-stat admin-stat-full">
            <h3>Top Genres</h3>
            <div className="admin-genres">
              {stats.topGenres.map((genre, idx) => (
                <div key={idx} className="admin-genre-row">
                  <span className="admin-genre-name">{genre[0]}</span>
                  <span className="admin-genre-count">{genre[1]} records</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-stat admin-stat-full">
            <p className="admin-last-sync">Last synced: {stats.latestSync}</p>
          </div>
        </div>
      )}

      <div className="admin-orders-section">
        <h2>Orders</h2>
        {ordersLoading ? (
          <div className="admin-orders-loading">
            <BeatLoader color="var(--accent)" size={12} />
          </div>
        ) : orders.length === 0 ? (
          <p className="admin-no-orders">No orders yet</p>
        ) : (
          <div className="admin-orders-table-wrapper">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Amount €</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Session ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.sessionId}>
                    <td className="admin-order-number">{order.orderNumber}</td>
                    <td className="admin-order-amount">€{order.amount}</td>
                    <td className="admin-order-email">{order.email}</td>
                    <td className="admin-order-items">
                      <div className="items-list">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="item-detail">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="admin-order-session">
                      <code>{order.sessionId}</code>
                    </td>
                    <td className="admin-order-date">{order.createdAt}</td>
                    <td className="admin-order-status">
                      <span className={`status-badge status-${order.status}`}>
                        {order.status === 'paid' ? 'Paid' : 
                         order.status === 'unpaid' ? 'Unpaid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
