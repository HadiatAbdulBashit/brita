import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "news",
  initialState: {
    content: null,
  },
  reducers: {
    setNews: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setNews } = counterSlice.actions;

const { reducer: newsReducer } = counterSlice;

export default newsReducer;
