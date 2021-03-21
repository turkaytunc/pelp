import { API_URL } from 'src/constants';

export const updateRestaurantById = (id: string, name: string, location: string, price: number): Promise<Response> =>
  window.fetch(`${API_URL}/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ name, location, price_range: price }),
  });
