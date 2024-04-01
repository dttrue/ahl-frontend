import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState(""); //sets email default empty string
  const [password, setPassword] = useState(""); //sets email default empty string
  const [passwordError, setPasswordError] = useState(""); //checks for state of password error

  const validatePassword = (password) => {
    //validates password length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return; // Prevent sign-up if password is invalid
    }
    // Password complexity validation (uppercase, lowercase, numbers, and special characters)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );

    let missingRequirements = [];

    if (!hasUppercase) {
      missingRequirements.push("uppercase letter");
    }

    //error message based on missing requirements
    let errorMessage = "";
    if (missingRequirements.length === 1) {
      errorMessage = `Password must contain at least one ${missingRequirements[0]}.`;
      // } else if (missingRequirements.length > 1) {
      //   const requirementsList = missingRequirements.join(", ");
      //   errorMessage = `Password must contain a mix of ${requirementsList}.`;
      // }

      return errorMessage;
    }
  };

  const signUp = (e) => {
    e.preventDefault();

 // Ensure password is not an empty string
 if (!password) {
  setPasswordError("Password cannot be empty.");
  return;
}

    const errorMessage = validatePassword(password);

    if (errorMessage) {
      setPasswordError(errorMessage);
      return;
    }

    // if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChars ) {
    //   setPasswordError("Password must contain a mix of uppercase, lowercase letters, numbers, and special characters.");
    //   return;
    // }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        setPassword(""); // Clear password field after successful sign-up

        setPasswordError(""); // Clear password error state
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
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
        {passwordError && <p className="error">{passwordError}</p>}{" "}
        {/*display error message if needed */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
