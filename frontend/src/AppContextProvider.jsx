import React from "react";
import { useAuthContext} from './hooks/useAuthContext';


export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    // HardCode to retrieve the userData.id , wanna retreieve by username---------------
    const {user, loading} = useAuthContext();

    const userData = {
        username: "root",
        id: "6452eda493f0a4aa0de4c196"
    } 
    // HardCode to retrieve the userData.id , wanna retreieve by username---------------

    const context = {
        userData    
    }

    return (
        <div >
            {
                <AppContext.Provider value={context}>
                    {children}
                </AppContext.Provider>
            } 
        </div>
    );
}

