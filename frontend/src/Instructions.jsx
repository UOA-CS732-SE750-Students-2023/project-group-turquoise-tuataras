
import React from "react";
import styles from './Instructions.module.css';

export default function Instructions({recipe}) { 
    return(
        <div className={styles.Ins}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Cooking Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {(recipe.instructions).map((item , index) => (
                        <tr key={index}>
                            <td className={styles.Ins_index} >{index+1}</td>
                            <td>{item}</td>     
                        </tr>
                    ))}
                </tbody>
            </table>                       
        </div>
    );
}


