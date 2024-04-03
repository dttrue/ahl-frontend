import React, { useState } from "react";
import axios from "axios";

function HousingNameList({onSubmit}) {
  const [apartmentBorough, setApartmentBorough] = useState('');

  function handleInputChange(event) {
    setApartmentBorough(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(apartmentBorough) 
  }
  function handleClick(event) {
    const inputValue = event.target.value;
const cacheBuster = new Date().getTime(); 
fetch(`https://data.cityofnewyork.us/resource/hg8x-zxpr.json?borough=${inputValue}&_=${cacheBuster}`)
  .then(response => response.json())
  .then(data => {
 
    const names = data.map(item => item.project_name);
    setApartmentNames(names);
  })
  .catch(error => {
    console.error('Error fetching apartment names:', error);
    setApartmentNames([]);
  });

  }
  

 
  return (
    <div>
      <button value="Manhattan" onClick={handleClick}>Get Manhattan Apartments</button>
      <button value="Brooklyn" onClick={handleClick}>Get Brooklyn Apartments</button>
      <button value="Queens" onClick={handleClick}>Get Queens Apartments</button>
      <button value="Staten Island" onClick={handleClick}>Get Staten Island Apartments</button> 
      <button value="Bronx" onClick={handleClick}>Get Bronx Apartments</button>

      <ul>
        {apartmentNames.length > 0 ? (
          apartmentNames.map((name, index) => <li key={index}>{name}</li>)
        ) : (
          <li>No apartments found</li>
        )}
      </ul>
    </div>
  );
}

export default HousingNameList;

