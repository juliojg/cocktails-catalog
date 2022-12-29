import React from "react";
import { CocktailCard } from "../CocktailCard/CocktailCard";
import { test_cocktail_list } from "../../mocks/cocktails";
import "./Catalog.css";

export const Catalog: React.FC<{}> = () => {
  return (
    <div className="catalog">
      <div className="catalog-header"> HEADER </div>
      <div className="list-container">
        <div className="cocktail-list">
          {test_cocktail_list.map((data) => (
            <CocktailCard title={data.strDrink} imageUrl={data.strDrinkThumb} />
          ))}
        </div>
      </div>
    </div>
  );
};
