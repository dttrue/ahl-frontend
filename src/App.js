import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignInModal from "./Signin/signin__Modal";
import CreateAccountModal from "./CreateAccount/createAccount__Modal";
import Wishlist from "./UserAuth/Wishlist";
import Homepage from "./Homepage/homepage";
import ProfilePage from "./Profile/profile";
import ApartmentNameList from "./Housing/apartmentNameList";
import HousingDetails from "./Housing/housingDetails"; 


function App() {
  return (
    <Router>
      <div className="container">
        <header className="homepage-header" >
          <h1>Header</h1>
          <Link to="/wishlist" className="wishlist-text">Wishlist</Link>
        </header>
        
          
          <Link to="/signin">Sign In</Link>{" "}
          {/* Link to SignIn component for login*/}
          <Link to="/signup">Create Account</Link>{" "}
          {/* Link to SignUp component for login*/}
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/" element={<Homepage />} />{" "}
            {/* Replace with your homepage content */}
            <Route path="/apartmentNameList" element={<ApartmentNameList />} />{" "}
            <Route path="/housingDetails" element={<HousingDetails />} />{" "}
            <Route path="/signin" element={<SignInModal />} />{" "}
            {/* SignIn component for login */}
            <Route path="/signup" element={<CreateAccountModal />} />{" "}
            {/* SignIn component for login */}
            <Route path='/profile' element={<ProfilePage/> } />
          </Routes>
          
        
      </div>
    </Router>
  );
}

/* 
App.js is a file for setting up routes and links to each individual component on the homepage. the problem is the route for ApartmentNameList

entering information on the form(Line 78) in the "Homepage.js" file and clicking submit "Search for Apartments" will fetch API and generate data based
on what info was entered. API fetch function is in another file called housinginfoAPIfetch

clicking search for apartments should navigate to a newpage "HousingList.js" that displays all the data, but currently does not.

in "HousingList.js" this code takes our search results and maps through the data displaying each apartment by its name. we passed searchResult
as a prop to this function to use it
*/


export default App;
