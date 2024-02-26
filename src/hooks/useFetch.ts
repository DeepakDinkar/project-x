/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

const useFetch = (fetchFunction: (...args: any) => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<AxiosError | null>();

  const fetch = useCallback(
    async (...args: any) => {
      resetState();
      return fetchFunction(...args)
        .then((result) => {
          setData(result);
          return result;
        })
        .catch((error) => {
          setError(error.response?.data ?? error);
          return Promise.reject(error.response?.data ?? error);
        })
        .finally(() => setLoading(false));
    },
    [fetchFunction]
  );

  const resetState = () => {
    setLoading(true);
    setError(null);
    setData(null);
  };

  return { loading, data, error, fetch };
};

export default useFetch;
