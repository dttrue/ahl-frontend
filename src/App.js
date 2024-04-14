import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../src/css/App.css";
import SignInModal from "./auth/SignIn";
import CreateAccountModal from "./auth/SignUp";
import { AuthProvider } from './authContext/AuthContext';
import Wishlist from "./components/Wishlist";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/Profile";
import ApartmentNameList from "./components/ApartmentNameList";
import HousingDetails from "./components/HousingDetails"; 


function App() {

  const [hasCurrentUser, setHasCurrentUser] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  return (
    <AuthProvider>
    <Router>
      <div className="container">
          <Header 
            hasCurrentUser={false} 
            openSignInModal={openSignInModal} 
            closeSignInModal={closeSignInModal} 
            openCreateAccountModal={openCreateAccountModal} 
            closeCreateAccountModal ={closeCreateAccountModal} 
          />
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/" element={<Homepage searchResult={searchResult} setSearchResult={setSearchResult} />} />{" "}
            {/* Replace with your homepage content */}
            <Route path="/apartmentNameList" element={<ApartmentNameList searchResult={searchResult} />} />{" "}
            <Route path="/housingDetails" element={<HousingDetails />} />{" "}
            <Route path="/signin" element={<SignIn/>} />{" "}
            {/* SignIn component for login */}
            <Route path="/signup" element={< CreateAccountModal />} />{" "}
            {/* SignIn component for login */}
            <Route path='/profile' element={<ProfilePage/> } />
          </Routes>
          
        
      </div>
    </Router>
     </AuthProvider>
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
