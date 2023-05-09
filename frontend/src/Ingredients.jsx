
import React from "react";
import styles from './Ingredients.module.css';

export default function Ingredients({ recipe }) {

    return(
        <div className={styles.Ing}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Ingredients</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {(recipe.ingredients).map((item , index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{parseInt(item.amount)} {item.unit}</td>
    
                        </tr>
                    ))}
                </tbody>
            </table>                       
        </div>
    );
}


