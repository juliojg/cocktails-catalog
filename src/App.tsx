import React, { lazy, Suspense, useRef } from "react";
import "./App.css";
import "./styles/colors.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "components/Spinner/Spinner";

import { CocktailDetail } from "types/CocktailTypes";
import ErrorPage from "components/ErrorPage/ErrorPage";
import { useTranslation } from "react-i18next";

const HomePage = lazy(() => import("./components/HomePage/HomePage").then(module => ({ default: module.HomePage })));
const CocktailListContainer = lazy(
  () => import("./containers/CocktailListContainer/CocktailListContainer").then(module => ({ default: module.CocktailListContainer }))
);
const CocktailDetailContainer = lazy(
  () => import("./containers/CocktailDetailContainer/CocktailDetailContainer").then(module => ({ default: module.CocktailDetailContainer }))
);

export const CocktailListContext = React.createContext(undefined as any);

function App() {
  const state = useRef<{ value: CocktailDetail[] } | undefined>(undefined);
  const { t } = useTranslation();

  return (
    <CocktailListContext.Provider value={state}>
      <Router>
        <div className="main">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/drinks" element={<CocktailListContainer />} />
              <Route path="/drinks/:id" element={<CocktailDetailContainer />} />
              <Route
                path="*"
                element={
                  <ErrorPage
                    description={t("error.404")}
                    redirectionLocation="/"
                  />
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </CocktailListContext.Provider>
  );
}

export default App;
