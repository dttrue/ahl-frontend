import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase"

const SignUp = ()  => {
  const [email, setEmail] = useState(""); //sets email default empty string
  const [password, setPassword] = useState(""); //sets email default empty string

  const signUp = (e) => {
  e.preventDefault();

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  console.log(userCredential)  
}).catch((error) => {
    console.log(error)
})

  }
  return (
    <div className="sign-up-container">
      <form onSubmit={signUp} >
        <h1>Create Account</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
