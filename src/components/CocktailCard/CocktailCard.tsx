import React from "react";
import { Link } from "react-router-dom";
import { CocktailDetail } from "types/CocktailTypes";
import "./CocktailCard.css";
import { useTranslation } from "react-i18next";

type CocktailCardProps = {
  id: string;
  detail: CocktailDetail;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({ id, detail }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/drinks/${id}`}
      state={{ detail: detail as CocktailDetail }}
      className="cocktail-card"
    >
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
              {t("cardLabel.moreIngredients")}
            </div>
          )}
        </div>
      </div>
      <img
        className="thumbnail"
        src={detail?.strDrinkThumb}
        alt={`${detail?.strDrink} cocktail`}
      />
    </Link>
  );
};
