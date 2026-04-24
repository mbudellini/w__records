import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Record from "./pages/Record.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./elements/Navbar.jsx";
import { useState, useEffect } from "react";
import * as jose from "Jose";
import axios from "axios";
import Cart from "./pages/Cart.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  console.log(`logged:${isLoggedIn}, user:${user},`);

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(
            `http://localhost:4444/users/verify_token`,
          );
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      email: decodedToken.userEmail,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div className="lexend-exa">
        <header className="header">
          <h1 className="sideMargin2"> Disqueria What?</h1>
        </header>
        <main>
          <Navbar isLoggedIn={isLoggedIn} user={user} />
          <Routes>
            <Route path="/" element={<Catalogue />} />
            <Route
              path="/record/:recordId"
              element={<Record userEmail={user?.email} />}
            />
            <Route path="/users/login" element={<Login login={login} />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/cart" element={<Cart userEmail={user?.email} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
