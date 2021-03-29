import { API_URL } from 'src/constants';

const validateUser = (): Promise<Response> => {
  const token = window.localStorage.getItem('token');

  return fetch(`${API_URL}/dashboard`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });
};
export default validateUser;
