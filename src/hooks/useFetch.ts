/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const useFetch = (fetchFunction: (...args: any) => any) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error>();

    const fetch = async (...args: any) => {
        try {
            const result = await fetchFunction(...args);
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
