import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import NutritionPie from './NutritionPie';
import RecipeInfo from './RecipeInfo';
import Rating from './Rating';
import { CommentButton } from './CommentButton';
import { FavoriteButton } from './FavoriteButton';
import styles from './SingleRecipePage.module.css';
import { useAuthContext } from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SingleRecipePage({ handleRating }) {

    const { spoonacularId } = useParams();
    const { user, loading } = useAuthContext()
    const [commentStatus , setCommentStatus] = useState(false);
    // need check the single recipe saved status

    const [favoriteStatus, setFavoriteStatus] = useState(false); 

    const [recipeData, setRecipeData] = useState(null);


    // Check Single recipe saved status when page refresh
    useEffect(() => {

    async function checkRecipeSavedStatus() {

          try {
            const response = await axios.get(`${API_BASE_URL}/users/savedRecipes`, {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            }).then((response) => {

            for (let index = 0; index < (response.data).length; index++) {

              if(parseInt(spoonacularId) === (response.data)[index].spoonacularId){
                setFavoriteStatus(true);
                return;
              } 
            }
              setFavoriteStatus(false); 
              return;
          })

          } catch (err) {
            console.error(err);
          }      
        }
        
        checkRecipeSavedStatus();

    }, []);  

    //Retrieve Single recipe data by spoonacularId
    useEffect(() => {
      async function fetchRecipe() {
        try {
          const response = await axios.get(`${API_BASE_URL}/recipes/${spoonacularId}`, {
          })

          // check if recipe has rating attribute
          if(response.data.rating == undefined)
          {
            response.data = {
              ...response.data ,
              rating : { rating: 0 , 
                numberOfRatings: 0}
            }
          }

          setRecipeData(response.data);

        } catch (err) {
          console.error(err);
        }
      }
        fetchRecipe();
        setCommentStatus(false);
      }, [commentStatus , favoriteStatus]);

    // ToDo: check the single recipe saved status

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
                                setFavoriteStatus = {setFavoriteStatus}
                                setRecipeData = {setRecipeData}
                                handleRating = {handleRating}
                                spoonacularId = {spoonacularId}/>

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

export function ButtonTable({ recipe, setCommentStatus , favoriteStatus , setFavoriteStatus, setRecipeData, handleRating, ratingValue, spoonacularId}){
  const { user, loading } = useAuthContext()
  const [rating, setRating] = useState(recipe.rating.rating.toFixed(1));

  useEffect(() => {
    setRating(recipe.rating.rating.toFixed(1));
  }, []);
  
    return(
      <div className={styles.ButtonTable}>
      <table className={styles.table}>
          <tbody>
                  <tr>
                    { user && <td><CommentButton recipe = { recipe } setCommentStatus = {setCommentStatus} setRecipeData = {setRecipeData}/></td> }
                    { user && <td><FavoriteButton recipe = { recipe } 
                                        favoriteStatus = {favoriteStatus}
                                        setFavoriteStatus = {setFavoriteStatus}/></td> }
                    <td>{rating}</td>
                    { user && <td><Rating handleRating={handleRating} spoonacularId={spoonacularId}/></td> }
                  </tr>
          </tbody>
      </table>                       
  </div>
  )
}

   






