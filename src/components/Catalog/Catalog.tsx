import React from "react";
import "./Catalog.css";
import { rawToCocktail } from "utils/jsonToCocktail";
import useFetch from "hooks/useFetch";
import Spinner from "components/Spinner/Spinner";
import CocktailContainer from "containers/CocktailContainer/CocktailContainer";
import { Cocktail } from "types/CocktailTypes";
import ErrorPage from "components/ErrorPage/ErrorPage";

const Catalog: React.FC<{}> = () => {
  const urlCocktails = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;

  const [cocktailList, loadingCocktailList, errorCocktailList] = useFetch<Cocktail[]>(urlCocktails, (raw) => rawToCocktail(raw.drinks));

  return (
    <div className="catalog">
      {
      errorCocktailList ? <ErrorPage description="Error al cargar la lista de cocktails, presione para volver a Inicio" redirectionLocation="/"/> :
      loadingCocktailList ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="list-container">
          {cocktailList?.map((data, index) => (
            <CocktailContainer
            cocktailId={data.idDrink}
            key={data.idDrink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
