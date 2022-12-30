import { Cocktail, CocktailDetail } from '../types/CocktailTypes';

export const test_cocktail: Cocktail = {
  strDrink:"9 1/2 Weeks",
  strDrinkThumb:"https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg",
  idDrink:"16108"
}

export const test_cocktail_list: Cocktail[] = [test_cocktail, test_cocktail, test_cocktail, test_cocktail, test_cocktail, test_cocktail]

export const test_cocktail_detail: CocktailDetail = {
  strDrink:"9 1/2 Weeks",
  strInstructions: "blend... blend... blend... blend... blend... blend... blend... blend... blend... blend... ",
  strDrinkThumb:"https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg",
  ingredients: ["ingr1", "ingr2", "ingr3", "ingr4", "ingr5", "ingr6"]
}