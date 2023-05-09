import React from "react";
import useGet from './useGet';
import { useLocalStorage } from "./useLocalStorage";
import { useAuthContext} from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    // HardCode to retrieve the userData.id , wanna retreieve by username---------------
    const {user, loading} = useAuthContext();

    const userData = {
        username: "root",
        id: "6452eda493f0a4aa0de4c196"
    } 

    const context = {
        userData    
    }

    return (
        <div >
        {
            recipesIsLoading ? <div/> :
                                usersIsLoading ? <div/> :
                                                <AppContext.Provider value={context}>
                                                    {children}
                                                </AppContext.Provider>
        } 
        </div>
    );
}

