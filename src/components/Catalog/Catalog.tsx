import React from 'react';
import { CocktailCard } from "../CocktailCard/CocktailCard";
import "./Catalog.css";
import { rawToCocktail } from "utils/jsonToCocktail";
import useFetch from "hooks/useFetch";

const Catalog: React.FC<{}> = () => {

  const urlCocktails = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;

  const [rawCocktails, loadingCocktails] = useFetch(urlCocktails);

  const cocktailList = rawToCocktail(rawCocktails?.drinks);
  
  return (
    <div className="catalog">
      <div className="catalog-header"> HEADER </div>
      <div className="list-container">
        <div className="cocktail-list">
          {loadingCocktails ? 'Cargando...' : cocktailList?.map((data, index) => (
            <CocktailCard key={data.idDrink} title={data.strDrink} imageUrl={data.strDrinkThumb} id={data.idDrink}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
