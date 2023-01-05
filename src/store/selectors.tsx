import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectCurrentPage = (state: RootState) =>
  state.catalog.pagination.currentPage;

export const selectMaxShowablePages = (state: RootState) =>
  state.catalog.pagination.maxShowablePages;
export const selectCocktails = (state: RootState) => state.catalog.cocktails;
export const selectCocktailListStatus = (state: RootState) =>
  state.catalog.cocktails.statusList;
export const selectCocktailListError = (state: RootState) =>
  state.catalog.cocktails.errorList;
export const selectCocktailsDetailsStatus = (state: RootState) =>
  state.catalog.cocktails.statusDetails;
export const selectCocktailsDetailsError = (state: RootState) =>
  state.catalog.cocktails.errorDetails;
export const selectCurrentCocktail = (state: RootState) =>
  state.catalog.currentCocktailDetail.detail;
export const selectCurrentCocktailStatus = (state: RootState) =>
  state.catalog.currentCocktailDetail.status;
export const selectCurrentCocktailError = (state: RootState) =>
  state.catalog.currentCocktailDetail.error;
export const selectDrinksPerPage = (state: RootState) =>
  state.catalog.pagination.drinksPerPage;

export const selectCocktailPage = createSelector(
  selectCurrentCocktail,
  selectCocktailsDetailsError,
  selectCocktails,
  selectDrinksPerPage,
  (detail, error, cocktails, perPage) => {
    if (error) {
      return 1;
    } else if (!detail) {
      return 1;
    } else {
      return Math.ceil(
        (cocktails.allIds.findIndex((x) => x === detail?.id) + 1) / perPage
      );
    }
  }
);

export const selectCurrentCocktails = (state: RootState) =>
  state.catalog.pagination.drinks;
