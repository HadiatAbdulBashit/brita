import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import store from "@/redux/store";
import App from "@/App.tsx";

import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme='dark' storageKey='brita-ui-theme'>
      <SWRConfig
        value={{
          fetcher: (url, init) =>
            fetch("/api" + url, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              },
              ...init,
            }).then((res) => res.json()),
        }}
      >
        <App />
        <Toaster richColors />
      </SWRConfig>
    </ThemeProvider>
  </Provider>
);
