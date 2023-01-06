import { CocktailDetail } from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCocktails,
  selectCurrentCocktail,
  selectCurrentCocktailStatus,
  selectGotTheCocktailDetail
} from "store/selectors";
import {
  fetchCocktailById,
  resetCurrentCocktail,
  setCurrentCocktail
} from "store/slices";
import { AppDispatch } from "store/store";
import { validateSanitizedId } from "utils/utils";
import { CocktailDetail as CocktailDetailType } from "types/CocktailTypes";

export const CocktailDetailContainer: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const sanitizedId = validateSanitizedId(id ?? "") ? (id as string) : "";

  const dispatch = useDispatch<AppDispatch>();

  const cocktails = useSelector(selectCocktails);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const currentCocktailStatus = useSelector(selectCurrentCocktailStatus);
  const gotTheCocktailDetail = useSelector(
    selectGotTheCocktailDetail(sanitizedId)
  );

  useEffect(() => {
    if (!gotTheCocktailDetail) {
      dispatch(fetchCocktailById(sanitizedId));
    } else {
      dispatch(
        setCurrentCocktail(cocktails.byId[sanitizedId] as CocktailDetailType)
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetCurrentCocktail());
    };
  }, []);

  return currentCocktailStatus === "failed" || currentCocktail?.error ? (
    <ErrorPage
      description={t("error.unexistentCocktail")}
      redirectionLocation="/drinks"
    />
  ) : currentCocktailStatus === "loading" ? (
    <Spinner />
  ) : (
    <CocktailDetail
      title={currentCocktail?.strDrink ?? ""}
      imageUrl={currentCocktail?.strDrinkThumb ?? ""}
      ingredients={currentCocktail?.ingredients ?? []}
      instructions={currentCocktail?.strInstructions ?? ""}
    />
  );
};
