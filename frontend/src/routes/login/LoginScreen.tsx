import { Login } from 'src/components';
import './login-screen.scss';

const LoginScreen = (): React.ReactElement => {
  return (
    <div className="login-screen">
      Login Screen
      <Login />
    </div>
  );
};

export default LoginScreen;
