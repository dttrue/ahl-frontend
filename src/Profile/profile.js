import './profile.css';
import { MdAccountCircle } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import DropDownProfile from './profileDropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ProfilePage() {
    const [input, setInput] = useState("");
    const [inputType, setInputType] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();


    const fetchData = (input, inputType) => {
        const baseUrl = "https://data.cityofnewyork.us/resource/hg8x-zxpr.json";
        let url = "";

        if (inputType === "postcode") {
            url = `${baseUrl}?postcode=${encodeURIComponent(input)}`;
        } else {
            url = `${baseUrl}?borough=${encodeURIComponent(input)}`;
        }

        return axios
            .get(url)
            .then((response) => {
                return { data: response.data, error: null };
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message);
                return { data: null, error: error.message };
            });
    };

    const handleSubmit = async () => {
        const searchTest = search; // Access search state directly
        console.log(searchTest);
        const zip = /^[0-9]{5}$/.test(searchTest);
        fetchData(searchTest, zip ? "postcode" : "borough").then(
            ({ data, error }) => {
                if (error) {
                    setError(error);
                    setSearchResult(null);
                } else {
                    console.log(data);
                    setSearchResult(data);
                    navigate("/housingList", { state: { searchResult: data } });
                    setError("");
                }
            }
        );
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };
    console.log(searchResult);




    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="profile-container">
            <header>
                <div className="profile-ahs-locator">AHS Locator</div>
                <div className='profile-search-container'>
                    <input
                        type="text"
                        className="profile-search-bar"
                        placeholder="Enter a neighborhood or ZIP code"
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    <FaSearch size={18} className="profile-search-icon" onClick={handleSubmit}/>
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