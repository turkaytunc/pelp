import { API_URL } from 'src/constants';

export const addRestaurantReview = (id: string, name: string, rating: string, comment: string): Promise<Response> =>
  fetch(`${API_URL}/reviews/${id}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ name, rating, comment }),
  });
