import React, { lazy } from "react";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const HomePage = lazy(() =>
  import("../components/HomePage/HomePage").then((module) => ({
    default: module.HomePage
  }))
);
const CocktailListContainer = lazy(() =>
  import("../containers/CocktailListContainer/CocktailListContainer").then(
    (module) => ({ default: module.CocktailListContainer })
  )
);
const CocktailDetailContainer = lazy(() =>
  import("../containers/CocktailDetailContainer/CocktailDetailContainer").then(
    (module) => ({ default: module.CocktailDetailContainer })
  )
);

export const CatalogRouter: React.FC = () => {
  const { t } = useTranslation();
  return (
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
  );
};
