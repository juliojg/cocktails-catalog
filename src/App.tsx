import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "components/Spinner/Spinner";

const Home = lazy(() => import("./components/Home/Home"));
const Catalog = lazy(() => import("./components/Catalog/Catalog"));
const CocktailDetailContainer = lazy(() => import("./containers/CocktailDetailContainer/CocktailDetailContainer"));


function App() {
  return (
    <Router>
      <div className="main">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drinks" element={<Catalog />} />
            <Route path='/drinks/:id' element={<CocktailDetailContainer />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
