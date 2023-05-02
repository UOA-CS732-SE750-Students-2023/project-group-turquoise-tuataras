import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./PageLayout";
import './App.css'
import Navbar from './Navbar'
import RecipePage from "./RecipePage";
import SavedRecipePage from "./SavedRecipePage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={<PageLayout />}>

          <Route index element={<Navigate to="recipe" replace />} />

          <Route path="recipe" element={<RecipePage /> } />
          <Route path="savedRecipes" element={<SavedRecipePage /> } />

        </Route>
      </Routes>

    </div>
    
  )
}

export default App
