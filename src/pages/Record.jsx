import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { API_BASE } from "../api/config.js";
import api from "../api/config.js";
import "./Record.css";
import { BeatLoader } from "react-spinners";
import {useNavigate} from 'react-router'

function Record() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const { recordId } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

const navigate=useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/records/getCollectionFromDB`)
      .then((res) => res.json())
      .then((data) => {
        const foundRecords = data.data.filter(
          (r) => r.id === parseInt(recordId),
        );

        if (foundRecords.length > 0) {
          setRecords(foundRecords);
          const initialQuantities = {};
          foundRecords.forEach((_, idx) => {
            initialQuantities[idx] = 1;
          });
          setQuantities(initialQuantities);
        } else {
          setError("Record not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [recordId]);

  const getCondition = (record) => {
    if (!record || !record.notes) {
      return { vinyl: "Not specified", sleeve: "Not specified" };
    }

    const vinylCondition = record.notes.find((n) => n.field_id === 2)?.value;
    const sleeveCondition = record.notes.find((n) => n.field_id === 1)?.value;

    return {
      vinyl: vinylCondition || "Not specified",
      sleeve: sleeveCondition || "Not specified",
    };
  };

  const handleAddToCart = async (record, index) => {
    try {
      if (!userEmail) {
        navigate("/users/login");
        return;
      }

      const cartItem = {
        userEmail,
        instance_id: record.instance_id,
        id: record.id,
        title: record.basic_information.title,
        price: record.price || 15.99,
        quantity: quantities[index] || 1,
        cover_image: record.basic_information.cover_image,
      };

      const response = await api.post("/cart/addToCart", cartItem);

      if (response.data.ok) {
        alert(`Added ${quantities[index]} copy(ies) to cart!`);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="rec-loading">
        <BeatLoader color="var(--accent)" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rec-error">
        <p>{error}</p>
        <Link to="/">Back to Catalogue</Link>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rec-error">
        <p>Record not found</p>
        <Link to="/">Back to Catalogue</Link>
      </div>
    );
  }

  const basicInfo = records[0].basic_information;

  return (
    <div className="rec-page">
      <div className="rec-layout">
        <div className="rec-cover">
          <img src={basicInfo.cover_image} alt={basicInfo.title} />
        </div>

        <div className="rec-details">
          <h1 className="rec-title">{basicInfo.title}</h1>

          <div className="rec-artists">
            {basicInfo.artists?.map((artist, idx) => (
              <span key={idx} className="rec-artist-pill">
                {artist.name}
              </span>
            ))}
          </div>

          <div className="rec-meta">
            <div className="rec-meta-item">
              <span className="rec-meta-label">Year</span>
              <span className="rec-meta-value">{basicInfo.year || "N/A"}</span>
            </div>
            <div className="rec-meta-item">
              <span className="rec-meta-label">Label</span>
              <span className="rec-meta-value">
                {basicInfo.labels?.[0]?.name || "N/A"}
              </span>
            </div>
            <div className="rec-meta-item">
              <span className="rec-meta-label">Format</span>
              <span className="rec-meta-value">
                {basicInfo.formats?.[0]?.name || "N/A"}
                {basicInfo.formats?.[0]?.descriptions &&
                  ` — ${basicInfo.formats[0].descriptions.join(", ")}`}
              </span>
            </div>
          </div>

          <div className="rec-tags">
            {basicInfo.genres?.map((g, i) => (
              <span key={i} className="rec-tag">
                {g}
              </span>
            ))}
            {basicInfo.styles?.map((s, i) => (
              <span key={i} className="rec-tag muted">
                {s}
              </span>
            ))}
          </div>

          <div className="rec-copies">
            <h3 className="rec-copies-heading">
              Available Copies ({records.length})
            </h3>
            {records.map((record, index) => {
              const condition = getCondition(record);
              return (
                <div key={record.instance_id} className="rec-copy">
                  <div className="rec-copy-header">
                    <h4>Copy #{index + 1}</h4>
                    <span className="rec-copy-date">
                      Added {new Date(record.date_added).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="rec-conditions">
                    <span className="rec-condition-pill">
                      Vinyl: {condition.vinyl}
                    </span>
                    <span className="rec-condition-pill">
                      Sleeve: {condition.sleeve}
                    </span>
                  </div>

                  <div className="rec-purchase">
                    <span className="rec-price">${record.price || 15.99}</span>
                    <div className="rec-qty">
                      <label htmlFor={`qty-${index}`}>Qty</label>
                      <input
                        type="number"
                        id={`qty-${index}`}
                        min="1"
                        value={quantities[index] || 1}
                        onChange={(e) => {
                          const q = { ...quantities };
                          q[index] = parseInt(e.target.value) || 1;
                          setQuantities(q);
                        }}
                      />
                    </div>
                    <button
                      className="rec-add-btn"
                      onClick={() => handleAddToCart(record, index)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
