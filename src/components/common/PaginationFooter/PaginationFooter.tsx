import React from "react";
import { useTranslation } from "react-i18next";
import "./PaginationFooter.css";

export type PaginationFooterProps = {
  drinksPerPage: number;
  totalDrinks: number;
  paginate: (n: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
  maxShowablePages?: number;
};

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
  drinksPerPage,
  totalDrinks,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  maxShowablePages
}) => {
  const pageNumbers = [];

  const { t } = useTranslation();

  for (let i = 1; i <= Math.ceil(totalDrinks / drinksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          onClick={previousPage}
          className="page-number-arrow"
          role="button"
          tabIndex={0}
          onKeyUp={(e) => e.key === "Enter" && previousPage()}
        >
          {t("footer.previous")}
        </li>
        {(maxShowablePages === undefined ||
          pageNumbers.length <= maxShowablePages) &&
          pageNumbers.map((number) => (
            <li
              key={number}
              role="button"
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
          onClick={nextPage}
          className="page-number-arrow"
          role="button"
          tabIndex={0}
          onKeyUp={(e) => e.key === "Enter" && nextPage()}
        >
          {t("footer.next")}
        </li>
      </ul>
    </div>
  );
};
