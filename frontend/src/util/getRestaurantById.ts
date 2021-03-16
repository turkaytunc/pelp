export const getRestaurantById = <T>(
  url: string,
  fetch: (url: RequestInfo, options?: RequestInit) => Promise<T>,
  id: string
): Promise<T> => fetch(`${url}/${id}`);
