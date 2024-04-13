import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ApartmentNameList from "./ApartmentNameList";
import { WishlistContext } from "./wishlistContext"; //imports the context

function HousingDetails() {
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectRentInfo, setProjectRentInfo] = useState(null);
  // const [wishlistItems, setWishlistItems] = useState([]);
  const { addItemToWishlist } = useContext(WishlistContext); //Access the context
  const [itemAdded, setItemAdded] = useState(false); // State to track if an item has been added

  // const addItemToWishlist = (item) => {
  //     setWishlistItems([...wishlistItems, item]);
  //   };

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setProjectDetails(location.state.projectDetails);
      setProjectRentInfo(location.state.projectRentInfo);
    }
  }, [location]);

  //to let the apartment seeker know that the apartment has been added to the wishlist
  const handleAddToWishlist = (item) => {
    addItemToWishlist(item);
    setItemAdded(true); // Set the state to true when an item is added
    setTimeout(() => setItemAdded(false), 3000); // Reset the state after 3 seconds
 };

  if (!projectDetails) return <div> No Details available</div>;
  console.log(projectRentInfo);

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
        <button onClick={() => handleAddToWishlist(projectDetails[0])}>Add to Wishlist</button>
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
      {itemAdded && <p>Item added to wishlist!</p>}
    </div>
  );
}

export default HousingDetails;
