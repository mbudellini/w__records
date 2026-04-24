import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

function Catalogue() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  // Fetch records dal backend
  useEffect(() => {
    fetch("http://localhost:4444/records/getCollectionFromDB")
      .then((res) => res.json())
      .then((data) => {
        // Deduplica per ID e salva
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

  // Filtra e ordina in base ai query params
  useEffect(() => {
    let results = [...records];
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const sortOrder = searchParams.get("sort") || "alphabetical";

    // FILTRO: Ricerca per titolo o artista
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

    // ORDINAMENTO
    switch (sortOrder) {
      case "alphabetical":
        results.sort((a, b) =>
          (a.basic_information.title || "").localeCompare(
            b.basic_information.title || "",
          ),
        );
        break;
      case "reverse":
        results.sort((a, b) =>
          (b.basic_information.title || "").localeCompare(
            a.basic_information.title || "",
          ),
        );
        break;
      case "newest":
        results.sort(
          (a, b) =>
            (b.basic_information.year || 0) - (a.basic_information.year || 0),
        );
        break;
      case "oldest":
        results.sort(
          (a, b) =>
            (a.basic_information.year || 0) - (b.basic_information.year || 0),
        );
        break;
      default:
        break;
    }

    setFilteredRecords(results);
  }, [records, searchParams]);

  return (
    <div className="lexend-exa">
      {loading && (
        <div className="centerWithinMain">
          <BeatLoader />
        </div>
      )}
      {error && <p>Error: {error}</p>}

      {searchParams.get("search") && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fff3cd",
            margin: "20px",
          }}
        >
          <p>
            Showing <strong>{filteredRecords.length}</strong> results for "
            <strong>{searchParams.get("search")}</strong>"
          </p>
        </div>
      )}

      {!loading && filteredRecords.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>No records found. Try a different search.</p>
        </div>
      )}

      <div className="gridRecordPage">
        {filteredRecords.map((record) => (
          <Link
            to={`/record/${record.id}`}
            className="record-card-link record-card orangeBorder"
            key={record._id}
          >
            {record.basic_information.cover_image !== "" ? (
              <img
                src={record.basic_information.cover_image}
                alt={record.basic_information.title}
              />
            ) : (
              <img
                src={
                  "https://img.freepik.com/premium-vector/image-unavailable-icon_192037-900.jpg"
                }
              />
            )}
            <div className="titleandYear">
              <p>{record.basic_information.title}</p>
              <p>
                {record.basic_information.artists?.[0]?.name}{" "}
                {record.basic_information.artists?.[1]?.name}{" "}
              </p>
              {record.basic_information.year !== 0 ? (
                <p style={{ fontSize: "12px", color: "#666" }}>
                  {record.basic_information.year}
                </p>
              ) : (
                <p style={{ fontSize: "12px", color: "#666" }}>
                  Year not Available
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
