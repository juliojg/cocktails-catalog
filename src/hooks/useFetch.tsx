import { useState, useEffect } from "react";

function useFetch<T>(
  url: string,
  transformFn: (raw: any) => T,
  defaultValue?: T
): [result: T, loading: boolean, isError: boolean] {
  const [result, setResult] = useState<T | any>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = function () {
      setLoading(true);
      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          transformFn ? setResult(transformFn(json)) : setResult(json);
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
      setLoading(true);
      setResult(defaultValue);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  return [result, loading, isError];
}

export default useFetch;
