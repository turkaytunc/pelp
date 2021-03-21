import { API_URL } from 'src/constants';

export const deleteRestaurantById = (id: number): Promise<Response> =>
  fetch(`${API_URL}/restaurants/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
  });
