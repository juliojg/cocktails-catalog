import { CocktailDetail } from "types/CocktailTypes";

export const rawToCocktailList = (data: any): string[] => {
  return data?.map((raw: any) => raw.idDrink);
};

const ingrToMeasureMap = (x: string) => (y: string) => {
  return x.replace(/\D+/g, "") === y.replace(/\D+/g, "");
};

export const rawToCocktailDetail = (raw: any): CocktailDetail => {
  const data = raw?.drinks ? raw.drinks[0] : null;

  const validKeyIngredients = Object.keys(data ?? {}).filter(
    (key) => key.includes("strIngredient") && data[key]
  );
  const validKeyMeasures = Object.keys(data ?? {}).filter(
    (key) => key.includes("strMeasure") && data[key]
  );

  if (data) {
    return {
      id: data?.idDrink,
      strDrink: data?.strDrink,
      strDrinkThumb: data?.strDrinkThumb,
      strInstructions: data?.strInstructions,
      ingredients: validKeyIngredients.map((ingKey) => ({
        name: data[ingKey],
        measure: data[
          validKeyMeasures.find((y) => ingrToMeasureMap(ingKey)(y)) ?? ""
        ] as string
      })),
      error: false
    };
  } else {
    return {
      id: data?.idDrink,
      strDrink: data?.strDrink,
      strDrinkThumb: data?.strDrinkThumb,
      strInstructions: data?.strInstructions,
      ingredients: validKeyIngredients.map((ingKey) => ({
        name: data[ingKey],
        measure: data[
          validKeyMeasures.find((y) => ingrToMeasureMap(ingKey)(y)) ?? ""
        ] as string
      })),
      error: true
    };
  }
};
