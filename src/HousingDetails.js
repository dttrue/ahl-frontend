import { useState, useEffect } from "react";
import axios from "axios";

function HousingProject() {
  // State for storing the list of projects
  const [projectData, setProjectData] = useState([]);
  const [projectRentInfo, setProjectRentInfo] = useState({});
  // State to track the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseOne = await axios.get(
          "https://data.cityofnewyork.us/resource/hg8x-zxpr.json"
        );

        const responseTwo = await axios.get(
          "https://data.cityofnewyork.us/resource/9ay9-xkek.json"
        );
        const rentalsByBuildingId = {};
        for (let listing of responseTwo.data) {
          if (!rentalsByBuildingId[listing.buildingid]) {
            rentalsByBuildingId[listing.buildingid] = [];
          }
          rentalsByBuildingId[listing.buildingid].push({
            bedroomsize: listing.bedroomsize,
            maxIncome: listing.maxallowableincome,
            totalUnits: listing.totalunits,
            lowrent: listing.lowactualrent,
            medianrent: listing.medianactualrent,
            highrent: listing.highactualrent,
          });
        }

        setProjectData(responseOne.data);
        setProjectRentInfo(rentalsByBuildingId);
      } catch (error) {
        console.error("Failed to fetch housing data:", error);
        setError("Failed to fetch housing data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  debugger;
  if (loading) return <div>Loading...</div>; // Display loading message while fetching
  if (error) return <div>{error}</div>; // Display error message if any error occurred

  // Render the list of projects as cards
  return (
    <div className="housing-projects">
      <h1>Housing List</h1>
      {projectData.map((project, index) => (
        <div
          key={project.building_id || index}
          className="card mb-3"
          style={{ maxWidth: "400px", margin: "15px auto" }}
        >
          <div className="card-body">
            <h5 className="card-title">{project.project_name}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                House Number: {project.house_number}
              </li>
              <li className="list-group-item">
                Street Name: {project.street_name}
              </li>
              <li className="list-group-item">Borough: {project.borough}</li>
              <li className="list-group-item">Postcode: {project.postcode}</li>
          
              <li className="list-group-item">
                Extremely Low Income Units: {project.extremely_low_income_units}
              </li>
              <li className="list-group-item">
                Very Low Income Units: {project.very_low_income_units}
              </li>
              <li className="list-group-item">
                Low Income Units: {project.low_income_units}
              </li>
              <li className="list-group-item">
                Moderate Income Units: {project.moderate_income_units}
              </li>
              <li className="list-group-item">
                Middle Income Units: {project.middle_income_units}
              </li>
              <li className="list-group-item">
                Other Income Units: {project.other_income_units}
              </li>
              <li className="list-group-item">
                Studio Units: {project.studio_units}
              </li>
              <li className="list-group-item">
                1 Bedroom Units: {project._1_br_units}
              </li>
              <li className="list-group-item">
                2 Bedroom Units: {project._2_br_units}
              </li>
              <li className="list-group-item">
                3 Bedroom Units: {project._3_br_units}
              </li>
              <li className="list-group-item">
                4 Bedroom Units: {project._4_br_units}
              </li>
            </ul>
          </div>
          {projectRentInfo[project.buildingid] &&
            projectRentInfo[project.buildingid].map((rentInfo, rentIndex) => (
              <ul key={rentIndex} className="rental-listings" >
                <li> Bedroom Size: {rentInfo.bedroomsize}</li>
                <li> Max Income: {rentInfo.maxIncome}</li>
                <li>Total Units: {rentInfo.totalUnits}</li>
                <li>Low Rent: {rentInfo.lowrent}</li>
                <li>Median Rent: {rentInfo.medianrent}</li>
                <li>High Rent: {rentInfo.highrent}</li>
              </ul>
            ))}
        </div>
      ))}
    </div>
  );
}

export default HousingProject;
