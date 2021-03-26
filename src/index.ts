import { DEFAULT_STORAGE_NAMES } from "@klw/localstorage";
import storage from "@klw/localstorage";
import { normalizeResponse, catchResponse } from "./httpErrors";
import { UrlParams } from "./types";

export function getHeaders() {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${storage.get(DEFAULT_STORAGE_NAMES.TOKEN)}`,
  };
  return {
    ...defaultHeaders,
  };
}

export const setParams = (route: string, params: UrlParams) => {
  const list: string[] = [];
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      list.push(`${key}=${params[key]}`);
    }
  });
  if (list.length > 0) {
    return `${route}?${list.join("")}`;
  }
  return route;
};

export function get(path: string, init: RequestInit = {}) {
  const options = {
    headers: getHeaders(),
    ...init,
    method: "GET",
  };
  return fetch(path, options).then(normalizeResponse).catch(catchResponse);
}

export function post(path: string, body: any = {}, init: RequestInit = {}) {
  const options = {
    headers: getHeaders(),
    ...init,
    method: "POST",
    body: JSON.stringify(body),
  };

  return fetch(path, options).then(normalizeResponse).catch(catchResponse);
}

export function put(path: string, body: any = {}, init: RequestInit = {}) {
  const options = {
    headers: getHeaders(),
    ...init,
    method: "PUT",
    body: JSON.stringify(body),
  };

  return fetch(path, options).then(normalizeResponse).catch(catchResponse);
}

export function del(path: string, init: RequestInit = {}) {
  const options = {
    headers: getHeaders(),
    ...init,
    method: "DELETE",
  };

  return fetch(path, options).then(normalizeResponse).catch(catchResponse);
}
