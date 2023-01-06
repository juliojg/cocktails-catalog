import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Pagination selectors
export const selectCurrentPage = (state: RootState) =>
  state.catalog.pagination.currentPage;
export const selectMaxShowablePages = (state: RootState) =>
  state.catalog.pagination.maxShowablePages;
export const selectDrinksPerPage = (state: RootState) =>
  state.catalog.pagination.drinksPerPage;

// CocktailList selectors
export const selectCocktails = (state: RootState) => state.catalog.cocktails;
export const selectCocktailListStatus = (state: RootState) =>
  state.catalog.cocktails.statusList;
export const selectCocktailListError = (state: RootState) =>
  state.catalog.cocktails.errorList;

// Status for cocktails fetched/retrieved to show in current page 
export const selectCocktailsDetailsStatus = (state: RootState) =>
  state.catalog.cocktails.statusDetails;
export const selectCocktailsDetailsError = (state: RootState) =>
  state.catalog.cocktails.errorDetails;

// CurrentCocktail selectors
export const selectCurrentCocktail = (state: RootState) =>
  state.catalog.currentCocktailDetail.detail;
export const selectCurrentCocktailStatus = (state: RootState) =>
  state.catalog.currentCocktailDetail.status;
export const selectCurrentCocktailError = (state: RootState) =>
  state.catalog.currentCocktailDetail.error;

// Derive ids to show based on current page
export const selectCocktailsIdsToShow = createSelector(
  selectCocktails,
  selectCurrentPage,
  selectDrinksPerPage,
  (cocktails, currentPage, drinksPerPage) => {
    const idsToShow = cocktails.allIds.filter((id, index) => {
      const offset = (currentPage ?? 1 - 1) * drinksPerPage + 1;
      const firstIndex = offset - 1 - drinksPerPage;
      const lastIndex = firstIndex + drinksPerPage;
      return index >= firstIndex && index < lastIndex;
    });
    return idsToShow;
  }
);

// Get cocktails to show from state
export const selectCocktailsToShow = createSelector(
  selectCocktails,
  selectCocktailsIdsToShow,
  (cocktails, idsToShow) => {
    if (idsToShow.every((x) => cocktails.byId[x])) {
      return idsToShow.map((x) => cocktails.byId[x]);
    } else return [];
  }
);

// Check if cocktails has been retrieved
export const selectGotTheCocktails = createSelector(
  selectCocktails,
  selectCocktailsIdsToShow,
  (cocktails, ids) => ids.every((x) => cocktails.byId[x])
);

// Check if cocktail has been retrieved
export const selectGotTheCocktailDetail = (cocktailId: string) =>
  createSelector(selectCocktails, (cocktails) => !!cocktails.byId[cocktailId]);

// Derive in which page a cocktail is, used when accessed by direct id on browser
export const selectCocktailPage = createSelector(
  selectCurrentCocktail,
  selectCocktailsDetailsError,
  selectCocktails,
  selectCurrentPage,
  selectDrinksPerPage,
  (detail, error, cocktails, currentPage, perPage) => {
    const cocktailPosition =
      cocktails.allIds.findIndex((x) => x === detail?.id) + 1;
    if (error) {
      return 1;
    } else if (currentPage) {
      return currentPage;
    } else if (cocktailPosition) {
      return Math.ceil(cocktailPosition / perPage);
    }
  }
);
