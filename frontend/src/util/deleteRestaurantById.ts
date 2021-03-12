export const deleteRestaurantById = <T>(
  url = 'http://localhost:5000/api/v1/restaurants',
  fetch: (url: RequestInfo, options?: RequestInit) => Promise<T>,
  id: number
): Promise<T> =>
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
  });
