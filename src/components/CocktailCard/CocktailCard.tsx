import React from "react";
import { Link } from "react-router-dom";
import { CocktailDetail } from "types/CocktailTypes";
import "./CocktailCard.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCurrentCocktail } from "store/slices";

type CocktailCardProps = {
  id: string;
  detail: CocktailDetail;
};

export const CocktailCard: React.FC<CocktailCardProps> = ({ id, detail }) => {

  const dispatch = useDispatch();
  
  const { t } = useTranslation();
  return (
    <Link
      to={`/drinks/${id}`}
      className="cocktail-card"
      onClick={() => dispatch(setCurrentCocktail(detail))}
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
              {" " + t("cardLabel.moreIngredients")}
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
