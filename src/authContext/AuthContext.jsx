
import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup function
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create useAuth hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };