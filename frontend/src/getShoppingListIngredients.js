export default function getShoppingListIngredients(shoppingListRecipes) {

    let allIngredients = [];
      
    for (let i = 0; i < shoppingListRecipes.length; i++) {
      for (let j = 0; j < shoppingListRecipes[i].ingredients.length; j++)
      allIngredients = [...allIngredients , shoppingListRecipes[i]["ingredients"][j]];
    }
    
    const tableData = getShoppingListData(allIngredients);

    return tableData;
}

export function getShoppingListData(allIngredients) {

  let newIngredientData = [];
  let tableData = [];
  
      allIngredients.forEach(ingredient => {
      const isSameIngredient = newIngredientData.find( c => c.ingredient.name === ingredient.name);
      
      if (isSameIngredient) {
          isSameIngredient.totalAmount = isSameIngredient.totalAmount + parseInt(ingredient.amount);
      }
      else {
          newIngredientData.push({ ingredient , totalAmount: parseInt(ingredient.amount) });
      }
      
      });

      for (let index = 0; index < newIngredientData.length; index++) {
              tableData[index] = {
                  name:         newIngredientData[index].ingredient.name,
                  amount:       newIngredientData[index].ingredient.amount,
                  totalAmount:  newIngredientData[index].totalAmount + " " +newIngredientData[index].ingredient.unit,
              }
      };

    return tableData;
}
