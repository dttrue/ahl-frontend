import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import Wishlist from "./components/Wishlist";

function App() {
  return (
    <Router>
      <div className="container">
        <header className="homepage__header" >
          <h1>Header</h1>
          <span className="wishlist-text">Wishlist</span>
        </header>
        <div className="homepage__body">
          <h1 className="homepage__title">Affordable Homes</h1>
          <input
            type="text"
            className="search__bar"
            placeholder="Enter a neighborhood or ZIP code"
          />
          <Link to="/signin">Sign In</Link>{" "}
          {/* Link to SignIn component for login*/}
          <Link to="/signup">Create Account</Link>{" "}
          {/* Link to SignUp component for login*/}
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/" element={<div>Home Page Content</div>} />{" "}
            {/* Replace with your homepage content */}
            <Route path="/signin" element={<SignIn />} />{" "}
            {/* SignIn component for login */}
            <Route path="/signup" element={<SignUp />} />{" "}
            {/* SignIn component for login */}
          </Routes>
          <AuthDetails /> {/* AuthDetails component for login */}
        </div>
      </div>
    </Router>
  );
}

export default App;
