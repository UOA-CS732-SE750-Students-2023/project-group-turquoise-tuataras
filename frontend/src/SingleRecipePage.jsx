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

export default function SingleRecipePage({onChangeComment , onChangeFavorite , users}) {

    const { id } = useParams();
    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios(
            'http://localhost:3000/api/recipes',
          );
          setRecipeData(response.data);
        };
        fetchData();
      }, []);

    function retrieveRecipeBySpoonacularId(id) {
        return recipeData.find(a => a.spoonacularId === parseInt(id));
    }

    return (
    <div>
        {(recipeData) ?
        ( <div className={styles.mainGridSinglePage}>
            <div className={styles.Img_Ing_SinglePage}>   
                <div className={styles.Img_button_SinglePage}>   
                  <div className={styles.Img}>
                    <h1>{retrieveRecipeBySpoonacularId(id).title}</h1>
                    <img src = {retrieveRecipeBySpoonacularId(id).image}/>
                  </div>
                  <ButtonTable  recipe = {retrieveRecipeBySpoonacularId(id)} users = {users} 
                    onChangeComment = {onChangeComment} onChangeFavorite ={onChangeFavorite}/>
                  <div className={styles.RecipeInfo}> 
                    <RecipeInfo  recipe = {retrieveRecipeBySpoonacularId(id)} />
                  </div> 
                </div>  
                <Ingredients recipe = {retrieveRecipeBySpoonacularId(id)} />
                <NutritionPie recipe = {retrieveRecipeBySpoonacularId(id)} />
            </div>
            <div className={styles.Ins_SinglePage}>
                <Instructions recipe = {retrieveRecipeBySpoonacularId(id)} />
            </div>
          </div>  
        ) : 
        (
            <div/>
        )}
    </div>
  );
}

export function ButtonTable({recipe, onChangeComment, onChangeFavorite , users}){
  return(
      <div className={styles.ButtonTable}>
            <table className={styles.table}>
                <tbody>
                        <tr>
                          <td><CommentButton recipe = {recipe} onChangeComment={onChangeComment} users = {users}/></td>  
                          <td><FavoriteButton recipe = {recipe} users = {users} onChangeFavorite={onChangeFavorite}/></td>
                          <td className={styles.Rating} >Rating: {recipe.rating.rating}</td>
                        </tr>
                </tbody>
            </table>                       
        
      </div>
  )
}
   







