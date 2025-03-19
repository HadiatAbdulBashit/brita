import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "@/redux/counter/counterSlice";
import metaDataReducer from "@/redux/metaData/metaData";
import newsReducer from "@/redux/news/newsSlice";
import authReducer from "@/redux/auth/authSlice";

export default configureStore({
  reducer: {
    metaData: metaDataReducer,
    counter: counterReducer,
    news: newsReducer,
    auth: authReducer,
  },
});
