import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignInModal from "./Signin/signin__Modal";
import CreateAccountModal from "./CreateAccount/createAccount__Modal";
import Wishlist from "./UserAuth/Wishlist";
import Homepage from "./Homepage/homepage";
import ProfilePage from "./Profile/profile";

function App() {
  return (
    <Router>
      <div className="container">
        <header className="homepage__header" >
          <h1>Header</h1>
          <Link to="/wishlist" className="wishlist-text">Wishlist</Link>
        </header>
        
          
          <Link to="/signin">Sign In</Link>{" "}
          {/* Link to SignIn component for login*/}
          <Link to="/signup">Create Account</Link>{" "}
          {/* Link to SignUp component for login*/}
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/" element={<div>Home Page Content</div>} />{" "}
            {/* Replace with your homepage content */}
            <Route path="/signin" element={<SignInModal />} />{" "}
            {/* SignIn component for login */}
            <Route path="/signup" element={<CreateAccountModal />} />{" "}
            {/* SignIn component for login */}
            <Route path='/profile' element={<ProfilePage/> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
