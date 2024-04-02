import React, { useState } from 'react'

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
    {wishlistItems.length === 0 && <p>Your wishlist is empty.</p>}
    {wishlistItems.map((item) => (
      <WishlistItem
        key={item.name} // Important for performance with dynamic lists
        name={item.name}
        price={item.price}
        onAddToWishlist={() => addItemToWishlist(item)}
        onRemoveFromWishlist={() => removeItemFromWishlist(item)}
      />
    ))}
  </div>
  )
}

export default Wishlist