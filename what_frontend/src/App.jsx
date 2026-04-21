import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import "./App.css";
import Record from "./pages/record.jsx";

function Home() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4444/records/getCollectionFromDB")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="playfair-display">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="gridRecordPage">
        {records.map((record) => (
          <div className="record-card">
            <Link
              key={record._id}
              to={`/record/${record.id}`}
              className="record-card-link"
            >
              <img
                src={record.basic_information.cover_image}
                alt={record.basic_information.title}
              />
              <h3>{record.basic_information.title}</h3>
              <p>{record.basic_information.year}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="playfair-display">
        <header className="height3">
          <h2> Disqueria What?</h2>
        </header>
        <nav className="flex spaceBetween height7">
          <div className="flex centered sideMargin5">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Catalogue</p>
            </Link>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/record/:recordId" element={<Record />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
