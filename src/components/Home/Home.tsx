import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC<{}> = () => {
  return (
    <div className={"home"}>
      <Link to="/drinks" className="link">
        <div>Catálogo </div>
      </Link>
    </div>
  );
};

export default Home;
