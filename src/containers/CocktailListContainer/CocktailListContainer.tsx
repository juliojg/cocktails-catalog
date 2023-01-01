import CocktailList from "components/CocktailList/CocktailList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import Spinner from "components/Spinner/Spinner";
import useFetchCocktailsDetails from "hooks/useFetchCocktails";
import React from "react";
import { CocktailDetail } from "types/CocktailTypes";

const CocktailListContainer: React.FC<{}> = () => {

  // const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;

  // const [cocktailList, loadingCocktailList, errorCocktailList] = useFetch<
  //   string[]
  // >(urlCocktailsList, (raw) => rawToCocktailList(raw.drinks));

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
