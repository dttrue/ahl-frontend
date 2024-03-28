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
        ></input>
        <input
          type="password"
          placeholder="Enter your email"
          value={password}
        ></input>
      </form>
    </div>
  );
};

export default SignIn;
