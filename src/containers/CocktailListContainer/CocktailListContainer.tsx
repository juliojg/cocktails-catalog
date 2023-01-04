import { CatalogContext } from "App";
import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import useFetchCocktailsDetails from "hooks/useFetchCocktailsDetails";
import React, { useContext } from "react";
import { CocktailDetail } from "types/CocktailTypes";
import { useTranslation } from "react-i18next";

export const CocktailListContainer: React.FC<{}> = () => {
  const state = useContext(CatalogContext);
  const { t } = useTranslation();

  const [cocktailList, loadingCocktailList, errorCocktailList] =
    useFetchCocktailsDetails<CocktailDetail[]>(state.current.list);

  if (!state.current.list) {
    state.current.list = cocktailList;
  }

  return errorCocktailList ? (
    <ErrorPage description={t("error.failToGetList")} redirectionLocation="/" />
  ) : loadingCocktailList ? (
    <Spinner />
  ) : (
    <CocktailList cocktailList={cocktailList} />
  );
};
