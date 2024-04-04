import { onAuthStateChanged, signOut } from "firebase/auth";
import './AuthDetails.css'

import React, { useEffect, useState } from "react";
import auth from "../../firebase";

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

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  }; //signs out the usery


  const closeErrorPopup = () => {
    setErrorPopup(false); // Close the popup when close button is clicked
  };  


  return (
    <div>
    {authUser && errorPopup ? (
      <div className="popup">
        <div className="popup-content">
        <p>{`Signed In as ${authUser.email}`}</p>
        {/* <button onClick={userSignOut}>Sign Out</button> */}
        <button className="error-close-button" onClick={closeErrorPopup}>x</button>
      </div>
      </div>
    ) : (
      <p>Signed Out</p>
    )}
  </div>
  )
};

export default AuthDetails;
