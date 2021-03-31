import { Link } from 'react-router-dom';
import { Login } from 'src/components';
import './login-screen.scss';

const LoginScreen = (): React.ReactElement => {
  return (
    <div className="login-screen">
      Login Screen
      <Login />
      <div className="register-link-container">
        <span>No account?</span>
        <Link to="/auth/register">Create one</Link>
      </div>
    </div>
  );
};

export default LoginScreen;
