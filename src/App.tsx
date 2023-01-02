import React, { lazy, Suspense, useRef } from "react";
import "./App.css";
import "./styles/colors.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "components/Spinner/Spinner";
import { CocktailDetail } from "types/CocktailTypes";

const Home = lazy(() => import("./components/Home/Home"));
const CocktailListContainer = lazy(
  () => import("./containers/CocktailListContainer/CocktailListContainer")
);
const CocktailDetailContainer = lazy(
  () => import("./containers/CocktailDetailContainer/CocktailDetailContainer")
);

export const CocktailListContext = React.createContext(undefined as any);

function App() {
  const state = useRef<{value: CocktailDetail[]}| undefined>(undefined);

  return (
    <CocktailListContext.Provider value={state}>
      <Router>
        <div className="main">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<CocktailListContainer />} />
              <Route path="/drinks/:id" element={<CocktailDetailContainer />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </CocktailListContext.Provider>
  );
}

export default App;
