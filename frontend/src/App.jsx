import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./PageLayout";
import './App.css'
import Navbar from './Navbar'
import RecipePage from "./RecipePage";
import SavedRecipePage from "./SavedRecipePage";
import SingleRecipePage from "./SingleRecipePage";
import ShoppingList from "./ShoppingList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

function App() {

  const { recipes, recipesIsLoading , users , onChangeFavorite} = useContext(AppContext);
  
  return (
    <div>

      <Navbar/>

        <Routes> 
          <Route path="/" element={<PageLayout />}>
              <Route index element={<Navigate to="recipes" replace />} />

              <Route path="/recipes" element={<PageLayout />}>

                  <Route index element={<Navigate to="gallery" replace />} />

                  <Route path="gallery" element={<RecipePage users = {users} recipesIsLoading = {recipesIsLoading} onChangeFavorite = {onChangeFavorite}/>}/>

                  <Route path=":id" element={<SingleRecipePage recipes = {recipes} users = {users} 
                                              recipesIsLoading = {recipesIsLoading} onChangeFavorite={onChangeFavorite} />} />
              </Route>

              <Route path="savedRecipes" element={<SavedRecipePage onChangeFavorite={onChangeFavorite} />}/>
              <Route path="shoppingList" element={<ShoppingList />}/>  
          </Route>
        </Routes>
    </div>
    )
}

export default App
