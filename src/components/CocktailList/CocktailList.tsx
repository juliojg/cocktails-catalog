import React from "react";
import "./CocktailList.css";
import { CocktailDetail } from "types/CocktailTypes";
import { CocktailCard } from "components/CocktailCard/CocktailCard";


type CocktailListProps = {
  cocktailList: CocktailDetail[];
};

export const CocktailList: React.FC<CocktailListProps> = ({ cocktailList }) => {
  return (
    <div className="catalog">
      <div className="list-container">
        {cocktailList.map((detail) => (
          <CocktailCard id={detail.id} key={detail.id} detail={detail} />
        ))}
      </div>
    </div>
  );
};
