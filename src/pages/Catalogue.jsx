import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { API_BASE } from "../api/config.js";
import "./Catalogue.css";

function Catalogue() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch(`${API_BASE}/records/getCollectionFromDB`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueData = [
          ...new Map((data.data || []).map((r) => [r.id, r])).values(),
        ];
        setRecords(uniqueData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = [...records];
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const sortOrder = searchParams.get("sort") || "alphabetical";

    if (searchQuery) {
      results = results.filter((record) => {
        const title = record.basic_information.title?.toLowerCase() || "";
        const artist1 =
          record.basic_information.artists?.[0]?.name?.toLowerCase() || "";
        const artist2 =
          record.basic_information.artists?.[1]?.name?.toLowerCase() || "";
        return (
          title.includes(searchQuery) ||
          artist1.includes(searchQuery) ||
          artist2.includes(searchQuery)
        );
      });
    }

    switch (sortOrder) {
      case "alphabetical":
        results.sort((a, b) =>
          (a.basic_information.title || "").localeCompare(
            b.basic_information.title || ""
          )
        );
        break;
      case "reverse":
        results.sort((a, b) =>
          (b.basic_information.title || "").localeCompare(
            a.basic_information.title || ""
          )
        );
        break;
      case "newest":
        results.sort(
          (a, b) =>
            (b.basic_information.year || 0) - (a.basic_information.year || 0)
        );
        break;
      case "oldest":
        results.sort(
          (a, b) =>
            (a.basic_information.year || 0) - (b.basic_information.year || 0)
        );
        break;
      default:
        break;
    }

    setFilteredRecords(results);
  }, [records, searchParams]);

  return (
    <div className="catalogue">
      {loading && (
        <div className="catalogue-loading">
          <BeatLoader color="var(--accent)" />
        </div>
      )}

      {error && (
        <div className="catalogue-error">Error: {error}</div>
      )}

      {searchParams.get("search") && (
        <div className="catalogue-banner">
          Showing <strong>{filteredRecords.length}</strong> results for "
          <strong>{searchParams.get("search")}</strong>"
        </div>
      )}

      {!loading && filteredRecords.length === 0 && (
        <div className="catalogue-empty">
          <p>No records found. Try a different search.</p>
        </div>
      )}

      <div className="catalogue-grid">
        {filteredRecords.map((record) => (
          <Link
            to={`/record/${record.id}`}
            className="cat-card"
            key={record._id}
          >
            <div className="cat-card-img">
              {record.basic_information.cover_image !== "" ? (
                <img
                  src={record.basic_information.cover_image}
                  alt={record.basic_information.title}
                />
              ) : (
                <img
                  src="https://img.freepik.com/premium-vector/image-unavailable-icon_192037-900.jpg"
                  alt="Unavailable"
                />
              )}
            </div>
            <div className="cat-card-body">
              <p className="cat-card-title">
                {record.basic_information.title}
              </p>
              <p className="cat-card-artist">
                {record.basic_information.artists?.[0]?.name}
                {record.basic_information.artists?.[1]?.name &&
                  ` / ${record.basic_information.artists[1].name}`}
              </p>
              <p className="cat-card-year">
                {record.basic_information.year !== 0
                  ? record.basic_information.year
                  : "Year N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
