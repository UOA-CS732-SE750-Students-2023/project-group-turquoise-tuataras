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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SingleRecipePage({onChangeFavorite , userData }) {

    const { spoonacularId } = useParams();

    const [commentStatus , setCommentStatus] = useState(false);

    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios(
            `${API_BASE_URL}/recipes/${spoonacularId}`
          );
          setRecipeData(response.data);
        };
        fetchData();
        setCommentStatus(false);
      }, [commentStatus]);


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
                  <ButtonTable  recipe = {retrieveRecipeBySpoonacularId(id)} users = {users} setCommentStatus = {setCommentStatus}
                                onChangeFavorite ={onChangeFavorite} commentStatus = {commentStatus}/>
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

export function ButtonTable({recipe, onChangeFavorite , users , setCommentStatus }){
  return(
      <div className={styles.ButtonTable}>
            <table className={styles.table}>
                <tbody>
                        <tr>
                          <td><CommentButton recipe = {recipe} users = {users} setCommentStatus = {setCommentStatus} /></td>  
                          <td><FavoriteButton recipe = {recipe} users = {users} onChangeFavorite={onChangeFavorite}/></td>
                          <td className={styles.Rating} >Rating: {recipe.rating.rating}</td>
                        </tr>
                </tbody>
            </table>                       
        
      </div>
  )
}
   







