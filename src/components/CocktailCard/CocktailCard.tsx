import useFetch from "hooks/useFetch";
import React from "react";
import { rawToCocktailDetail } from "utils/jsonToCocktail";
import "./CocktailCard.css";

type CocktailCardProps = {
  title: string;
  imageUrl: string;
  id: string;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({
  title,
  imageUrl,
  id
}) => {

  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [rawCocktailDetail] = useFetch(urlCocktailsDetail);

  const detail = rawToCocktailDetail(rawCocktailDetail?.drinks[0]);

  return (
    <div className="cocktail-card">
      <div className="text">
        <div className="title">{title}</div>
        <div className="description">
          <ul>
            {detail.ingredients.slice(0, 2).map((ingr, index) => (
              <li key={index}> {ingr} </li>
            ))}
          </ul>
          {detail.ingredients.length > 2 && <div className="legend">y { detail.ingredients.length - 2} ingredientes más</div>}
        </div>
      </div>
      <img className="thumbnail" src={imageUrl} alt={`${title} cocktail`} />
    </div>
  );
};
