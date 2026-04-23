import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login({login}) {
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
    if (!email || !password || !confirm) {
      console.log("Some data is missing");
    }
    try {
      let result = await axios.post("http://localhost:4444/users/login", {
        email,
        password,
      });
      if (result.data.ok) {
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
