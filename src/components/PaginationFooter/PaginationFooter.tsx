import React from "react";
import { useTranslation } from "react-i18next";
import "./PaginationFooter.css";

export type PaginationFooterProps = {
  drinksPerPage: number;
  totalDrinks: number;
  paginate: (n: number) => void;
  currentPage: number;
  maxShowablePages: number;
  showUI: boolean;
};

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
  drinksPerPage,
  totalDrinks,
  paginate,
  currentPage,
  maxShowablePages,
  showUI
}) => {
  const pageNumbers = [];

  const { t } = useTranslation();
  for (let i = 1; i <= Math.ceil(totalDrinks / drinksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {showUI &&
      <ul className="pagination">
        <li
          onClick={() => paginate(currentPage - 1)}
          className="page-number-arrow"
          tabIndex={0}
          onKeyUp={(e) => e.key === "Enter" && (() => paginate(currentPage - 1))}
        >
          {t("footer.previous")}
        </li>
        {(maxShowablePages === undefined ||
          pageNumbers.length <= maxShowablePages) &&
          pageNumbers.map((number) => (
            <li
              key={number}
              tabIndex={0}
              className={
                currentPage === number ? "page-current-number" : "page-number"
              }
              onClick={() => paginate(number)}
              onKeyUp={(e) => e.key === "Enter" && paginate(number)}
            >
              {number}
            </li>
          ))}
        <li
          onClick={(() => paginate(currentPage + 1))}
          className="page-number-arrow"
          tabIndex={0}
          onKeyUp={(e) => e.key === "Enter" && (() => paginate(currentPage + 1))}
        >
          {t("footer.next")}
        </li>
      </ul>}
    </div>
  );
};
