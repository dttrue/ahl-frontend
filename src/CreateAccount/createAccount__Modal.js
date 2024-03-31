import React, { useState } from 'react';
import './createAccount__Modal.css'
import { Link } from 'react-router-dom';


function CreateAccountModal({onClose, openSignIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  
  const createAccountSuccess= (e) => {
   onClose()

  }

  

  return (
    <div className= 'custom-modal open'>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-welcome">Welcome to AHS Locator</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>
            <form onSubmit={createAccountSuccess}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className='password__validation'>
          <p>At least 8 characters</p>
          <p>Mix of letters and numbers</p>
          <p>At least 1 special character</p>
          <p>At least 1 lowercase letter and 1 uppercase letter</p>
          </div>
          <Link to='/profile'>
          <button type="submit" >Submit</button>
          </Link>
          <p>Already have an account? <span onClick={openSignIn} className='signin-btn__link'>Sign in.</span></p>
        </form>
      </div>

    </div>
  )
}

export default CreateAccountModal;