import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import React, { useEffect, useMemo } from "react";
import { CocktailDetail } from "types/CocktailTypes";
import { useTranslation } from "react-i18next";
import {
  selectCocktailList,
  selectCocktailListError,
  selectCocktailListStatus,
  selectCurrentCocktail,
  selectCurrentPage,
  selectDrinksPerPage
} from "store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktailList, setCurrentPage } from "store/slices";
import { AppDispatch } from "store/store";

export const CocktailListContainer: React.FC<{}> = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const cocktailList = useSelector(selectCocktailList);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const cocktailListStatus = useSelector(selectCocktailListStatus);
  const cocktailListError = useSelector(selectCocktailListError);
  const currentPage = useSelector(selectCurrentPage);
  const drinksPerPage = useSelector(selectDrinksPerPage);

  const calculatePage = (
    element: CocktailDetail | null,
    list: CocktailDetail[]
  ) => {
    if (element === null) {
      return 1;
    }
    return Math.ceil(
      (1 + list.findIndex((x) => x.id === element?.id)) / drinksPerPage
    );
  };

  const page = useMemo(
    () => calculatePage(currentCocktail, cocktailList),
    [currentCocktail, cocktailList]
  );

  useEffect(() => {
    if (cocktailListStatus === "idle") {
      dispatch(fetchCocktailList());
    }
  }, [cocktailListStatus, dispatch]);

  useEffect(() => {
    if (cocktailList.length !== 0) {
      dispatch(setCurrentPage(page));
    }
  }, [currentCocktail, cocktailList]);

  return cocktailListError !== null ? (
    <ErrorPage description={t("error.failToGetList")} redirectionLocation="/" />
  ) : cocktailListStatus === "loading" ? (
    <Spinner />
  ) : (
    <CocktailList
      cocktailList={cocktailList}
      currentPage={currentPage ?? page}
    />
  );
};
