import { CocktailDetail } from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { useGetDetailById } from "hooks/useGetDetailById";
import { CocktailDetail as CocktailDetailType } from "../../types/CocktailTypes"
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CocktailDetailContainer: React.FC<{}> = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [cocktailDetail, loading, isError] = useGetDetailById<CocktailDetailType>(id ?? "");

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
