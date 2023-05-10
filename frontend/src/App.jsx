import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./PageLayout";
import './App.css'
import Navbar from './Navbar'
import SavedRecipePage from "./SavedRecipePage";
import SingleRecipePage from "./SingleRecipePage";
import ShoppingList from "./ShoppingList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

function App() {

  const { userData } = useContext(AppContext);
  
  return (
    <div>

      <Navbar/>

        <Routes> 
          <Route path="/" element={<PageLayout />}>
              <Route index element={<Navigate to="recipes" replace />} />

              <Route path="/recipes" element={<PageLayout />}>
                  <Route path=":spoonacularId" element={<SingleRecipePage userData = {userData} />} />
              </Route>

              <Route path="savedRecipes" element={<SavedRecipePage userData = {userData} />}/>
              <Route path="shoppingList" element={<ShoppingList userData = {userData} />}/>  
          </Route>
        </Routes>
    </div>
    )
}

export default App
