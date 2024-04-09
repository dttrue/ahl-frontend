import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ApartmentNameList() {
  /* useLocation is a hook from rrd and I set it to the location object. it'll represent the URL's state. The next line destructures the searchResult property
  from the location.state object. remember that in homepage, we used navigate to update the state of housing list to have the data from our first search: searchResult.
  If location.state is undefined or null, itll default to searchResults being set to an empty array. This code is used to rget any searchResult data passed through navigation*/ 
  const location = useLocation();
  const { searchResult } = location.state || { searchResult: [] };
  const navigate = useNavigate();

  /* This functions purpose is to asynchronously fetch data from two different api endpoints using the building_id parameter. Both datasets are uniquely correlative based on building id's.
  The project details response will get request fgeneral building information/location/etc and the rent details response will fetch the rent asociated with the given building_id. 
  notice that each dataset has different keys(building_id & buildingid) so remember to double check api info.
  
  For projectdetailsResp, it checks if the data exists and contains at least one item, if thats true it sets projectDetails to the data or else its null
  For rentDetailsResp, it sets projectrentinfo to the data directly, or else null if theres no data
  
  Once the data is successfully fetched and processed, it'll navigate to a new route `/housingList/${building_id}` and passes projectDetails and projectRentInfo
  as the state parameter.*/
  const handleApartmentClick = async (building_id) => {
    try {
      const projDetailsResp = await axios.get(
        `https://data.cityofnewyork.us/resource/hg8x-zxpr.json?building_id=${building_id}`
      );
      const rentDetailsResp = await axios.get(
        `https://data.cityofnewyork.us/resource/9ay9-xkek.json?buildingid=${building_id}`
      );

      const projectDetails =
        projDetailsResp.data && projDetailsResp.data.length > 0
          ? projDetailsResp.data
          : null;
      const projectRentInfo = rentDetailsResp.data
        ? rentDetailsResp.data
        : null;

      navigate(`/housingList/${building_id}`, {
        state: { projectDetails, projectRentInfo },
      });
    } catch (error) {
      console.error("Failed to fetch housing data:", error);
    }
  };

  /* We passed in searchResult, so now we're going to display the information from our data. We filtered through to remove any names that were titled confidential(there was a lot).
  Then we mapped through the results and listed each apartment by its project name. At the same time, we added a link to each "result" that has the function above so that when we
  click the name of the apartment, it'll start another api fetch and navigate to the route*/
  return (
    <ul>
      {searchResult
        .filter(
          (result) => result.project_name.toLowerCase() !== "confidential"
        )
        .map((result, index) => (
          <li key={index}>
            <h3>
              <Link
                onClick={() => handleApartmentClick(result.building_id)}
                to={`/housingList/${result.building_id}`}
              >
                {result.project_name}
              </Link>
            </h3>
          </li>
        ))}
    </ul>
  );
}

export default ApartmentNameList;

