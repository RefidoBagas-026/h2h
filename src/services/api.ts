type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const createApi = (baseURL: string) => {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  async function request<T>(
    endpoint: string,
    method: HttpMethod,
    data?: unknown,
    responseType: XMLHttpRequestResponseType = "json"
  ): Promise<T> {
    const token = getToken();

    const response = await fetch(baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        "x-timezone-offset": `7`
      },
      body: data ? JSON.stringify(data) : undefined
    });
    if (!response.ok) {
      let errorMessage = `API Error ${response.status}: ${response.statusText}`;

      try {
        const errorBody = await response.json();

        // kalau format error berupa object
        if (errorBody.message) {
          errorMessage = Array.isArray(errorBody.message)
            ? errorBody.message.join(", ")
            : errorBody.message;
        }
      } catch (e) {
        // kalau response bukan JSON (misal HTML)
        console.error("Failed to parse error response", e);
      }

      throw new Error(errorMessage);
    }
    
    if (responseType === "blob") {
      return response.blob() as Promise<T>;
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(endpoint: string) =>
      request<T>(endpoint, "GET"),

    post: <T>(endpoint: string, data?: unknown) =>
      request<T>(endpoint, "POST", data),

    put: <T>(endpoint: string, data?: unknown) =>
      request<T>(endpoint, "PUT", data),

    delete: <T>(endpoint: string) =>
      request<T>(endpoint, "DELETE"),

    getEXCEL: <T>(endpoint: string) =>
      request<T>(endpoint, "GET", undefined, "blob"),
  };
};
