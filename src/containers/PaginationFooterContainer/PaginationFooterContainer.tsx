import React, { useEffect } from "react";
import {
  selectCocktailListStatus,
  selectCocktailPage,
  selectCocktails,
  selectCurrentCocktail,
  selectCurrentCocktailStatus,
  selectCurrentPage,
  selectDrinksPerPage,
  selectMaxShowablePages
} from "store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  resetCurrentCocktail
} from "store/slices";
import { AppDispatch } from "store/store";
import { PaginationFooter } from "components/PaginationFooter/PaginationFooter";

export const PaginationFooterContainer: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cocktails = useSelector(selectCocktails);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const currentCocktailStatus = useSelector(selectCurrentCocktailStatus);

  const cocktailListStatus = useSelector(selectCocktailListStatus);

  const currentPage = useSelector(selectCurrentPage);
  const drinksPerPage = useSelector(selectDrinksPerPage);
  const maxShowablePages = useSelector(selectMaxShowablePages);
  const cocktailPage = useSelector(selectCocktailPage);

  useEffect(() => {
    if (currentCocktailStatus === "failed") {
      dispatch(resetCurrentCocktail);
    }
    if (currentCocktailStatus === "succeeded" && cocktailListStatus === "succeeded") {
      dispatch(setCurrentPage(cocktailPage));
    } else {
      console.log(currentPage, cocktailPage);
      
      dispatch(setCurrentPage(currentPage ?? cocktailPage ?? 1));
    }
  }, [currentCocktail, cocktails.allIds.length]);


  const paginate = (pageNumber: number) => {
    if (
      pageNumber !== currentPage &&
      currentPage &&
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(cocktails.allIds.length / drinksPerPage)
    ) {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  return (
    <PaginationFooter
      drinksPerPage={drinksPerPage}
      totalDrinks={cocktails.allIds.length}
      paginate={paginate}
      currentPage={currentPage ?? cocktailPage}
      maxShowablePages={maxShowablePages}
    />
  );
};
