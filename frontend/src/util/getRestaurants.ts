import { API_URL } from 'src/constants';

const getRestaurants = (): Promise<Response> => fetch(`${API_URL}/restaurants`);

export default getRestaurants;
