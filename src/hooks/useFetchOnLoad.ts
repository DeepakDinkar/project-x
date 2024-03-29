/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

const useFetchOnLoad = (fetchFunction: (...args: any) => any, ...args: any) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await fetchFunction(...args);
                setData(result);
            } catch(err: any) {
                setError(new Error(err.message));
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);



    return { loading, data, error };
};

export default useFetchOnLoad;