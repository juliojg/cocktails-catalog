import { CatalogContext } from "context/CatalogContext";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { selectCocktailList } from "store/selectors";
import { fetchCocktailList, setCocktailList } from "store/slices";
import { rawToCocktailDetail, rawToCocktailList } from "utils/utils";

export function useGetList<T>(): [
  result: T,
  loading: boolean,
  isError: boolean
] {
  const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;
  const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

  const [result, setResult] = useState<T | any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const cocktailList = selectCocktailList;

  const dispatch = useDispatch()
  // dispatch(fetchCocktailList);
  // const state = useContext(CatalogContext);

  const fetchData = function () {
    setLoading(true);
    fetch(urlCocktailsList)
      .then((r) => r.json())
      .then((json) => {
        return Promise.all(
          rawToCocktailList(json.drinks).map(async (id) => {
            const detailResponse = await fetch(urlCocktailDetail + id);
            const jsonResponse = await detailResponse.json();
            return rawToCocktailDetail(jsonResponse);
          })
        );
      })
      .then((cocktailList) => {
        dispatch(setCocktailList(cocktailList))
        // state.current.list = cocktailList;
        setResult(cocktailList);
        setLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (cocktailList.length !== 0) {
      setResult(cocktailList);
    } else {
      fetchData();
    }
  }, [cocktailList])

  return [result, loading, isError];
}
