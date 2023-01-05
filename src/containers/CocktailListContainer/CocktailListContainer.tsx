import { PaginationFooterContainer } from "containers/PaginationFooterContainer/PaginationFooterContainer";
import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  selectCocktailListStatus,
  selectCocktails,
  selectCocktailsDetailsStatus,
  selectCurrentCocktail,
  selectCurrentCocktails,
  selectCurrentPage,
  selectDrinksPerPage
} from "store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCocktailList,
  fetchCocktailListDetails,
  resetCurrentCocktail
} from "store/slices";
import { AppDispatch } from "store/store";

export const CocktailListContainer: React.FC<{}> = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const cocktails = useSelector(selectCocktails);
  const cocktailListStatus = useSelector(selectCocktailListStatus);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const currentCocktailStatus = useSelector(selectCocktailListStatus);

  const cocktailsToShow = useSelector(selectCurrentCocktails);

  const cocktailsDetailsStatus = useSelector(selectCocktailsDetailsStatus);
  const drinksPerPage = useSelector(selectDrinksPerPage);
  const currentPage = useSelector(selectCurrentPage);

  const cocktailsToFetch = cocktails.allIds.filter((id, index) => {
    const offset = (currentPage ?? 1 - 1) * drinksPerPage + 1;
    const firstIndex = offset - 1 - drinksPerPage;
    const lastIndex = firstIndex + drinksPerPage;
    return (
      index >= firstIndex && index < lastIndex
    );
  });

  useEffect(() => {
    if (!cocktails.allIds.length && cocktailListStatus === "idle") {
      dispatch(fetchCocktailList());
    }
    if (cocktails.allIds.length && cocktailListStatus === "succeeded") {
      if (cocktailsDetailsStatus === "idle") {
        dispatch(fetchCocktailListDetails(cocktailsToFetch));
      }
    }
  }, [cocktails, cocktailListStatus]);

  useEffect(() => {
    if (!(cocktailListStatus === "idle")) {
      dispatch(fetchCocktailListDetails(cocktailsToFetch));
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentCocktailStatus === "failed") {
      dispatch(resetCurrentCocktail);
    }
  }, [currentCocktail]);

  return (
    <React.Fragment>
      {cocktailListStatus === "failed" ||
      cocktailsDetailsStatus === "failed" ? (
        <ErrorPage
          description={t("error.failToGetList")}
          redirectionLocation="/"
        />
      ) : cocktailListStatus === "loading" ||
        cocktailsDetailsStatus === "loading" ? (
        <Spinner />
      ) : (
        <CocktailList cocktailList={cocktailsToShow} />
      )}
      <PaginationFooterContainer />
    </React.Fragment>
  );
};
