import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Ingredient } from "types/CocktailTypes";
import "./CocktailDetail.css";
import { useTranslation } from "react-i18next";
import { MediumSpinner } from "components/common/Spinner/Spinner";

export type CocktailDetailProps = {
  title: string;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string;
};

export const CocktailDetail: React.FC<CocktailDetailProps> = ({
  title,
  imageUrl,
  ingredients,
  instructions
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="title">
          {title}
          <Link to={"/drinks"} className={"button-back"}>
            X
          </Link>
        </div>
        <div className="detail-image-container">
          <img
            className="thumbnail"
            src={imageUrl}
            alt={`${title} cocktail`}
            onLoad={imageLoaded}
          />
          {loading && (
            <span className="detail-image-spinner-container">
              <MediumSpinner />
            </span>
          )}
        </div>
        <div className="description">
          <ul>
            {ingredients?.map((ingr, index) => (
              <li key={index}>{`${ingr.measure} - ${ingr.name}`}</li>
            ))}
          </ul>
          <div className="legend"> {t("titles.instructions")}: </div>
          {instructions}
        </div>
      </div>
    </div>
  );
};
