/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

const useFetch = (fetchFunction: (...args: any) => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<AxiosError | null>();

  const fetch = useCallback(
    async (...args: any) => {
      setLoading(true);
      setError(null);

      fetchFunction(...args)
        .then((result) => setData(result))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [fetchFunction]
  );

  return { loading, data, error, fetch };
};

export default useFetch;
