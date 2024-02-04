import axios, { AxiosRequestConfig } from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

function getDefaultAxiosConfig(): AxiosRequestConfig {
  return {
    baseURL: serverUrl
  };
}

export async function Post(url: string, body: any = undefined) {
  return axios.post(url, body, getDefaultAxiosConfig());
}

export async function Get(url: string) {
  return axios.get(url, getDefaultAxiosConfig());
}

export async function Delete(url: string) {
  return axios.delete(url, getDefaultAxiosConfig());
}