import { CocktailListContext } from "App";
import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import Spinner from "components/Spinner/Spinner";
import useFetchCocktailsDetails from "hooks/useFetchCocktailsDetails";
import React, { useContext } from "react";
import { CocktailDetail } from "types/CocktailTypes";
import { useTranslation } from "react-i18next";

const CocktailListContainer: React.FC<{}> = () => {
  const state = useContext(CocktailListContext);
  const { t } = useTranslation();

  const [cocktailList, loadingCocktailList, errorCocktailList] =
    useFetchCocktailsDetails<CocktailDetail[]>(state?.current);
  if (!state.current) {
    state.current = cocktailList;
  }

  return errorCocktailList ? (
    <ErrorPage description={t("error.failToGetList")} redirectionLocation="/" />
  ) : loadingCocktailList ? (
    <Spinner />
  ) : (
    <CocktailList cocktailList={cocktailList} />
  );
};

export default CocktailListContainer;
