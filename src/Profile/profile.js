import './profile.css';
import { MdAccountCircle } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import DropDownProfile from './profileDropdown';


function ProfilePage() {
    const [showDropdown, setShowDropdown] = useState(false);

    



    return (
        <div className="profile-container">
            <header>
                <div className="profile-ahs-locator">AHS Locator</div>
                <div className='profile-search-container'>
                    <input type="text" className="profile-search-bar" placeholder="Enter a neighborhood or ZIP code" />
                    <FaSearch size={18} className="profile-search-icon" />
                </div>
                <span className="link">Help</span>
                <span onClick={() => setShowDropdown(!showDropdown)}>
                    <MdAccountCircle size={33} />
                </span>
                {showDropdown && <DropDownProfile />}

            </header>
            <div className="body">
                {/* get api */}
            </div>
        </div>
    );
}

export default ProfilePage;