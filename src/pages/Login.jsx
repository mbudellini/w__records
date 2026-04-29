import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/config.js";
import { useNavigate } from "react-router";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      let result = await api.post("/users/login", { email, password });
      if (result.data.ok) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userEmail", result.data.email);
        login(result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="auth-submit">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/users/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
