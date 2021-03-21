import { API_URL } from 'src/constants/index';

export const getReviewsByRestaurantId = async (id: number): Promise<Response> =>
  window.fetch(`${API_URL}/reviews/${id}`);
