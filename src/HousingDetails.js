import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function HousingDetails() {
  {/* We set up two states projectDetails and ProjectRentinfo, remember that in housinglist we're navigating to housing details by buildingid and updating that 
stateProjectDetails and ProjectRentinfo state with the data*/}
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectRentInfo, setProjectRentInfo] = useState(null);

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setProjectDetails(location.state.projectDetails);
      setProjectRentInfo(location.state.projectRentInfo);
    }
  }, [location]);

  if (!projectDetails) return <div> No Details available</div>;
  

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
                Bedroom Size: {info.bedroomsize}, Max Allowable Income:{" "}
                {info.maxallowableincome} Rent: $
                {info.lowactualrent ||
                  info.medianactualrent ||
                  info.highactualrent ||
                  "N/A"}
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
