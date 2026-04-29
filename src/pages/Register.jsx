import { useState } from "react";
import { Link } from "react-router";
import api from "../api/config.js";
import { useNavigate } from "react-router";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) return;
    if (password !== confirm) return;
    try {
      let result = await api.post("/users/register", {
        email,
        password,
        password2: confirm,
      });
      if (result.data.ok) {
        navigate("/users/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
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
              placeholder="Create a password"
            />
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="auth-submit">Register</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/users/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
