import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import NutritionPie from './NutritionPie';
import RecipeInfo from './RecipeInfo';
import { CommentButton } from './CommentButton';
import { FavoriteButton } from './FavoriteButton';
import styles from './SingleRecipePage.module.css';
import { useAuthContext } from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SingleRecipePage() {

    const { spoonacularId } = useParams();
    const { user, loading } = useAuthContext()
    const [commentStatus , setCommentStatus] = useState(false);

    // need check the single recipe saved status
    const [favoriteStatus, setFavoriteStatus] = useState(checkRecipeSavedStatus()); 

    const [recipeData, setRecipeData] = useState(null);

    //Retrieve specific recipe data by spoonacularId
    useEffect(() => {
      async function fetchRecipe() {
        try {
          const response = await axios.get(`${API_BASE_URL}/recipes/${spoonacularId}`, {
          })
          console.log('recipe = ', response.data)
          setRecipeData(response.data);
    
        } catch (err) {
          console.error(err);
        }
      }
        fetchRecipe();
        setCommentStatus(false);
      }, [commentStatus , favoriteStatus]);

    // ToDo: check the single recipe saved status
    function checkRecipeSavedStatus()
    {
      return false;
    }

    return (
    <div>
        {(recipeData) ?
        ( <div className={styles.mainGridSinglePage}>
            <div className={styles.Img_Ing_SinglePage}>   
                <div className={styles.Img_button_SinglePage}>   
                  <div className={styles.Img}>
                    <h1>{recipeData.title}</h1>
                    <img src = {recipeData.image}/>
                  </div>
                  <ButtonTable  recipe = {recipeData} 
                                setCommentStatus = {setCommentStatus}
                                favoriteStatus = {favoriteStatus}
                                setFavoriteStatus = {setFavoriteStatus}/>

                  <div className={styles.RecipeInfo}> 
                    <RecipeInfo  recipe = {recipeData} />
                  </div> 
                </div>  
                <Ingredients recipe = {recipeData} />
                <NutritionPie recipe = {recipeData} />
            </div>
            <div className={styles.Ins_SinglePage}>
                <Instructions recipe = {recipeData} />
            </div>
          </div>  
        ) : 
        (
            <div/>
        )}
    </div>
  );
}

export function ButtonTable({ recipe, setCommentStatus , favoriteStatus , setFavoriteStatus }){
  return(
      <div className={styles.ButtonTable}>
            <table className={styles.table}>
                <tbody>
                        <tr>
                          <td><CommentButton recipe = { recipe } setCommentStatus = {setCommentStatus} /></td>  
                          <td><FavoriteButton recipe = { recipe } 
                                              favoriteStatus = {favoriteStatus}
                                              setFavoriteStatus = {setFavoriteStatus}/></td>
                          <td className={styles.Rating}>Rating: {recipe?.rating?.rating}</td>
                        </tr>
                </tbody>
            </table>                       
      </div>
  )
}
   






