export default function SavedRecipePage({userData , recipeData}) {

    console.log(userData)

    return (
        <div>
            <h2>{userData[0].username}</h2>
            <h2>{userData[0].savedRecipes[0]}</h2>
            <h2>{recipeData[0].title}</h2>
        </div>
    );
}