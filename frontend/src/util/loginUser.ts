import { API_URL } from 'src/constants';

const loginUser = (email: string, password: string): Promise<Response> => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ email, password }),
  });
};
export default loginUser;
