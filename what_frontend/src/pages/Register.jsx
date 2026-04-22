import { useState } from "react";

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
  return (
    <div className="sideMargin2">
      <p>email</p>
      <input type="email" onChange={handleEmail}></input>
      <p>password</p>
      <input type="password" onChange={handlePassword}></input>
      <p>confirm password</p>
      <input type="password" onChange={handleConfirm}></input>
    </div>
  );
}

export default Register;
