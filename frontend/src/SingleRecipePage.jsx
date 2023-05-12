import {useParams} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import axios from "axios";
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import NutritionPie from './NutritionPie';
import RecipeInfo from './RecipeInfo';
import Rating from './Rating';
import {CommentButton} from './CommentButton';
import {FavoriteButton} from './FavoriteButton';
import styles from './SingleRecipePage.module.css';
import {useAuthContext} from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SingleRecipePage({handleRating}) {

    const {spoonacularId} = useParams();
    const {user, loading} = useAuthContext()
    const [commentStatus, setCommentStatus] = useState(false);
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

                        if (parseInt(spoonacularId) === (response.data)[index].spoonacularId) {
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
                const response = await axios.get(`${API_BASE_URL}/recipes/${spoonacularId}`, {})

                // check if recipe has rating attribute
                if (response.data.rating == undefined) {
                    response.data = {
                        ...response.data,
                        rating: {
                            rating: 0,
                            numberOfRatings: 0
                        }
                    }
                }

                setRecipeData(response.data);

            } catch (err) {
                console.error(err);
            }
        }

        fetchRecipe();
        setCommentStatus(false);
    }, [commentStatus, favoriteStatus]);

    // ToDo: check the single recipe saved status

    return (
        <div>
            {(recipeData) ?
                (<div style={{position: "relative", top: "50px"}}>
                        <div className={styles.Img_Ing_SinglePage}>
                            <div className={styles.Img_button_SinglePage}>
                                <div className={styles.Img}>
                                    <div className={styles.title}>{recipeData.title}</div>
                                    <img className={styles.image} src={recipeData.image}/>
                                </div>
                                <ButtonTable recipe={recipeData}
                                             setCommentStatus={setCommentStatus}
                                             favoriteStatus={favoriteStatus}
                                             setFavoriteStatus={setFavoriteStatus}
                                             setRecipeData={setRecipeData}
                                             handleRating={handleRating}
                                             spoonacularId={spoonacularId}/>
                                <div className={styles.RecipeInfo}>
                                    <RecipeInfo recipe={recipeData}/>
                                </div>
                            </div>
                            <Ingredients recipe={recipeData}/>
                        </div>
                        <div className={styles.Ins_SinglePage}>
                            <Instructions recipe={recipeData}/>
                        </div>
                        <div style={{
                            position: "relative",
                            top: "80px",
                            textAlign: "center",
                            fontSize: "x-large"
                        }}>Nutrition
                        </div>
                        <div style={{
                            height: "650px",
                            width: "90%",
                            borderRadius: "15px",
                            border: "2px solid red",
                            margin: "auto",
                            marginTop: "30px",
                            background: "#ffe0e0"
                        }}>
                            <NutritionPie recipe={recipeData}/>
                        </div>
                        <div style={{position: "relative", height: "50px"}}></div>
                    </div>
                ) :
                (
                    <div/>
                )}
        </div>
    );
}

export function ButtonTable({
                                recipe,
                                setCommentStatus,
                                favoriteStatus,
                                setFavoriteStatus,
                                setRecipeData,
                                handleRating,
                                ratingValue,
                                spoonacularId
                            }) {
    const {user, loading} = useAuthContext()
    const [rating, setRating] = useState(recipe.rating.rating.toFixed(1));

    useEffect(() => {
        setRating(recipe.rating.rating.toFixed(1));
    }, []);

    return (
        <div className={styles.ButtonTable}>
            <table>
                <tbody>
                <tr>
                    {user && <td style={{position: "relative", top: "-5px"}}><Rating
                        handleRating={handleRating} spoonacularId={spoonacularId}/></td>}
                    <td style={{fontSize: "20px"}}>Rating: {rating}</td>
                    {user && <td style={{position: "relative", paddingLeft: "50px"}}><CommentButton recipe={recipe} setCommentStatus={setCommentStatus}
                                                setRecipeData={setRecipeData}/></td>}
                    {user && <td style={{position: "relative", paddingLeft: "10px"}}><FavoriteButton recipe={recipe}
                                                                                                     favoriteStatus={favoriteStatus}
                                                                                                     setFavoriteStatus={setFavoriteStatus}/>
                    </td>}
                </tr>
                </tbody>
            </table>
        </div>
    )
}

   






