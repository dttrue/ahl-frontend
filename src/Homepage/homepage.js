import "./homepage.css";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import SignInModal from "../Signin/signin__Modal";
import CreateAccountModal from "../CreateAccount/createAccount__Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Homepage({ searchResult, setSearchResult }) {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("");
  const [error, setError] = useState("");
  const [createAccountModalIsOpen, setCreateAccountModalIsOpen] = useState(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false)
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  /* fetch data retrieves data from a specific api based on the users input and type of input provided. This specific API gets all listings minus rental information
  so we set it as the base URL. The input type determines how we filter the API fetch based on that API documentation(query parameters). We then use axios.get to
  make a GET request to the specified URL.
  
  If the request is successful, then the .then block gets executed and the data received from the call is put into response as an object and error is set to null.
  The catch error block is for errors that occur during the get request. Error message is logged to the console and data is set to null*/
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
        } else {
          setSearchResult(data);
          setError("");
        }
      }
    );
  };

  useEffect(() => {
    if (searchResult) {
      navigate("/apartmentNameList");
    }
  }, [searchResult]);


  /* handle change updates the search state with a value every time we search something new */
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  /* handleKeydown prevents default form submission if you click enter, therefore improving usability so that we can keep form submission to a button*/
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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

          <input
            type="text"
            className="search-bar"
            placeholder="Enter a borough or ZIP code"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown} />
          <FaSearch size={20} className="search-icon" onClick={handleSubmit} />


        </div>
      </div>
      {createAccountModalIsOpen && <CreateAccountModal onClose={closeCreateAccountModal} openSignIn={openSignInModal} />}
      {signInModalIsOpen && <SignInModal isOpen={signInModalIsOpen} onClose={closeSignInModal} openCreateAccount={openCreateAccountModal} />}
    </div>
  );
}

export default Homepage;