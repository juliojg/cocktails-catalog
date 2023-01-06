import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CocktailDetail } from "types/CocktailTypes";
import "./CocktailCard.css";
import { useTranslation } from "react-i18next";
import { MiniSpinner } from "components/common/Spinner/Spinner";

type CocktailCardProps = {
  id: string;
  detail: CocktailDetail;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({ id, detail }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <Link to={`/drinks/${id}`} className="cocktail-card">
      <div className="text">
        <div className="title">{detail?.strDrink}</div>
        <div className="description">
          <ul>
            {detail?.ingredients?.slice(0, 2).map((ingr, index) => (
              <li key={index}> {ingr.name} </li>
            ))}
          </ul>
          {detail?.ingredients?.length > 2 && (
            <div className="legend">
              {t("cardLabel.and")} {detail?.ingredients.length - 2}
              {" " + t("cardLabel.moreIngredients")}
            </div>
          )}
        </div>
      </div>
      <div className="image-container">
      <img
        className="thumbnail"
        src={detail?.strDrinkThumb}
        alt={`${detail?.strDrink} cocktail`}
        onLoad={imageLoaded}
      />
      {loading && <span className="image-spinner-container"><MiniSpinner/></span>}
      </div>
    </Link>
  );
};
