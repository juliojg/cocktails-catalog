import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CocktailDetail } from "types/CocktailTypes";
import { rawToCocktailList, rawToCocktailDetail } from "utils/utils";

type Status = "idle" | "loading" | "succeeded" | "failed";
type Error = string | null;

export interface CatalogState {
  cocktailList: CocktailDetail[];
  status: Status;
  error: Error;
  currentCocktail: CocktailDetail | null;
  currentCocktailStatus: Status;
  currentCocktailError: Error;
  currentPage: number | null;
  drinksPerPage: number;
}

const initialState: CatalogState = {
  cocktailList: [],
  currentCocktail: null,
  status: "idle",
  error: null,
  currentPage: null,
  currentCocktailStatus: "idle",
  currentCocktailError: null,
  drinksPerPage: 4
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCocktailList: (state, action: PayloadAction<CocktailDetail[]>) => {
      state.cocktailList = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      if (action.payload !== state.currentPage) {
        state.currentPage = action.payload;
      }
    },
    nextPage: (state) => {
      if (
        state.currentPage && state.currentPage <
        Math.ceil(state.cocktailList.length / state.drinksPerPage)
      ) {
        ++state.currentPage;
      }
    },
    previousPage: (state) => {
      if (state.currentPage && state.currentPage > 1) {
        --state.currentPage;
      }
    },
    setCurrentCocktail: (state, action: PayloadAction<CocktailDetail>) => {
      state.currentCocktail = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCocktailList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCocktailList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cocktailList = action.payload;
      })
      .addCase(fetchCocktailList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      })
      .addCase(fetchCocktailById.pending, (state) => {
        state.currentCocktailStatus = "loading";
      })
      .addCase(fetchCocktailById.fulfilled, (state, action) => {
        state.currentCocktailStatus = "succeeded";
        state.currentCocktail = action.payload;
      })
      .addCase(fetchCocktailById.rejected, (state, action) => {
        state.currentCocktailStatus = "failed";
        state.currentCocktailError = action.error.message ?? "";
      });
  }
});

export const fetchCocktailList = createAsyncThunk(
  "fetchCocktailList",
  async (): Promise<CocktailDetail[]> => {
    const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;
    const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
    const response = await fetch(urlCocktailsList)
      .then((r) => r.json())
      .then((json) => {
        return Promise.all(
          rawToCocktailList(json.drinks).map(async (id) => {
            const detailResponse = await fetch(urlCocktailDetail + id);
            const jsonResponse = await detailResponse.json();
            return rawToCocktailDetail(jsonResponse);
          })
        );
      });
    return response;
  }
);

export const fetchCocktailById = createAsyncThunk(
  "fetchCocktailById",
  async (id: string): Promise<CocktailDetail> => {
    const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
    const response = await fetch(urlCocktailDetail + id)
      .then((r) => r.json())
      .then((json) => Promise.resolve(rawToCocktailDetail(json)));
    return response;
  }
);

export const {
  setCocktailList,
  setCurrentPage,
  nextPage,
  previousPage,
  setCurrentCocktail
} = catalogSlice.actions;

export default catalogSlice.reducer;
