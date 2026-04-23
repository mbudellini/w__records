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

const uniqueRecords = [...new Map(records.map(r => [r.id, r])).values()];

  return (
    <div className="lexend-exa">
      {loading && <div className="centerWithinMain">
        <BeatLoader />
        </div>}
      {error && <p>Error: {error}</p>}
      <div className="gridRecordPage">
        {uniqueRecords.map((record) => (
            <Link to={`/record/${record.id}`} className="record-card-link record-card orangeBorder" key={record._id}>
              <img
                src={record.basic_information.cover_image}
                alt={record.basic_information.title}
              />
              <div className="titleandYear">
                <h5>{record.basic_information.title}</h5>
                <p>{record.basic_information.year}</p>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}
export default Catalogue;
