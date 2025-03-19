import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "@/redux/store";
import App from "@/App.tsx";

import "@/index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SWRConfig } from "swr";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme='dark' storageKey='brita-ui-theme'>
      <SWRConfig
        value={{
          fetcher: (url, init) =>
            fetch(import.meta.env.VITE_API_BASE_URL + url, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
              ...init,
            }).then((res) => res.json()),
        }}
      >
        <App />
      </SWRConfig>
    </ThemeProvider>
  </Provider>
);
