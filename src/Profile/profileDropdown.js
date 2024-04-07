import React from "react";
import './profileDropdown.css'
import { Link } from "react-router-dom";
import { userSignOut } from "../User Auth/auth/AuthDetails";


const DropDownProfile = () => {

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                <li>
                    <Link to='/savedhomes'>Saved Homes</Link>
                </li>
                <li onClick={userSignOut}>Sign Out</li>
            </ul>
        </div>
    )
}

export default DropDownProfile




