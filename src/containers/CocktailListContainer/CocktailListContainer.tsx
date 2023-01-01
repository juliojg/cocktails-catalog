import CocktailList from "components/CocktailList/CocktailList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import Spinner from "components/Spinner/Spinner";
import useFetchCocktailsDetails from "hooks/useFetchCocktailsDetails";
import React from "react";
import { CocktailDetail } from "types/CocktailTypes";

const CocktailListContainer: React.FC<{}> = () => {
  const [cocktailList, loadingCocktailList, errorCocktailList] = useFetchCocktailsDetails<CocktailDetail[]>();

  return errorCocktailList ? (
    <ErrorPage
      description="Error al cargar la lista de cocktails, presione para volver a Inicio"
      redirectionLocation="/"
    />
  ) : loadingCocktailList ? (
    <Spinner />
  ) : (
    <CocktailList cocktailList={cocktailList} />
  );
};

export default CocktailListContainer;
