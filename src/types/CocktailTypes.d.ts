export type Cocktail = {
  strDrink: string,
  strDrinkThumb: string,
  idDrink: string
}

type Ingredient = {
  name: string,
  measure: string,
}

export type CocktailDetail = {
  strInstructions: string,
  strDrink: string,
  strDrinkThumb: string,
  ingredients: Ingredient[],
}


