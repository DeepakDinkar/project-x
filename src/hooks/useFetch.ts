import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetch = (fetchFunction: (...args: any) => Promise<any>) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState<Error>();

    const fetch = async () => {
        try {
            const result = await fetchFunction();
            setData(result);
        } catch {
            setError(new Error());
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, error, fetch };
};

export default useFetch;
