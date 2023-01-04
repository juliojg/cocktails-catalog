import React, { useContext, useEffect, useState } from "react";
import "./CocktailList.css";
import { CocktailDetail } from "types/CocktailTypes";
import { CocktailCard } from "components/CocktailCard/CocktailCard";
import { PaginationFooter } from "components/common/PaginationFooter/PaginationFooter";
import { CatalogContext } from "App";

type CocktailListProps = {
  cocktailList: CocktailDetail[];
};

export const CocktailList: React.FC<CocktailListProps> = ({ cocktailList }) => {
  const state = useContext(CatalogContext);
  const [drinksPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(
    state.current.currentPage ?? 1
  );

  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = cocktailList?.slice(
    indexOfFirstDrink,
    indexOfLastDrink
  );

  useEffect(() => {
    state.current = { list: state.current.list, currentPage: currentPage };
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(cocktailList?.length / drinksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="catalog">
      <div className="list-container">
        {currentDrinks?.map((detail) => (
          <CocktailCard id={detail.id} key={detail.id} detail={detail} />
        ))}
        <PaginationFooter
          drinksPerPage={drinksPerPage}
          totalDrinks={cocktailList?.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          maxShowablePages={30}
        />
      </div>
    </div>
  );
};
