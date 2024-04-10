import React, { useState } from 'react';
import '../css/CreateAccount.css'
import auth from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function CreateAccountModal({ onClose, openSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(""); //checks for state of password error
  let navigate = useNavigate()

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
    if (!hasLowercase) {
      missingRequirements.push("lowercase letter");
    }
    if (!hasNumbers) {
      missingRequirements.push("number");
    }
    if (!hasSpecialChars) {
      missingRequirements.push("special character");
    }

    //error message based on missing requirements
    let errorMessage = "";
    if (missingRequirements.length === 1) {
      errorMessage = `Password must contain at least one ${missingRequirements[0]}.`;
    } else if (missingRequirements.length > 1) {
      const requirementsList = missingRequirements.join(", ");
      errorMessage = `Password must contain a mix of ${requirementsList}.`;
    }

    return errorMessage;

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
        navigate('/profile')
        console.log(userCredential);

        setPassword(""); // Clear password field after successful sign-up

        setPasswordError(""); // Clear password error state
      })
      .catch((error) => {
        console.log(error);
      });
  };




  // const createAccountSuccess= (e) => {
  //  onClose()

  // }



  return (
    <div className='custom-modal open'>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-welcome">Welcome to AHS Locator</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>
        <form onSubmit={signUp}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='password-validation'>
            <p>At least 8 characters</p>
            <p>Mix of letters and numbers</p>
            <p>At least 1 special character</p>
            <p>At least 1 lowercase letter and 1 uppercase letter</p>
          </div>
          {/* <Link to='/profile'> */}
          <button type="submit" >Submit</button>
          {/* </Link> */}
          {passwordError && <p className="password-error">{passwordError}</p>}{" "}
          {/*display error message if needed */}
          <p>Already have an account? <span onClick={openSignIn} className='signin-btn-link'>Sign in.</span></p>
        </form>
      </div>

    </div>
  )
}

export default CreateAccountModal;