import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@/redux/store";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
