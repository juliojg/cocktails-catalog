import { CocktailDetail } from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import useFetch from "hooks/useFetch";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { rawToCocktailDetail } from "utils/jsonToCocktail";
import { useTranslation } from "react-i18next";

export const CocktailDetailContainer: React.FC<{}> = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const detail = location.state?.detail;

  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [cocktailDetail, loading, isError] = useFetch(
    urlCocktailsDetail,
    rawToCocktailDetail,
    detail
  );

  return isError || cocktailDetail?.error ? (
    <ErrorPage
      description={t("error.unexistentCocktail")}
      redirectionLocation="/drinks"
    />
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
