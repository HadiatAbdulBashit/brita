import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "metaData",
  initialState: {
    categories: null,
    languages: null,
    countries: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setMetaData: (state, action) => {
      state.categories = action.payload.categories;
      state.languages = action.payload.languages;
      state.countries = action.payload.countries;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMetaData, setIsLoading, setError } = counterSlice.actions;

const { reducer: metaDataReducer } = counterSlice;

export default metaDataReducer;
