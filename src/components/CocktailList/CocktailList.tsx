import React from "react";
import "./CocktailList.css";
import { CocktailDetail } from "types/CocktailTypes";
import { CocktailCard } from "components/CocktailCard/CocktailCard";
import { PaginationFooter } from "components/common/PaginationFooter/PaginationFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  previousPage as previousPageAction,
  nextPage as nextPageAction
} from "store/slices";
import { selectDrinksPerPage } from "store/selectors";

type CocktailListProps = {
  cocktailList: CocktailDetail[];
  currentPage: number;
};

export const CocktailList: React.FC<CocktailListProps> = ({
  cocktailList,
  currentPage
}) => {
  const drinksPerPage = useSelector(selectDrinksPerPage);

  const dispatch = useDispatch();

  const indexOfLastDrink = currentPage * drinksPerPage;
  const indexOfFirstDrink = indexOfLastDrink - drinksPerPage;
  const currentDrinks = cocktailList?.slice(
    indexOfFirstDrink,
    indexOfLastDrink
  );

  const paginate = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      dispatch(previousPageAction());
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(cocktailList.length / drinksPerPage)) {
      dispatch(nextPageAction());
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
