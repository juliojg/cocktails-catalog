import { RootState } from "./store";

export const selectCurrentPage = (state: RootState) =>
  state.catalog.currentPage;
export const selectCocktailList = (state: RootState) =>
  state.catalog.cocktailList;
export const selectCocktailListStatus = (state: RootState) =>
  state.catalog.status;
export const selectCocktailListError = (state: RootState) =>
  state.catalog.error;
export const selectCurrentCocktail = (state: RootState) =>
  state.catalog.currentCocktail;
export const selectCurrentCocktailStatus = (state: RootState) =>
  state.catalog.currentCocktailStatus;
export const selectCurrentCocktailError = (state: RootState) =>
  state.catalog.currentCocktailError;
  export const selectDrinksPerPage = (state: RootState) =>
  state.catalog.drinksPerPage;
