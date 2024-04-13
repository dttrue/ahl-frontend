import React, { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

 const addItemToWishlist = (item) => {
    setWishlistItems([...wishlistItems, item]);
 };

 return (
    <WishlistContext.Provider value={{ wishlistItems, addItemToWishlist }}>
      {children}
    </WishlistContext.Provider>
 );

}