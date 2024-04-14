import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaBars, FaSearch } from 'react-icons/fa';
import "../css/Header.css";

function Header({ hasCurrentUser, openSignInModal, openCreateAccountModal }) {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="homepage-header">
      <div className="header-content">
        <div className="flex-1 vcenter dropdown-container">
        <button className="hamburger" onClick={toggleNav}>
          <FaBars />
        </button>
        {isNavVisible && (
        <nav className="navbar header-dropdown">
            <div className="link-container">
            <span to="/signin" className="link" onClick={openSignInModal}>
            Sign In
          </span>
          </div>
          <div className="link-container">
          <span className="link">Help</span>
          </div>
        </nav>
      )}
        </div>
        <Link to="/">
          <h1 className="header-homepage-link">AHL</h1>
        </Link>
        <div className="flex-1">
        {hasCurrentUser ? (
          <Link to="/wishlist" className="wishlist-text">
            Wishlist
          </Link>
        ) : (
          <div>
            {/* <Link to="/signin">Sign In</Link>{" "}
            <Link to="/signup">Create Account</Link>{" "} */}
          </div>
        )}
        </div>
      </div>
    </header>
  );
}

export { Header };
