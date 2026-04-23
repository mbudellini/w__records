import { Link } from "react-router";
import "../App.css";
function Navbar({isLoggedIn, user}) {
  return (
    <nav className="flex nav spaceBetween height7">
      <div className="flex centered sideMargin2">
        <Link to="/">
          <p>Catalogue</p>
        </Link>
        <p className="sideMargin2">About</p>
        <p>Discogs</p>
      </div>
      <div className="flex leftMarginAuto centered sideMargin2">
        <p>⌕</p>
        <p className="sideMargin2">🛒</p>
      </div>
      {isLoggedIn ? (
        <p className="flex centered ">`Welcome Back {`${user?.email}`}</p>
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
