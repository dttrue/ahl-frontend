import React, { useState } from 'react';
import './signin__Modal.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase';
import { useNavigate } from 'react-router-dom';


function SignInModal({ isOpen, onClose, openCreateAccount }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  let navigate = useNavigate()
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/profile')
        console.log(userCredential)
      }).catch((error) => {
        console.log(error)
        // setError('Invalid email or password.');
      })
  } /*signs in the user*/

  const switchToCreateAccount = () => {
    openCreateAccount()
  }

  return (
    <div className={`custom-modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-welcome">Welcome to AHS Locator</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>

        <form onSubmit={signIn}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {/* <Link to='/profile'> */}
          <button type="submit">Sign In</button>
          {/* </Link> */}
          <p>Don't have an account yet? <span onClick={switchToCreateAccount} className='create-account__link'>Create one.</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignInModal;