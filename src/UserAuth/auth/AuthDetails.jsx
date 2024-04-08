import { onAuthStateChanged, signOut } from "firebase/auth";
import './AuthDetails.css'
// import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import auth from "../../firebase";


export const userSignOut = () => {
  return signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    })
    .catch((error) => console.log(error));
};


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [errorPopup, setErrorPopup] = useState(false)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setErrorPopup(true)
      } else {
        setAuthUser(null);
        setErrorPopup(false)
      }
    });
    return () => {
      listen();
    };
  }, []); //comes in effect when the user signs in or out



  const closeErrorPopup = () => {
    setErrorPopup(false); // Close the popup when close button is clicked
  };  


  return (
    <div>
    {authUser && errorPopup ? (
      <div className="popup">
        <div className="popup-content">
        <p>{`Signed In as ${authUser.email}`}</p>
        <button className="error-close-button" onClick={closeErrorPopup}>x</button>
      </div>
      </div>
    ) : null}
  </div>
  )
};

export default AuthDetails;
