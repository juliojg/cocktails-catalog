import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CocktailDetail } from "types/CocktailTypes";
import { rawToCocktailList, rawToCocktailDetail } from "utils/utils";
import { RootState } from "./store";

type Status = "idle" | "loading" | "succeeded" | "failed";
type Error = string | null;

export interface CatalogState {
  pagination: {
    currentPage: number | null;
    drinksPerPage: number;
    maxShowablePages: number;
  };
  cocktails: {
    byId: {
      [id: string]: CocktailDetail | null;
    };
    allIds: string[];
    // Status for cocktails fetched/retrieved to show in current page 
    statusList: Status;
    errorList: Error;
    
    statusDetails: Status;
    errorDetails: Error;
  };
  currentCocktailDetail: {
    detail: CocktailDetail | null;
    status: Status;
    error: Error;
  };
}

const initialState: CatalogState = {
  pagination: {
    drinksPerPage: 4,
    currentPage: null,
    maxShowablePages: 30
  },
  cocktails: {
    byId: {},
    allIds: [],
    statusList: "idle",
    errorList: null,
    statusDetails: "idle",
    errorDetails: null
  },
  currentCocktailDetail: {
    detail: null,
    status: "idle",
    error: null
  }
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCocktailList: (state, action: PayloadAction<CocktailDetail[]>) => {
      state.cocktails.allIds = action.payload.map((x) => x.id);
      state.cocktails.byId = action.payload.reduce(
        (acc, current) => ({ ...acc, [current.id]: null }),
        state.cocktails.byId
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      if (action.payload !== state.pagination.currentPage) {
        state.pagination.currentPage = action.payload;
      }
    },
    setCurrentCocktail: (state, action: PayloadAction<CocktailDetail>) => {
      state.currentCocktailDetail.detail = action.payload;
    },
    resetCurrentCocktail: (state) => {
      state.currentCocktailDetail.detail = null;
      state.currentCocktailDetail.error = null;
      state.currentCocktailDetail.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCocktailList.pending, (state) => {
        state.cocktails.statusList = "loading";
      })
      .addCase(fetchCocktailList.fulfilled, (state, action) => {
        state.cocktails.statusList = "succeeded";
        state.cocktails.allIds = action.payload;
      })
      .addCase(fetchCocktailList.rejected, (state, action) => {
        state.cocktails.statusList = "failed";
        state.cocktails.errorList = action.error.message ?? "";
      })
      .addCase(fetchCocktailListDetails.pending, (state) => {
        state.cocktails.statusDetails = "loading";
      })
      .addCase(fetchCocktailListDetails.fulfilled, (state, action) => {
        state.cocktails.statusDetails = "succeeded";
        state.cocktails.byId = action.payload.reduce(
          (acc, current) => ({ ...acc, [current.id]: current }),
          state.cocktails.byId
        );
      })
      .addCase(fetchCocktailListDetails.rejected, (state, action) => {
        state.cocktails.statusDetails = "failed";
        state.cocktails.errorDetails = action.error.message ?? "";
      })

      .addCase(fetchCocktailById.pending, (state) => {
        state.currentCocktailDetail.status = "loading";
      })
      .addCase(fetchCocktailById.fulfilled, (state, action) => {
        state.currentCocktailDetail.status = "succeeded";
        state.cocktails.byId = {
          ...state.cocktails.byId,
          [action.payload.id]: action.payload
        };
        state.currentCocktailDetail.detail = action.payload;
      })
      .addCase(fetchCocktailById.rejected, (state, action) => {
        state.currentCocktailDetail.status = "failed";
        state.currentCocktailDetail.error = action.error.message ?? "";
      });
  }
});

export const fetchCocktailList = createAsyncThunk(
  "fetchCocktailList",
  async (): Promise<string[]> => {
    const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;
    const response = await fetch(urlCocktailsList)
      .then((r) => r.json())
      .then((json) => {
        return rawToCocktailList(json.drinks);
      });
    return response;
  }
);

export const fetchCocktailListDetails = createAsyncThunk<
  CocktailDetail[],
  string[],
  { state: RootState }
>(
  "fetchCocktailListDetails",
  async (cocktailsIds: string[]): Promise<CocktailDetail[]> => {
    const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
    const response = Promise.all(
      cocktailsIds.map(async (id) => {
        const detailResponse = await fetch(urlCocktailDetail + id);
        const jsonResponse = await detailResponse.json();
        return rawToCocktailDetail(jsonResponse);
      })
    );
    return response;
  }
);

export const fetchCocktailById = createAsyncThunk<
  CocktailDetail,
  string,
  { state: RootState }
>("fetchCocktailById", async (id: string): Promise<CocktailDetail> => {
  const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;
  const response = await fetch(urlCocktailDetail + id)
    .then((r) => r.json())
    .then((json) => Promise.resolve(rawToCocktailDetail(json)))
    .then((cocktail) => {
      if (cocktail.error) {
        throw new ErrorEvent("Cocktail no encontrado");
      } else {
        return Promise.resolve(cocktail);
      }
    });
  return response as CocktailDetail;
});

export const {
  setCocktailList,
  setCurrentPage,
  setCurrentCocktail,
  resetCurrentCocktail
} = catalogSlice.actions;

export default catalogSlice.reducer;
