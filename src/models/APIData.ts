/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIData {
    loading: boolean;
    error: Error | undefined;
    fetch?: (...args: any) => Promise<any>;
}