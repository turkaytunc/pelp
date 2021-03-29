import { API_URL } from 'src/constants';

const registerUser = (name: string, email: string, password: string): Promise<Response> =>
  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ name, email, password }),
  });
export default registerUser;
