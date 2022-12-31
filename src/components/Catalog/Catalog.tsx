import React from "react";
import { CocktailCard } from "../CocktailCard/CocktailCard";
import "./Catalog.css";
import { rawToCocktail } from "utils/jsonToCocktail";
import useFetch from "hooks/useFetch";
import Spinner from "components/Spinner/Spinner";

const Catalog: React.FC<{}> = () => {
  const urlCocktails = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;

  const [rawCocktails, loadingCocktails] = useFetch(urlCocktails);

  const cocktailList = rawToCocktail(rawCocktails?.drinks);

  return (
    <div className="catalog">
      {loadingCocktails ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="list-container">
          {cocktailList?.map((data, index) => (
            <CocktailCard
              key={data.idDrink}
              title={data.strDrink}
              imageUrl={data.strDrinkThumb}
              id={data.idDrink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
