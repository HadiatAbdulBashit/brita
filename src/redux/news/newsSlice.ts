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
    search: {
      keyword: "",
      searchIn: ["title", "description", "content"],
      domains: "",
      excludeDomains: "",
      from: "",
      to: "",
      language: "",
      sortBy: "",
    },
  },
  reducers: {
    setNews: (state, action) => {
      state.content = action.payload;
      localStorage.setItem("latestNews", JSON.stringify(action.payload));
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setNews, setSearch } = counterSlice.actions;

const { reducer: newsReducer } = counterSlice;

export default newsReducer;
