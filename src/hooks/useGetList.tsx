import { CatalogContext } from "App";
import { useState, useEffect, useContext } from "react";
import { rawToCocktailDetail, rawToCocktailList } from "utils/jsonToCocktail";

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

  const state = useContext(CatalogContext);

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
        state.current.list = cocktailList;
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
    if (state.current.list) {
      setResult(state.current.list);
    } else {
      fetchData();
    }
  }, []);

  return [result, loading, isError];
}
