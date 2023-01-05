import { CocktailDetail } from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectCocktails, selectCurrentCocktail, selectCurrentCocktailStatus } from "store/selectors";
import { fetchCocktailById,  } from "store/slices";
import { AppDispatch } from "store/store";
import { validateSanitizedId } from "utils/utils";

export const CocktailDetailContainer: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const dispatch = useDispatch<AppDispatch>();
  const cocktails = useSelector(selectCocktails);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const currentCocktailStatus = useSelector(selectCurrentCocktailStatus);

  
  useEffect(() => {
    if (currentCocktailStatus === 'idle' && cocktails.allIds.length === 0 && id !== undefined) {
      const sanitizedId =  validateSanitizedId(id) ? id : '';
      dispatch(fetchCocktailById(sanitizedId));
    }
  }, [currentCocktailStatus, dispatch, cocktails.allIds])

  return currentCocktailStatus === 'failed' || currentCocktail?.error ? (
    <ErrorPage
      description={t("error.unexistentCocktail")}
      redirectionLocation="/drinks"
    />
  ) : currentCocktailStatus === 'loading' ? (
    <Spinner />
  ) : (
    <CocktailDetail
      title={currentCocktail?.strDrink ?? ''}
      imageUrl={currentCocktail?.strDrinkThumb ?? ''}
      ingredients={currentCocktail?.ingredients ?? []}
      instructions={currentCocktail?.strInstructions ?? ''}
    />
  );
};
