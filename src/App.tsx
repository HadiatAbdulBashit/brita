import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
