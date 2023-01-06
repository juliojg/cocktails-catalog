import React from "react";
import { useTranslation } from "react-i18next";
import { CocktailList } from "components/CocktailList/CocktailList";
import { PaginationFooterContainer } from "containers/PaginationFooterContainer/PaginationFooterContainer";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { CocktailDetail } from "types/CocktailTypes";
import { useSelector } from "react-redux";
import {
  selectCocktailListStatus,
  selectCocktailsDetailsStatus,
  selectCocktailsToShow
} from "store/selectors";

export const CocktailListContainer: React.FC<{}> = () => {
  const { t } = useTranslation();

  const cocktailsToShow = useSelector(selectCocktailsToShow);
  const cocktailListStatus = useSelector(selectCocktailListStatus);
  const cocktailsDetailsStatus = useSelector(selectCocktailsDetailsStatus);

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
        <CocktailList cocktailList={cocktailsToShow as CocktailDetail[]} />
      )}
      <PaginationFooterContainer />
    </React.Fragment>
  );
};
