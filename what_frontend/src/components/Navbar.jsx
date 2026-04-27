import { Link, useNavigate, useSearchParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const isAdmin = user?.isAdmin;
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.append("search", searchInput);
    if (sortOrder) params.append("sort", sortOrder);
    navigate(`/?${params.toString()}`);
    setMobileMenuOpen(false);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    navigate(`/?${params.toString()}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Catalogue</Link>
          <span className="navbar-link muted">About</span>
          <a
            href="https://www.discogs.com/user/disqueria_what"
            className="navbar-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discogs
          </a>
        </div>

        <div className="navbar-search">
          <form onSubmit={handleSearch} className="navbar-search-form">
            <input
              type="text"
              placeholder="Search records..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-btn">Search</button>
          </form>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="navbar-sort-select"
          >
            <option value="alphabetical">A-Z</option>
            <option value="reverse">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            Cart
          </Link>

          {isLoggedIn ? (
            <div className="navbar-user" ref={dropdownRef}>
              <button
                className="navbar-user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {user?.email}
              </button>
              {userMenuOpen && (
                <div className="navbar-dropdown">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="navbar-dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    className="navbar-dropdown-item"
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/users/login" className="navbar-auth-link">Login</Link>
              <Link to="/users/register" className="navbar-auth-btn">Register</Link>
            </div>
          )}
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="navbar-mobile">
          <Link to="/" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Catalogue</Link>
          <a
            href="https://www.discogs.com/user/disqueria_what"
            className="navbar-mobile-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discogs
          </a>
          <Link to="/cart" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
          <div className="navbar-mobile-search">
            <form onSubmit={handleSearch} className="navbar-search-form">
              <input
                type="text"
                placeholder="Search records..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="navbar-search-input"
              />
              <button type="submit" className="navbar-search-btn">Search</button>
            </form>
          </div>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="navbar-sort-select mobile"
          >
            <option value="alphabetical">A-Z</option>
            <option value="reverse">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <div className="navbar-mobile-auth">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <button className="navbar-mobile-link" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/users/login" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/users/register" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
