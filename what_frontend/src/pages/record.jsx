import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/record.css";

function Record() {
  const { recordId } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Fetch all records and find all copies with matching ID
    fetch(`http://localhost:4444/records/getCollectionFromDB`)
      .then((res) => res.json())
      .then((data) => {
        console.log("All records from DB:", data.data);
        console.log("Looking for recordId:", recordId);
        
        // Find ALL copies of this release (same id)
        const foundRecords = data.data.filter(
          (r) => r.id === parseInt(recordId)
        );
        
        console.log("Found records:", foundRecords);
        
        if (foundRecords.length > 0) {
          setRecords(foundRecords);
          // Initialize quantities for each copy
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

    // Notes have field_id: 1 = sleeve condition, 2 = vinyl condition
    const vinylCondition = record.notes.find((n) => n.field_id === 2)?.value;
    const sleeveCondition = record.notes.find((n) => n.field_id === 1)?.value;

    return {
      vinyl: vinylCondition || "Not specified",
      sleeve: sleeveCondition || "Not specified",
    };
  };

  const handleAddToCart = (record, index) => {
    const cartItem = {
      instance_id: record.instance_id,
      id: record.id,
      title: record.basic_information.title,
      price: record.price || 15.99,
      quantity: quantities[index] || 1,
      image: record.basic_information.cover_image,
      condition: getCondition(record),
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added ${quantities[index]} copy(ies) to cart!`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (records.length === 0) return <div className="error">Record not found</div>;

  const basicInfo = records[0].basic_information;

  return (
    <div className="record-detail">
      <div className="record-container">
        <div className="record-image">
          <img src={basicInfo.cover_image} alt={basicInfo.title} />
        </div>

        <div className="record-info">
          <h1>{basicInfo.title}</h1>

          <div className="artists">
            {basicInfo.artists &&
              basicInfo.artists.map((artist, idx) => (
                <span key={idx} className="artist">
                  {artist.name}
                </span>
              ))}
          </div>

          <div className="metadata">
            <p>
              <strong>Year:</strong> {basicInfo.year}
            </p>
            <p>
              <strong>Label:</strong> {basicInfo.labels?.[0]?.name}
            </p>
            <p>
              <strong>Format:</strong> {basicInfo.formats?.[0]?.name}{" "}
              {basicInfo.formats?.[0]?.descriptions?.join(", ")}
            </p>
          </div>

          <div className="genres-styles">
            <div>
              <strong>Genres:</strong> {basicInfo.genres?.join(", ") || "N/A"}
            </div>
            <div>
              <strong>Styles:</strong> {basicInfo.styles?.join(", ") || "N/A"}
            </div>
          </div>

          <div className="copies-section">
            <h3>Available Copies ({records.length})</h3>
            {records.map((record, index) => {
              const condition = getCondition(record);
              return (
                <div key={record.instance_id} className="copy-item">
                  <div className="copy-header">
                    <h4>Copy #{index + 1}</h4>
                    <p className="added-date">
                      Added: {new Date(record.date_added).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="condition-section">
                    <h4>Condition</h4>
                    <div className="condition-details">
                      <p>
                        <strong>Vinyl:</strong> {condition.vinyl}
                      </p>
                      <p>
                        <strong>Sleeve:</strong> {condition.sleeve}
                      </p>
                    </div>
                  </div>

                  <div className="copy-purchase">
                    <div className="price">
                      <h3>${record.price || 15.99}</h3>
                    </div>

                    <div className="quantity-selector">
                      <label htmlFor={`quantity-${index}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${index}`}
                        min="1"
                        value={quantities[index] || 1}
                        onChange={(e) => {
                          const newQuantities = { ...quantities };
                          newQuantities[index] = parseInt(e.target.value);
                          setQuantities(newQuantities);
                        }}
                      />
                    </div>

                    <button
                      className="add-to-cart-btn"
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
