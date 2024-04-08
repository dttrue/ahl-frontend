import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ApartmentNameList from "./apartmentNameList";

function HousingDetails() {
  // State for storing the list of projects
  // const { building_id } = useParams()
  // console.log("Building ID:", building_id)

  const [projectDetails, setProjectDetails] = useState(null);
  const [projectRentInfo, setProjectRentInfo] = useState(null);
  // // State to track the loading status
  // const [loading, setLoading] = useState(true);
  // // State to store any error messages
  // const [error, setError] = useState("");

  // // useEffect hook to fetch data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const projDetailsResp = await axios.get(
  //         `https://data.cityofnewyork.us/resource/hg8x-zxpr.json?building_id=${building_id}`
  //       );
  //       const rentDetailsResp = await axios.get(
  //         `https://data.cityofnewyork.us/resource/9ay9-xkek.json?buildingid=${building_id}`
  //       );

  //       if (projDetailsResp.data && projDetailsResp.data.length > 0) {
  //         setProjectDetails(projDetailsResp.data);
  //       }
  //       if (rentDetailsResp.data) {
  //         setProjectRentInfo(rentDetailsResp.data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch housing data:", error);
  //       setError("Failed to fetch housing data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [building_id]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!projectDetails) return <div> No details available</div>;


  const location = useLocation()
  useEffect(() => {
    if (location.state) {
      setProjectDetails(location.state.projectDetails)
      setProjectRentInfo(location.state.projectRentInfo)
    }
  }, [location])

if(!projectDetails) return <div> No Details available</div>
console.log(projectRentInfo)

  return (
    <div className="housing-projects">
      <h1>{projectDetails[0].project_name}</h1>
      {/* Display project details */}
      <div>
        <p>Number: {projectDetails[0].house_number}</p>
        <p>Street Name: {projectDetails[0].street_name}</p>
        <p>Borough: {projectDetails[0].borough}</p>
        <p>Postcode: {projectDetails[0].postcode}</p>
        <p>Studio: {projectDetails[0].studio_units}</p>
        <p>1br: {projectDetails[0]._1_br_units}</p>
        <p>2br: {projectDetails[0]._2_br_units}</p>
        <p>3br: {projectDetails[0]._3_br_units}</p>
        <p>4br: {projectDetails[0]._4_br_units}</p>
        <p>5br: {projectDetails[0]._5_br_units}</p>
        <p>6br: {projectDetails[0]._6_br_units}</p>
        <p>Rental Units: {projectDetails[0].counted_rental_units}</p>
        <p>Total Units: {projectDetails[0].total_units}</p>
        
      </div>
      {/* Display rent information */}
      <div>
        <h2>Rent Details:</h2>
        {projectRentInfo.length > 0 ? (
          <ul>
            {projectRentInfo.map((info, index) => (
              <li key={index}>
                Bedroom Size: {info.bedroomsize}, Max Allowable Income: {info.maxallowableincome} Rent: $
                {info.lowactualrent || info.medianactualrent || info.highactualrent || "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rent information available.</p>
        )}
      </div>
    </div>
  );
}

export default HousingDetails;