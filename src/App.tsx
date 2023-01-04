import React, { lazy, Suspense, useRef } from "react";
import "./App.css";
import "./styles/colors.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Spinner from "components/common/Spinner/Spinner";

import { CocktailDetail } from "types/CocktailTypes";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import { useTranslation } from "react-i18next";

const HomePage = lazy(() => import("./components/HomePage/HomePage").then(module => ({ default: module.HomePage })));
const CocktailListContainer = lazy(
  () => import("./containers/CocktailListContainer/CocktailListContainer").then(module => ({ default: module.CocktailListContainer }))
);
const CocktailDetailContainer = lazy(
  () => import("./containers/CocktailDetailContainer/CocktailDetailContainer").then(module => ({ default: module.CocktailDetailContainer }))
);

export type CatalogStateType = {
  list?: CocktailDetail[];
  currentPage?: number;
};

export const CatalogContext = React.createContext<React.MutableRefObject<any>>(undefined as any);


function App() {
  const catalogState = useRef({});
  const { t } = useTranslation();

  return (
    <CatalogContext.Provider value={catalogState}>
      <Router>
        <div className="main no-select">
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
    </CatalogContext.Provider>
  );
}

export default App;
