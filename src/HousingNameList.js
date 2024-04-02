import { useState, useEffect } from "react";
import axios from "axios";

function HousingNameList() {
  const [apartmentNames, setApartmentNames] = useState([]);

  function handleClick(event) {
    const inputValue = event.target.value;

    fetch(
      `https://data.cityofnewyork.us/resource/hg8x-zxpr.json?borough=${inputValue}`
    )
      .then((response) => {})
      .catch((error) => {});
  }


}



export default HousingNameList;
