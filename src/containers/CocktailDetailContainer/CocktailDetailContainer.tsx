import CocktailDetail from "components/CocktailDetail/CocktailDetail";
import useFetch from "hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { rawToCocktailDetail } from "utils/jsonToCocktail";

const CocktailDetailContainer: React.FC<{}> = () => {
  let { id } = useParams();

  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [rawCocktailDetail, loading, isError] = useFetch(urlCocktailsDetail);

  const detail = rawToCocktailDetail(rawCocktailDetail);

  return loading ? (
    <div> Cargando </div>
  ) : detail ? (
    <CocktailDetail
      title={detail.strDrink}
      imageUrl={detail.strDrinkThumb}
      ingredients={detail.ingredients}
      instructions={detail.strInstructions}
    />
  ) : (
    <div> Cocktail inexistente </div>
  );
};

export default CocktailDetailContainer;
