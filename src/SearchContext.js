// import React, { createContext, useState, useContext } from "react";

// const SearchContext = createContext();

// export function useSearch() {
//   return useContext(SearchContext);
// }

// export const SearchProvider = ({ children }) => {
//     const [searchResult, setSearchResult] = useState([])

//     const value = {
//         searchResult,
//         setSearchResult,
//     }

//     return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
// }