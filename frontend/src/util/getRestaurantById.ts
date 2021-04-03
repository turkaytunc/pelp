import { API_URL } from 'src/constants';

const getRestaurantById = (id: string): Promise<Response> => fetch(`${API_URL}/restaurants/${id}`);

export default getRestaurantById;
