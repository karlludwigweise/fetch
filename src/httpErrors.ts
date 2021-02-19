import { HttpBody, HttpResponse } from "./types";

export const normalizeResponse = async (response: Response): Promise<HttpResponse> => {
  // Process body
  let body: HttpBody = undefined;
  try {
    body = await response.json();
  } catch {}

  if (response.ok) {
    return {
      ok: response.ok,
      body: { ...body },
    };
  } else {
    return {
      ok: response.ok,
      error: {
        status: response.status,
        statusText: response.statusText,
        type: body?.error,
        description: body?.description || body?.reason,
      },
    };
  }
};

export const catchResponse = async (response: Response): Promise<HttpResponse> => {
  return {
    ok: false,
    error: {
      status: response.status || 499,
      statusText: response.statusText || "Fetch Error",
      type: "FETCH_PROMISE_REJECTED",
      description: "Fetch Promise was rejected.",
    },
  };
};
