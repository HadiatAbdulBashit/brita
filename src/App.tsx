import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";
import News from "./pages/news";
import useSWR from "swr";
import { useEffect } from "react";
import store from "./redux/store";
import { setError, setIsLoading, setMetaData } from "./redux/metaData/metaData";
import { extractNewsMetadata } from "./lib/extract-meta-data";
import AuthLayout from "./layouts/auth";
import Login from "./pages/login";

function App() {
  const { data, error, isLoading } = useSWR(`/top-headlines/sources`);

  useEffect(() => {
    if (error) store.dispatch(setError(error));
    if (isLoading) store.dispatch(setIsLoading(isLoading));
    if (data) {
      const metaData = extractNewsMetadata(data.sources);
      store.dispatch(setMetaData(metaData));
      store.dispatch(setIsLoading(false));
      store.dispatch(setError(null));
    }
  }, [data, error, isLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='news' element={<News />} />
        </Route>
        <Route
          path='login'
          element={
            <AuthLayout title='Login' description='Login to your account'>
              <Login />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
