import { useState, useEffect } from "react";
import { rawToCocktailDetail, rawToCocktailList } from "utils/jsonToCocktail";

export function useFetchCocktailsDetails<T>(
  defaultValue?: T
): [result: T, loading: boolean, isError: boolean] {
  const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;
  const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

  const [result, setResult] = useState<T | any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = function () {
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
          setResult(cocktailList);
          setIsError(false);
          setLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
          setLoading(false);
        });
    };

    if (defaultValue) {
      setResult(defaultValue);
    } else {
      setLoading(true);
      fetchData();
    }
  }, []);

  return [result, loading, isError];
}

export default useFetchCocktailsDetails;
