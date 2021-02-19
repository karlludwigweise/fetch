export interface HttpError {
  status: number;
  statusText: string;
  type?: string;
  description?: string;
}

export interface HttpResponse {
  ok: boolean;
  body?: HttpBody;
  error?: HttpError;
}

export type HttpBody = { [key: string]: any } | undefined;

export interface ResponseError {
  ok: boolean;
  type: string;
  description?: string;
}
