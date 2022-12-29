import React from "react";
import './CocktailCard.css';

type CocktailDetailProps = {
  title: string;
  imageUrl: string;
};

export const CocktailDetail: React.FC<CocktailDetailProps> = ({
  title,
  imageUrl
}) => {
  return (
    <div>
      {title}
      <img src={imageUrl} alt={`${title} cocktail`}/>
    </div>
  );
};
