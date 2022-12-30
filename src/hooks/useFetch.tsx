import { useState, useEffect } from "react";

export const useFetch = (url: string): [result: any, loading: boolean, isError: boolean] => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Unable to fetch. ${response.statusText}`);
        }

        const json = await response.json();

        setResult(json);
        setIsError(false);
        setLoading(false);

      } catch (err) {
        setIsError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  
  return [result, loading, isError];
};

export default useFetch;
