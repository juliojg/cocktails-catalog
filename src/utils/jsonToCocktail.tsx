import { Cocktail, CocktailDetail } from "types/CocktailTypes";

export const rawToCocktail = (data: any): Cocktail[] => {
  return data?.map((raw: any) => ({
    strDrink: raw.strDrink,
    strDrinkThumb: raw.strDrinkThumb,
    idDrink: raw.idDrink
  }));
};

const ingrToMeasureMap = (x: string) => (y: string) => {
  return x.replace(/\D+/g, '') === y.replace(/\D+/g, '')
}

export const rawToCocktailDetail = (raw: any): CocktailDetail | undefined => {

  const data = raw?.drinks ? raw.drinks[0] : null;

  if (data === null) {
    return undefined;
  }
  
  const validKeyIngredients = Object.keys(data ?? {}).filter(key => key.includes('strIngredient') && data[key]);
  const validKeyMeasures = Object.keys(data ?? {}).filter(key => key.includes('strMeasure') && data[key]);

  const res = {
    strDrink: data?.strDrink,
    strDrinkThumb: data?.strDrinkThumb,
    strInstructions: data?.strInstructions,
    ingredients: validKeyIngredients.map(ingKey => ({name: data[ingKey], measure: data[validKeyMeasures.find(y => ingrToMeasureMap(ingKey)(y)) ?? ''] as string}))
  };

  return res;
};
