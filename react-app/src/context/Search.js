import React, { useState, useContext } from "react";

const SearchContext = React.createContext();

export function SearchProvider({children}){
  const [searchContent,setSearchContent]=useState("")

  const contextValue = {
    searchContent,
    setSearchContent
  }

  return (
    <SearchContext.Provider value={contextValue}>
    {children}
    </SearchContext.Provider>
  );
}



export const useSearchContext = () => useContext(SearchContext);