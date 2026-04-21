import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex spaceBetween height7">
      <div className="flex centered sideMargin2">
        <Link to="/">
          <p>Catalogue</p>
        </Link>
        <p className="sideMargin2">About</p>
        <p>Discogs</p>
      </div>
      <div className="flex centered sideMargin2">
        <p>⌕</p>
        <p className="sideMargin2">🛒</p>
        <p>Login</p>
      </div>
    </nav>
  );
}
export default Navbar;
