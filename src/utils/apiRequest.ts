interface Options {
  headers?: HeadersInit;
  body?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export async function apiRequest(route: string, options: Options = {}) {
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
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${route}`,
      fetchOptions
    );
    if (response.ok) {
      return { data: await response.json() };
    } else {
      return { error: handleError(response) };
    }
  } catch (error) {
    return { error: handleError(error) };
  }
}

function handleError(error: Response | any) {
  return {
    code: error.status || 0,
    message: error.statusText || error.message,
    isNetworkError: !(error instanceof Response),
  };
}
