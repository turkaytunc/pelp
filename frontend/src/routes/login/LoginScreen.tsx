import { Link } from 'react-router-dom';
import { Login } from 'src/components';
import './login-screen.scss';

const LoginScreen = (): React.ReactElement => {
  return (
    <div className="login-screen">
      Login Screen
      <Login />
      <Link to="/auth/register">Register</Link>
    </div>
  );
};

export default LoginScreen;
