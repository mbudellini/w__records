import { Link, useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import "../App.css";

function Navbar({ isLoggedIn, user }) {
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.append("search", searchInput);
    if (sortOrder) params.append("sort", sortOrder);
    navigate(`/?${params.toString()}`);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    navigate(`/?${params.toString()}`);
  };

  return (
    <nav className="flex nav spaceBetween height7">
      <div className="flex centered sideMargin2">
        <Link to="/">
          <p>Catalogue</p>
        </Link>
        <p className="sideMargin2">About</p>
        <Link to="https://www.discogs.com/user/disqueria_what">
          <p>Discogs</p>
        </Link>
      </div>
      <div className="flex leftMarginAuto centered sideMargin2">
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ⌕
          </button>
        </form>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          <option value="alphabetical">A-Z</option>
          <option value="reverse">Z-A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <Link to="/cart" className="sideMargin2">
          🛒
        </Link>
      </div>
      {isLoggedIn ? (
        <p className="flex centered ">Welcome back {`${user?.email}`}!</p>
      ) : (
        <p className="flex centered">You are not logged in</p>
      )}
      <div className="flex centered spaceBetween sideMargin2">
        <Link to="/users/login">Login</Link>
        <p className="sideMargin2">or</p>
        <Link to="/users/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
