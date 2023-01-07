import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { CocktailDetail } from "types/CocktailTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCocktailListStatus,
  selectCocktailsDetailsStatus,
  selectCocktailsToShow
} from "store/selectors";
import { setShowUi } from "store/slices";

export const CocktailListContainer: React.FC<{}> = () => {
  const { t } = useTranslation();

  const cocktailsToShow = useSelector(selectCocktailsToShow);
  const cocktailListStatus = useSelector(selectCocktailListStatus);
  const cocktailsDetailsStatus = useSelector(selectCocktailsDetailsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowUi(true));
    return () => {
      dispatch(setShowUi(false));
    };
  }, []);

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
    </React.Fragment>
  );
};
