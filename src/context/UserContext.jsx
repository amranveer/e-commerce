import { createContext, useState } from "react";
const UserContext = createContext();

export const UserContextProvider = ({children}) => {
   
     
   
  
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;