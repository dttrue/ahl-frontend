import './homepage.css';
import {FaSearch} from 'react-icons/fa'
import React, { useState } from 'react';
import SignInModal from '../Signin/signin__Modal';
import CreateAccountModal from '../CreateAccount/createAccount__Modal';




function Homepage() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [createAccountModalIsOpen, setCreateAccountModalIsOpen] = useState(false);

    const openSignInModal = () => {
        setModalIsOpen(true);
        setCreateAccountModalIsOpen(false)
      };
    
      const closeSignInModal = () => {
        setModalIsOpen(false);
      };
    
      const openCreateAccountModal = () => {
        setCreateAccountModalIsOpen(true);
      };
    
      const closeCreateAccountModal = () => {
        setCreateAccountModalIsOpen(false);
      };

  return (
    <div className="container">
      <header className="homepage__header">
      <span className="link link1">Buy</span>
    <span className="link">Rent</span>
    <span className="link ">Agent Finder</span>
      <div className="ahs__locator">AHS Locator</div>
    
    <span className="link">Help</span>
    <span to='/signin' className="link" onClick={openSignInModal}>Sign In</span>
    
      </header>
      <div className="homepage__body">
      <h1 className='homepage__title'>Affordable Homes.</h1> 
      <div className='search__container'>
      <input type="text" className="search__bar" placeholder="Enter a neighborhood or ZIP code" />
      <FaSearch size={20} className="search__icon" />
      </div>
      </div>
      {createAccountModalIsOpen && <CreateAccountModal onClose={closeCreateAccountModal} openSignIn={openSignInModal} />}
      {modalIsOpen && <SignInModal isOpen={modalIsOpen} onClose={closeSignInModal} openCreateAccount={openCreateAccountModal}/>}
    </div>
   
  );
}


export default Homepage;
