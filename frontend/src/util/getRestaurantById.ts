import { API_URL } from 'src/constants';

export const getRestaurantById = (id: string): Promise<Response> => fetch(`${API_URL}/restaurants/${id}`);
