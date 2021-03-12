const addRestaurant = <T>(
  name: string,
  location: string,
  priceRange: number,
  fetch: (url: RequestInfo, options?: RequestInit) => Promise<T>,
  url = 'http://localhost:5000/api/v1/restaurants'
): Promise<T> =>
  fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ name, location, price_range: priceRange }),
  });
export default addRestaurant;
