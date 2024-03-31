import './profile.css';
import { MdAccountCircle } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import MenuSimple from './profileDropdown';

function ProfilePage() {
  
    return (
        <div className="container">
            <header>
                    <div className="ahs__locator">AHS Locator</div>
                    <div className='search__container'>
                        <input type="text" className="search__bar" placeholder="Enter a neighborhood or ZIP code" />
                        <FaSearch size={20} className="search__icon" />
                    </div>
                    <div className='header-right'>
                    <span className="link">Help</span>
                    <span>
                    <MdAccountCircle size={24} />
                    </span>
                    </div>
            </header>
            <div className="body">
                <MenuSimple />
            </div>
        </div>
    );
}

export default ProfilePage;