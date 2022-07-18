import { AxiosRequestConfig } from "axios";

/**
 * P: the api data patameters
 * R: request's return value
 */
export type RequestWithHeaders<P extends Object, R> = (data: P, headers?: AxiosRequestConfig) => Promise<R>