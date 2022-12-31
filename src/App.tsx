import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "components/Spinner/Spinner";

const Catalog = lazy(() => import("./components/Catalog/Catalog"));
const Home = lazy(() => import("./components/Home/Home"));
const CocktailDetalContainer = lazy(() => import("./containers/CocktailDetailContainer/CocktailDetailContainer"));

function App() {
  return (
    <Router>
      <div className="main">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path='/catalog/drinks/:id' element={<CocktailDetalContainer />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
