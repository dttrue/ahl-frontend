import './homepage.css';
import {FaSearch} from 'react-icons/fa'
import React, { useState } from 'react';
import SignInModal from '../Signin/signin__Modal';
import CreateAccountModal from '../CreateAccount/createAccount__Modal';




function Homepage() {
    const [signInModalIsOpen, setSignInModalIsOpen] = useState(false)
    const [createAccountModalIsOpen, setCreateAccountModalIsOpen] = useState(false);

    const openSignInModal = () => {
      setSignInModalIsOpen(true);
        setCreateAccountModalIsOpen(false)
      };
    
      const closeSignInModal = () => {
        setSignInModalIsOpen(false);
      };
    
      const openCreateAccountModal = () => {
        setCreateAccountModalIsOpen(true);
        setSignInModalIsOpen(false)
      };
    
      const closeCreateAccountModal = () => {
        setCreateAccountModalIsOpen(false);
      };

  return (
    <div className="container">
      <header className="homepage-header">
      <span className="link link1">Buy</span>
    <span className="link">Rent</span>
    <span className="link">Agent Finder</span>
      <div className="ahs-locator">AHS Locator</div>
    
    <span className="link">Help</span>
    <span to='/signin' className="link" onClick={openSignInModal}>Sign In</span>
    
      </header>
      <div className="homepage-body">
      <h1 className='homepage-title'>Affordable Homes.</h1> 
      <div className='search-container'>
      <input type="text" className="search-bar" placeholder="Enter a neighborhood or ZIP code" />
      <FaSearch size={20} className="search-icon" />
      </div>
      </div>
      {createAccountModalIsOpen && <CreateAccountModal onClose={closeCreateAccountModal} openSignIn={openSignInModal} />}
      {signInModalIsOpen && <SignInModal isOpen={signInModalIsOpen} onClose={closeSignInModal} openCreateAccount={openCreateAccountModal}/>}
    </div>
   
  );
}


export default Homepage;
