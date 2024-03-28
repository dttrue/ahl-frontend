import { useState, useEffect } from 'react';
import axios from 'axios';

function HousingProject() {
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              // Fetching both sources in parallel
              const [responseOne, responseTwo] = await Promise.all([
                  axios.get('http://localhost:1117/api/housing'),
                  axios.get("https://data.cityofnewyork.us/resource/9ay9-xkek.json")
              ]);
              
              // Combining the data from both responses
              setProjectData([...responseOne.data, ...responseTwo.data]);
          } catch (error) {
              console.error('Failed to fetch housing data:', error);
          }
      };
  
      fetchData();
  }, []);
  

  
    if (!projectData) {
        return <div>Loading...</div>;
    }

    return (
      <div className="housing-projects">
          {projectData.map((project, index) => (
              <div key={index} className="housing-project">
                  <h2>{project.project_name}</h2>
                  <p>Address: {project.house_number} {project.street_name}, {project.borough}, {project.postcode}</p>
                  <p>Total Units: {project.total_units}</p>
                  <p>Unit Breakdown:</p>
                  <ul>
                      <li>Extremely Low Income Units: {project.extremely_low_income_units}</li>
                      <li>Very Low Income Units: {project.very_low_income_units}</li>
                      <li>Low Income Units: {project.low_income_units}</li>
                      <li>Moderate Income Units: {project.moderate_income_units}</li>
                      <li>Middle Income Units: {project.middle_income_units}</li>
                      <li>Other Income Units: {project.other_income_units}</li>
                      <li>Studio Units: {project.studio_units}</li>
                      <li>1 Bedroom Units: {project._1_br_units}</li>
                      <li>2 Bedroom Units: {project._2_br_units}</li>
                      <li>3 Bedroom Units: {project._3_br_units}</li>
                      <li>4 Bedroom Units: {project._4_br_units}</li>
                      <li>5 Bedroom Units: {project._5_br_units}</li>
                      <li>6 Bedroom Units: {project._6_br_units}</li>
                      <li>Counted_rental_units: {project.counted_rental_units}</li>
                      <li>Rent:{project.lowactualrent}</li>
                  </ul>
              </div>
          ))}
      </div>
  );
}

export default HousingProject;

