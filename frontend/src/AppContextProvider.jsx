import React from "react";
import useGet from './useGet';

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    // Retreieve the data from database
    const { data: recipes, refresh: refreshArticles, isLoading } = useGet(`http://localhost:3000/api/recipes`);

    // Retreieve the data when new comment create
    function onChangeComment(){
        refreshArticles();
    }

    const context = {
        recipes,
        onChangeComment
    }

    return (
        <div >
        {
            isLoading ? <div/> :
                            <AppContext.Provider value={context}>
                                {children}
                            </AppContext.Provider>
        } 
        </div>
    );
}

