import { BrowserRouter as Router, Routes, RouterProvider, Link } from "react-router-dom";
import React, {useState} from 'react'
import { useLocation } from "react-router-dom"


function ApartmentNameList () {
const location = useLocation()
    const {searchResult} = location.state || { searchResult: [] }

const uniqueBuildingNames = Array.from(
    new Set(
        searchResult
        .filter(result => result.project_name.toLowerCase() !== "confidential")
        .map(result => result.project_name)
    )
)

 return (
    <ul>
      {uniqueBuildingNames.map((projectName, index) => (
        <li key={index}>
          <h3>{projectName}</h3>
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