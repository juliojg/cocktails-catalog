import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { rawToCocktailDetail } from "utils/utils";

export function useGetDetailById<T>(
  id: string
): [result: T, loading: boolean, isError: boolean] {
  const urlCocktailsDetail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const location = useLocation();
  const detail = location.state?.detail;

  const [result, setResult] = useState<T | any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = function () {
      setLoading(true);
      fetch(urlCocktailsDetail)
        .then((r) => r.json())
        .then((json) => {
          const res = rawToCocktailDetail(json);
          setResult(res);
          setIsError(false);
          setLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
          setLoading(false);
        });
    };

    if (detail) {
      setLoading(true);
      setResult(detail);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  return [result, loading, isError];
}
