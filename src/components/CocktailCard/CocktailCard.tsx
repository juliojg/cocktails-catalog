import React from "react";
import "./CocktailCard.css";

type CocktailCardProps = {
  title: string;
  imageUrl: string;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({
  title,
  imageUrl
}) => {
  return (
    <div className="cocktail-card">
      <div className="text">
        <div className="title">{title}</div>
        <div className="description">
          <ul>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>

          </ul>
        </div>
      </div>
      <img className="thumbnail" src={imageUrl} alt={`${title} cocktail`} />
    </div>
  );
};
