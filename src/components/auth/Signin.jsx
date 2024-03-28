import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState(""); //sets email default empty string
  const [password, setPassword] = useState(""); //sets email default empty string
  return (
    <div className="sign-in-container">
      <form>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default SignIn;
