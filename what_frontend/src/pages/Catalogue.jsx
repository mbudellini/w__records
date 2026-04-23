import { Link } from "react-router";
import { useState, useEffect } from "react";
import {BeatLoader} from 'react-spinners'
function Catalogue() {
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
    <div className="lexend-exa">
      {loading && <div className="center">
        <BeatLoader />
        </div>}
      {error && <p>Error: {error}</p>}
      <div className="gridRecordPage">
        {records.map((record) => (
          <div className="record-card" key={record._id}>
            <Link to={`/record/${record.id}`} className="record-card-link">
              <img
                src={record.basic_information.cover_image}
                alt={record.basic_information.title}
              />
              <div className="titleAndYear">
                <h5>{record.basic_information.title}</h5>
                <p>{record.basic_information.year}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Catalogue;
