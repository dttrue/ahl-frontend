import React, { useState } from 'react'

//some issues with using the code below

const WishlistItem = ({ name, price }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
  
    const addToWishlist = () => setIsWishlisted(true);
    const removeFromWishlist = () => setIsWishlisted(false);
  
    return (
      <div className="wishlist-item">
        <p>{name} - ${price.toFixed(2)}</p>
        <div>
          <button onClick={addToWishlist}>{isWishlisted ? 'Remove From Wishlist' : 'Add to Wishlist'}</button>
          {isWishlisted && <span className="wishlisted">Wishlisted</span>}
        </div>
      </div>
    );
  };

  export default WishlistItem