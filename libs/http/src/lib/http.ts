interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;
export type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export const http = async <T>(
  request: RequestInfo
): Promise<HttpResponse<T>> => {
  const response: HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (error) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
  return response;
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: HTTP_METHOD.GET }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: HTTP_METHOD.GET, body: JSON.stringify(body) }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const put = async <T>(
  path: string,
  body: any,
  args: RequestInit = { method: HTTP_METHOD.PUT, body: JSON.stringify(body) }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const erase = async <T>(
  path: string,
  args: RequestInit = { method: HTTP_METHOD.DELETE }
): Promise<HttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};
