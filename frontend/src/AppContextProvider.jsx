import React from "react";
import useGet from './useGet';
import { useLocalStorage } from "./useLocalStorage";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    // Retreieve the data from database
    
    const { data: recipes, refresh: refreshRecipes, isLoading: recipesIsLoading } = useGet(`http://localhost:3000/api/recipes`);
    const { data: users, refresh: refreshUsers, isLoading: usersIsLoading } = useGet(`http://localhost:3000/api/users`);
    
    // Retreieve the data again after new comment create
    function onChangeFavorite(){
        refreshUsers();
    }
    
    const context = {
        recipes,
        users,
        recipesIsLoading,
        usersIsLoading,
        onChangeFavorite       
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

