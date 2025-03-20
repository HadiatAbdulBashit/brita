import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const latestNews = localStorage.getItem("latestNews");

  return JSON.parse(latestNews || "{}");
};

let initialState = getInitialState();

export const counterSlice = createSlice({
  name: "news",
  initialState: {
    content: initialState,
  },
  reducers: {
    setNews: (state, action) => {
      state.content = action.payload;
      localStorage.setItem("latestNews", JSON.stringify(action.payload));
    },
  },
});

export const { setNews } = counterSlice.actions;

const { reducer: newsReducer } = counterSlice;

export default newsReducer;
