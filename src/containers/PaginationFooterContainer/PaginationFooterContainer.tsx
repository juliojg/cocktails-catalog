import React, { useEffect } from "react";
import {
  selectCocktailPage,
  selectCocktails,
  selectCocktailsIdsToShow,
  selectCurrentCocktail,
  selectCurrentPage,
  selectDrinksPerPage,
  selectGotTheCocktails,
  selectMaxShowablePages
} from "store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  fetchCocktailListDetails
} from "store/slices";
import { AppDispatch } from "store/store";
import { PaginationFooter } from "components/PaginationFooter/PaginationFooter";

export const PaginationFooterContainer: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cocktails = useSelector(selectCocktails);
  const currentCocktail = useSelector(selectCurrentCocktail);
  const cocktailsIdsToShow = useSelector(selectCocktailsIdsToShow);
  const gotTheCocktails = useSelector(selectGotTheCocktails);
  const currentPage = useSelector(selectCurrentPage);
  const drinksPerPage = useSelector(selectDrinksPerPage);
  const maxShowablePages = useSelector(selectMaxShowablePages);
  const cocktailPage = useSelector(selectCocktailPage);

  useEffect(() => {
    if (cocktails.allIds.length) {
      dispatch(setCurrentPage(cocktailPage ?? 1));
    }
  }, [currentCocktail, cocktails.allIds.length]);

  useEffect(() => {
    if (!gotTheCocktails) {
      dispatch(fetchCocktailListDetails(cocktailsIdsToShow));
    }
  }, [JSON.stringify(cocktailsIdsToShow), currentPage]);

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
      currentPage={currentPage ?? cocktailPage ?? 1}
      maxShowablePages={maxShowablePages}
    />
  );
};
