import React, { useState } from 'react'


const apartments = [
  { "name": "Cozy Studio", "image": "studio.jpg", "description": "A charming studio apartment perfect for one person.", "price": "$1300" },
  { "name": "Spacious 1-Bedroom", "image": "one_bedroom.jpg", "description": "A comfortable one-bedroom apartment with ample living space.", "price": "$1400" },
  { "name": "Luxurious 2-Bedroom", "image": "two_bedroom.jpg", "description": "A luxurious two-bedroom apartment perfect for families or roommates.", "price": "$3000" }
];


// const WishlistItem = ({ name, price }) => {
//     const [isWishlisted, setIsWishlisted] = useState(false);
  
//     const addToWishlist = () => setIsWishlisted(true);
//     const removeFromWishlist = () => setIsWishlisted(false);
  
//     return (
//       <div className="wishlist-item">
//         <p>{name} - ${price.toFixed(2)} - {apartments.description}  </p>
//         <div>
//           <button onClick={addToWishlist}>{isWishlisted ? 'Remove From Wishlist' : 'Add to Wishlist'}</button>
//           {isWishlisted && <span className="wishlisted">Wishlisted</span>}
//         </div>
//       </div>
//     );
//   };

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addItemToWishlist = (item) => {
        setWishlistItems([...wishlistItems, item]);
      };

      const removeItemFromWishlist = (item) => {
        setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem !== item));
      };

      

  return (
    <div className="wishlist">
    <h2>Wishlist</h2>
    {apartments.length === 0 && <p>Your wishlist is empty.</p>}
    {apartments.map((item) => (
      <apartment
        key={item.name} // Important for performance with dynamic lists
        name={item.name}
        price={item.price}
        description={item.description}
        onAddToWishlist={() => addItemToWishlist(item)}
        onRemoveFromWishlist={() => removeItemFromWishlist(item)}
      />
    ))}
  </div>
  )
}

export default Wishlist