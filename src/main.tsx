import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@/redux/store";
import App from "@/App.tsx";

import "@/index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme='dark' storageKey='brita-ui-theme'>
      <App />
    </ThemeProvider>
  </Provider>
);
