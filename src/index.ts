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
    return `${route}?${list.join("&")}`;
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

export function postFile(
  url: string,
  file: any,
  options?: {
    onProgress?: (p: number) => void;
  },
): Promise<{ ok: boolean; error?: ProgressEvent<EventTarget> }> {
  const onModifyProgress = function (this: XMLHttpRequest, event: ProgressEvent<EventTarget>) {
    if (event.type === "progress" && options?.onProgress) {
      options.onProgress((event.loaded * 100) / event.total);
    }
  };

  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, url);

    // Add error resolver
    xhr.onerror = function (this: XMLHttpRequest, error: ProgressEvent<EventTarget>) {
      resolve({ ok: false, error });
    };

    // Add success resolver
    xhr.onload = () => {
      resolve({ ok: true });
    };

    // Add onProgress callback
    if (xhr.upload && options?.onProgress) xhr.upload.onprogress = onModifyProgress;

    xhr.send(formData);
  });
}
