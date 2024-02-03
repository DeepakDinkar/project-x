/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

const useFetch = (fetchFunction: (...args: any) => any) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<Error>();

  const fetch = useCallback(async (...args: any) => {
    setLoading(true);
    try {
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch {
      setError(new Error());
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return { loading, data, error, fetch };
};

export default useFetch;
