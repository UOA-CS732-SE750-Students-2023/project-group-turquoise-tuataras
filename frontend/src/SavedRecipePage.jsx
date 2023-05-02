import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import styles from './SavedRecipePage.module.css';



/**
 * Renders a list of orders obtained from the API.
 */
export default function SavedRecipePage() {

    const { recipes } = useContext(AppContext);

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Recipe</th>
                        <th>ingredients</th>
                        <th>quantity</th>
                        <th>unit</th>
                        <th>category</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{recipes[0].recipe_name}</td>
                            <td>{recipes[0].ingredients[0].ingredient_name}</td>
                            <td>{recipes[0].ingredients[0].quantity}</td>
                            <td>{recipes[0].ingredients[0].unit}</td>
                            <td>{recipes[0].ingredients[0].category}</td>
                        </tr>
                </tbody>
            </table>
        </>
    );
}

/**
 * Turns an order summary into a string, e.g. 1 Abra, 2 Nidorina, 1 Porygon
 */
function getOrderSummaryString(summary) {
    return summary.map(line => `${line.count} ${line.product.name}`).join(', ');
}