import { CocktailDetail, Ingredient } from "types/CocktailTypes";

export const ingredientMock: Ingredient = {
  name: "testIngredient1",
  measure: "testIngredient1measure"
};

export const cocktailDetailMock: CocktailDetail = {
  id: "1",
  strInstructions: "testInstructions1",
  strDrink: "testDrink1",
  strDrinkThumb: "testPhoto1",
  ingredients: [ingredientMock],
  error: false
};

export const cocktailDetailIngredientHeavyMock: CocktailDetail = {
  id: "1",
  strInstructions: "testInstructions1",
  strDrink: "testDrink1",
  strDrinkThumb: "testPhoto1",
  ingredients: [1,2,3,4].map(newName => ({...ingredientMock, name: ingredientMock.name.slice(0, -1) + newName })),
  error: false
};
