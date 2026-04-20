import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch records from your backend API
    fetch("http://localhost:4444/records/getCollectionFromDB")
      .then(res => res.json())
      .then(data => {
        setRecords(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header className="height3">
        <h2> Disqueria What?</h2>
      </header>
      <nav className="flex spaceBetween height7">
        <div className="flex centered sideMargin5">
          <p>Catalogue</p>
          <p className="sideMargin5">About</p>
          <p>Discogs</p>
        </div>
        <div className="flex centered sideMargin5">
          <p>⌕</p>
          <p className="sideMargin5">🛒</p>
          <p>Login</p>
        </div>
      </nav>
      <main>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div className="gridRecordPage">
          {records.map((record) => (
            <div key={record._id} className="record-card">
              <img src={record.basic_information.cover_image} alt={record.basic_information.title} />
              <h3>{record.basic_information.title}</h3>
              <p>{record.basic_information.year}</p>
            </div>
          ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
