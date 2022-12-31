import React from "react";
import { Link } from "react-router-dom";
import { Ingredient } from "types/CocktailTypes";
import "./CocktailDetail.css";

type CocktailDetailProps = {
  title: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string;
};

const CocktailDetail: React.FC<CocktailDetailProps> = ({
  title,
  imageUrl,
  ingredients,
  instructions
}) => {
  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="title">
  
          {title} <Link to={"/catalog"} className={"button-back"}> X </Link>
        </div>
        <img className="thumbnail" src={imageUrl} alt={`${title} cocktail`} />
        <div className="description">
          <ul>
            {ingredients.map((ingr, index) => (
              <li key={index}>
                {" "}
                {ingr.measure}
                {"- "}
                {ingr.name}
              </li>
            ))}
          </ul>
          <div className="legend"> How to prepare: </div>
          {instructions}
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
