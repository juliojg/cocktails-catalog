import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

type ErrorPageProps = {
  description: string;
  redirectionLocation: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  description,
  redirectionLocation
}) => {
  return (
    <div className={"error-page"}>
      <Link to={redirectionLocation} className="link">
        {description}
      </Link>
    </div>
  );
};

export default ErrorPage;
