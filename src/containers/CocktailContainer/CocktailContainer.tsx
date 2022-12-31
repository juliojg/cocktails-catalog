import { CocktailCard } from "components/CocktailCard/CocktailCard";
import ErrorPage from "components/ErrorPage/ErrorPage";
import useFetch from "hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { CocktailDetail } from "types/CocktailTypes";
import { rawToCocktailDetail } from "utils/jsonToCocktail";

type CocktailContainerProps = {
  cocktailId?: string;
};

const CocktailContainer: React.FC<CocktailContainerProps> = ({
  cocktailId
}) => {
  const { paramId } = useParams();

  const id = cocktailId ? cocktailId : paramId ?? "";

  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [cocktailDetail, loading, isError] = useFetch<CocktailDetail>(
    urlCocktailsDetail,
    rawToCocktailDetail
  );

  return isError ? (
    <ErrorPage description="Cocktail inexistente, presione para volver al catálogo" redirectionLocation="/drinks"/>
  ) : (
    <CocktailCard
      id={id}
      title={cocktailDetail?.strDrink}
      imageUrl={cocktailDetail?.strDrinkThumb}
      ingredients={cocktailDetail?.ingredients}
      loading={loading}
    />
  );
};

export default CocktailContainer;
