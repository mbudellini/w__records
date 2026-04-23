import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router'

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };
  const navigate =useNavigate()
  const buttonClick = async () => {
    if (!email || !password || !confirm) {
      console.log("Some data is missing");
    }
    if (password !== confirm) {
      console.log("passwords dont match");
    }
    try {
      let result = await axios.post("http://localhost:4444/users/register", {
        email,
        password,
        password2: confirm,
      })
      if(result.data.ok){
        navigate('/users/login')

      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="centerWithinMain">
        <div>
      <p>email</p>
      <input type="email" onChange={handleEmail}></input>
      <p>password</p>
      <input type="password" onChange={handlePassword}></input>
      <p>confirm password</p>
      <input type="password" onChange={handleConfirm}></input>
      <p></p>
      <button onClick={buttonClick}>Register</button>
      </div>
    </div>
  );
}

export default Register;
