import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";

const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL
};

type Method = 'get' | 'post' | 'delete'

type ApiClient<T> = {
  isBusy: boolean
  errorMessage: string | undefined
  data: T | undefined
  dispatch: (request?: any) => void
}

export function useApiClient<T>(method: Method, uri: string, successHandler?: (data: T) => void): ApiClient<T> {
  const [isBusy, setBusy] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(undefined as string | undefined);
  const [data, setData] = React.useState(undefined as T | undefined);

  React.useEffect(() => {
    console.log(`hi - ${uri}`)
  }, [uri]);

  const dispatch = React.useCallback((requestBody?: any) => {
    setBusy(true);
    setErrorMessage(undefined);

    let promise: Promise<AxiosResponse<any, any>>;
    if (method === 'post') {
      promise = axios.post(uri, requestBody, defaultAxiosConfig);
    } else if (method === 'delete') {
      promise = axios.delete(uri, defaultAxiosConfig);
    } else {
      promise = axios.get(uri, defaultAxiosConfig);
    }

    promise.then((response: AxiosResponse<any, any>) => {
      setBusy(false);
      if (response.data) {
        const data = response.data as T
        setData(data);
        if (successHandler) successHandler(data);
      }
    }).catch((error: any) => {
      setBusy(false);
      setErrorMessage(JSON.stringify(error));
    })
  }, [method, uri, successHandler]);

  return { isBusy, errorMessage, data, dispatch };
}