import { CocktailDetail } from "components/CocktailDetail/CocktailDetail";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectCocktailList, selectCurrentCocktail, selectCurrentCocktailError, selectCurrentCocktailStatus } from "store/selectors";
import { fetchCocktailById,  } from "store/slices";
import { AppDispatch } from "store/store";
import { validateSanitizedId } from "utils/utils";

export const CocktailDetailContainer: React.FC<{}> = () => {
  const { t } = useTranslation();
  
  const { id } = useParams();
  
  const dispatch = useDispatch<AppDispatch>();
  const currentCocktail = useSelector(selectCurrentCocktail);
  const cocktailList = useSelector(selectCocktailList);
  const currentCocktailStatus = useSelector(selectCurrentCocktailStatus);
  const currentCocktailError = useSelector(selectCurrentCocktailError);
  
  useEffect(() => {
    if (currentCocktailStatus === 'idle' && cocktailList.length === 0 && id !== undefined) {
      const sanitizedId =  validateSanitizedId(id) ? id : '';
      dispatch(fetchCocktailById(sanitizedId));
    }
  }, [currentCocktailStatus, dispatch, cocktailList])

  return currentCocktailError !== null || currentCocktail?.error ? (
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
