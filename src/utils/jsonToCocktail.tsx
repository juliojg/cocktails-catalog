import { Cocktail, CocktailDetail } from "types/CocktailTypes";

export const rawToCocktail = (data: any): Cocktail[] => {
  return data?.map((raw: any) => ({
    strDrink: raw.strDrink,
    strDrinkThumb: raw.strDrinkThumb,
    idDrink: raw.idDrink
  }));
};

export const rawToCocktailDetail = (data: any): CocktailDetail => {
  
  const validKeyIngredients = Object.keys(data ?? {}).filter(key => key.includes('strIngredient') && data[key]);

  const res = {
    strDrink: data?.strDrink,
    strDrinkThumb: data?.strDrinkThumb,
    strInstructions: data?.strInstructions,
    ingredients: validKeyIngredients.map(key => data[key])
  };

  return res;
};
