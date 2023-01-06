import React, { lazy, useEffect } from "react";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { fetchCocktailList } from "store/slices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";

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

export const CatalogRoutes = () => {
  const { t } = useTranslation();
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCocktailList());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/drinks" element={<CocktailListContainer />} />
      <Route path="/drinks/:id" element={<CocktailDetailContainer />} />
      <Route
        path="*"
        element={
          <ErrorPage description={t("error.404")} redirectionLocation="/" />
        }
      />
    </Routes>
  );
};

export const CatalogRouter: React.FC = () => {
  return (
    <Router>
      <div className="main no-select">
        <Suspense fallback={<Spinner />}>
          <CatalogRoutes />
        </Suspense>
      </div>
    </Router>
  );
};
