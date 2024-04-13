import React, { useState, useContext } from 'react'
import { WishlistContext } from './wishlistContext'; //import the context


const apartments = [
  { "name": "Cozy Studio", "image": "studio.jpg", "description": "A charming studio apartment perfect for one person.", "price": "$1300" },
  { "name": "Spacious 1-Bedroom", "image": "one_bedroom.jpg", "description": "A comfortable one-bedroom apartment with ample living space.", "price": "$1400" },
  { "name": "Luxurious 2-Bedroom", "image": "two_bedroom.jpg", "description": "A luxurious two-bedroom apartment perfect for families or roommates.", "price": "$3000" }
];


const Wishlist = () => {
    // const [wishlistItems, setWishlistItems] = useState(apartments);
    const { wishlistItems } = useContext(WishlistContext); //access the context


    // const addItemToWishlist = (item) => {
    //     setWishlistItems([...wishlistItems, item]);
    //   };

    //   const removeItemFromWishlist = (item) => {
    //     setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem !== item));
    //   };


  return (
    <div className="wishlist">
    <h2>Wishlist</h2>
    {wishlistItems.length === 0 && <p>Your wishlist is empty.</p>}
    {wishlistItems.map((item) => (
      <div key={item.name} className="apartment">
       <h3>{item.name}</h3>
       <p1>{item.description}</p1>
       <p1>{item.price}</p1>
       {/* <button onClick={() => addItemToWishlist(item)}>Add to Wishlist</button> */}
          {/* <button onClick={() => removeItemFromWishlist(item)}>Remove from Wishlist</button> */}
          </div>
    ))}
  </div>
  )
 
}

export default Wishlist