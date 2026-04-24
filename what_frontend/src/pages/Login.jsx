import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const buttonClick = async () => {
    if (!email || !password) {
      console.log("Some data is missing");
      return;
    }
    try {
      let result = await axios.post("http://localhost:4444/users/login", {
        email,
        password,
      });
      if (result.data.ok) {
        console.log("Login response:", result.data); // <-- AGGIUNGI QUESTA RIGA
        console.log("Email from response:", result.data.email); // <-- E QUESTA

        // Salva il token e l'email nel localStorage
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userEmail", result.data.email);
        login(result.data.token);
        navigate("/");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="centerWithinMain orangeBorder">
      <div>
        <p>email</p>
        <input type="email" onChange={handleEmail}></input>
        <p>password</p>
        <input type="password" onChange={handlePassword}></input>
        <p></p>
        <button onClick={buttonClick}>Login</button>
      </div>
    </div>
  );
}

export default Login;
