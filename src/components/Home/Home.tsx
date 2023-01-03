import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useTranslation } from "react-i18next";

const Home: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <div className={"home"}>
      <Link to="/drinks" className="link">
        <div>{t("titles.catalog")}</div>
      </Link>
    </div>
  );
};

export default Home;
