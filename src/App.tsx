import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";
import News from "./pages/news";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='news' element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
