import CocktailDetail from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/ErrorPage/ErrorPage";
import Spinner from "components/Spinner/Spinner";
import useFetch from "hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { rawToCocktailDetail } from "utils/jsonToCocktail";

const CocktailDetailContainer: React.FC<{}> = () => {
  let { id } = useParams();

  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [cocktailDetail, loading, isError] = useFetch(
    urlCocktailsDetail,
    rawToCocktailDetail
  );

  return isError ? (
    <ErrorPage description="Cocktail inexistente, presione para volver al catálogo" redirectionLocation="/drinks"/>
  ) : loading ? (
    <Spinner />
  ) : (
    <CocktailDetail
      title={cocktailDetail?.strDrink}
      imageUrl={cocktailDetail?.strDrinkThumb}
      ingredients={cocktailDetail?.ingredients}
      instructions={cocktailDetail?.strInstructions}
    />
  );
};

export default CocktailDetailContainer;
