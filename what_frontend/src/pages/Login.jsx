import { useState } from "react";


function Login() {
    const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="sideMargin2">
      <p>email</p>
      <input type="email" onChange={handleEmail}></input>
      <p>password</p>
      <input type="password" onChange={handlePassword}></input>
    </div>
  );
}

export default Login;
