import { BrowserRouter, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useSWR from "swr";

import ProtectedRoute from "@/components/protected-route";
import DefaultLayout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import Register from "@/pages/register";
import Profile from "@/pages/profile";
import Search from "@/pages/search";
import Login from "@/pages/login";
import Home from "@/pages/home";
import News from "@/pages/news";

import store from "@/redux/store";

import { setError, setIsLoading, setMetaData } from "@/redux/metaData/metaData";

import { extractNewsMetadata } from "@/lib/extract-meta-data";

function App() {
  const { data, error, isLoading } = useSWR(`/top-headlines/sources`);
  const { isAuthenticated } = useSelector((state: any) => state.auth);

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
          <Route path='search' element={<Search />} />
        </Route>
        <Route element={<ProtectedRoute condition={!isAuthenticated} target='/' />}>
          <Route
            path='login'
            element={
              <AuthLayout title='Log in to your account' description='Enter your email and password below to log in'>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path='register'
            element={
              <AuthLayout title='Create an account' description='Enter your details below to create your account'>
                <Register />
              </AuthLayout>
            }
          />
        </Route>
        <Route element={<ProtectedRoute condition={isAuthenticated} target='/' />}>
          <Route element={<DefaultLayout />}>
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<DefaultLayout />}>
          <Route path='*' element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
