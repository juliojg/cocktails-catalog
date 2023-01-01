import { useState, useEffect, } from "react";
import { rawToCocktailDetail, rawToCocktailList } from "utils/jsonToCocktail";

export function useFetchCocktailsDetails<T>(defaultValue?: T): [result: T, loading: boolean, isError: boolean] {

  const urlCocktailsList = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass`;
  const urlCocktailDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

  const [result, setResult] = useState<T | any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await fetch(urlCocktailsList);

        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Unable to fetch. ${response.statusText}`);
        }

        const json = await response.json();

        const cocktailsIds = rawToCocktailList(json.drinks);


        const results = Promise.all(
          cocktailsIds.map(async(id) => {
            const detailResponse = await fetch(urlCocktailDetail + id);
            const jsonResponse = await detailResponse.json();
            return rawToCocktailDetail(jsonResponse);
          })
        );

        results.then(s => setResult(s));
        
        setIsError(false);
        setLoading(false);

      } catch (err) {
        setIsError(true);
        setLoading(false);
      }
    };

    if( defaultValue ){
      setLoading(true);
      setResult(defaultValue);
      setLoading(false);
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, []);
  
  return [result, loading, isError];
};

export default useFetchCocktailsDetails;
