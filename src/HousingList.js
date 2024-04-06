import React, {useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'


function ApartmentNameList () {
const location = useLocation()
    const {searchResult} = location.state || { searchResult: [] }


    const navigate = useNavigate()
    const handleApartmentClick = async (building_id) => {
      try {
        const projDetailsResp = await axios.get(
          `https://data.cityofnewyork.us/resource/hg8x-zxpr.json?building_id=${building_id}`
        )
        const rentDetailsResp = await axios.get(
          `https://data.cityofnewyork.us/resource/9ay9-xkek.json?buildingid=${building_id}`
        )

        const projectDetails = projDetailsResp.data && projDetailsResp.data.length > 0 ? projDetailsResp.data : null;
        const projectRentInfo = rentDetailsResp.data ? rentDetailsResp.data : null;

        navigate(`/housingList/${building_id}` , { state: { projectDetails, projectRentInfo } });
      } catch (error) {
        console.error("Failed to fetch housing data:", error)
      }
    }

 return (
    <ul>
      {searchResult
        .filter(result => result.project_name.toLowerCase() !== "confidential")
        .map((result, index) => (
        <li key={index}>
          <h3><Link onClick= {()=> handleApartmentClick(result.building_id)} to={`/housingList/${result.building_id}`}>{result.project_name}</Link></h3>
        </li>
      ))}
    </ul>
 )
  }

export default ApartmentNameList;

/* 
this takes our search results and maps through the data displaying each apartment by its name. we passed searchResult
as a prop to this function to use it
*/