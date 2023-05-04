import styles from './SavedRecipePage.module.css';

export default function SavedRecipePage({recipes , recipesIsLoading , onChangeComment}) {

    console.log("save = " + recipes);

    if (recipesIsLoading) {
        return null;
    }

    else {
        return (
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
                            <td>{recipes[0].ingredients[0]._id}</td>
                            <td>{recipes[0].ingredients[0].name}</td>
                            <td>{recipes[0].ingredients[0].amount}</td>
                            <td>{recipes[0].ingredients[0].unit}</td>
                        </tr>
                </tbody>
            </table>
        );
    }
}
