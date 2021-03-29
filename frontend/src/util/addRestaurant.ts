import { API_URL } from 'src/constants';

const addRestaurant = (name: string, location: string, priceRange: number): Promise<Response> => {
  const token = window.localStorage.getItem('token');

  return fetch(`${API_URL}/restaurants`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, location, price_range: priceRange }),
  });
};
export default addRestaurant;
