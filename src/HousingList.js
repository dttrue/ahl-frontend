import {  Link } from "react-router-dom";
import React, {useState} from 'react'
import { useLocation } from "react-router-dom"


function ApartmentNameList () {
const location = useLocation()
    const {searchResult} = location.state || { searchResult: [] }

 return (
    <ul>
      {searchResult
        .filter(result => result.project_name.toLowerCase() !== "confidential")
        .map((result, index) => (
        <li key={index}>
          <h3><Link to={`/housingList/${result.building_id}`}>{result.project_name}</Link></h3>
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