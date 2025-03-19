import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/counter/counterSlice";
import newsReducer from "./news/newsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    news: newsReducer,
  },
});
