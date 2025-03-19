import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/redux/counter/counterSlice";
import newsReducer from "@/redux/news/newsSlice";
import metaDataReducer from "@/redux/metaData/metaData";

export default configureStore({
  reducer: {
    metaData: metaDataReducer,
    counter: counterReducer,
    news: newsReducer,
  },
});
