import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApartmentNameList from './HousingList'

function HousingDetails() {
  // State for storing the list of projects
  const { building_id } = useParams
  console.log("Building ID:", building_id)

  const [projectDetails, setProjectDetails] = useState(null);
  const [projectRentInfo, setProjectRentInfo] = useState([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projDetailsResp = await axios.get(
          `https://data.cityofnewyork.us/resource/hg8x-zxpr.json?building_id=${building_id}`
        );
        const rentDetailsResp = await axios.get(
          `https://data.cityofnewyork.us/resource/9ay9-xkek.json?buildingid=${building_id}`
        );

        if (projDetailsResp.data && projDetailsResp.data.length > 0) {
          setProjectDetails(projDetailsResp.data);
        }
        if (rentDetailsResp.data) {
          setProjectRentInfo(rentDetailsResp.data);
        }
      } catch (error) {
        console.error("Failed to fetch housing data:", error);
        setError("Failed to fetch housing data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [building_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!projectDetails) return <div> No details available</div>;

  return (
    <div className="housing-projects">
      <h1>{projectDetails.project_name}</h1>
      {/* Display project details */}
      <div>
        <p>House Number: {projectDetails.house_number}</p>
        <p>Street Name: {projectDetails.street_name}</p>
        <p>Borough: {projectDetails.borough}</p>
        <p>Postcode: {projectDetails.postcode}</p>
        {/* Add more details as needed */}
      </div>
      {/* Display rent information */}
      <div>
        <h2>Rent Details:</h2>
        {projectRentInfo.length > 0 ? (
          <ul>
            {projectRentInfo.map((info, index) => (
              <li key={index}>
                Bedroom Size: {info.bedroomsize}, Rent: $
                {info.lowrent || info.medianrent || info.highrent || "N/A"}
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
