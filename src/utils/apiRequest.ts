export interface ApiRequestOptions {
  headers?: HeadersInit;
  body?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export const apiRequest = async <T>(
  route: string,
  options: ApiRequestOptions = {}
) => {
  const fetchOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  fetchOptions.method = options.method || 'GET';
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }
  let isErrorHandled = false;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${route}`,
      fetchOptions
    );
    if (response.ok) {
      return (await response.json()) as T;
    } else {
      isErrorHandled = true;
      return handleError(response);
    }
  } catch (error) {
    if (isErrorHandled) throw error;

    return handleError(error);
  }
};

export class ApiError extends Error {
  code: number;
  isNetworkError: boolean;

  constructor(code: number, message: string, isNetworkError: boolean) {
    super(message);
    this.code = code;
    this.isNetworkError = isNetworkError;
  }
}

function handleError(error: Response | any): never {
  const code = error.status || 0;
  const message = error.statusText || error.message;
  const isNetworkError = !(error instanceof Response);
  throw new ApiError(code, message, isNetworkError);
}
