
import { Divider , Input } from 'antd';
import React from "react";
import styles from './RecipeInfo.module.css';

export default function RecipeInfo({recipe}) {

    return(
        <div className={styles.Info}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cuisine</th>
                        <th>Preparation time</th>
                        <th>Serving</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{recipe.cuisines}</td>
                            <td>{recipe.readyInMinutes} mins</td>
                            <td>{recipe.servings} ppl</td>
                        </tr>
                </tbody>
            </table>                       
        </div>
    );
}
