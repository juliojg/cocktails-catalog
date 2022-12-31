import Spinner from "components/Spinner/Spinner";
import React from "react";
import { Link } from "react-router-dom";
import { Ingredient } from "types/CocktailTypes";
import "./CocktailCard.css";

type CocktailCardProps = {
  title: string;
  imageUrl: string;
  id: string;
  ingredients: Ingredient[];
  loading: boolean;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({
  id,
  title,
  imageUrl,
  ingredients,
  loading
}) => {
  return (
    <Link to={`/drinks/${id}`} className="cocktail-card">
      {loading ? <Spinner /> :
      <React.Fragment>
        <div className="text">
          <div className="title">{title}</div>
          <div className="description">
            <ul>
              {ingredients?.slice(0, 2).map((ingr, index) => (
                <li key={index}> {ingr.name} </li>
              ))}
            </ul>
            {ingredients?.length > 2 && (
              <div className="legend">
                y {ingredients.length - 2} ingredientes más
              </div>
            )}
          </div>
        </div>
        <img className="thumbnail" src={imageUrl} alt={`${title} cocktail`} />
      </React.Fragment>}
    </Link>
  );
};
