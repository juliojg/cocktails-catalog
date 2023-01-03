import React from "react";
import "./PaginationFooter.css";

type PaginationFooterProps = {
  drinksPerPage: number;
  totalDrinks: number;
  paginate: (n: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
};

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  drinksPerPage,
  totalDrinks,
  paginate,
  previousPage,
  nextPage,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDrinks / drinksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={previousPage} className="page-number-arrow">
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? "page-current-number" : "page-number"}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="page-number-arrow">
          Next
        </li>
      </ul>
    </div>
  );
};

export default PaginationFooter;
