import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useTranslation } from "react-i18next";

const HomePage: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <div className={"home"}>
      <Link to="/drinks" className="link">
        <div>{t("titles.catalog")}</div>
      </Link>
    </div>
  );
};

export default HomePage;
