import { Link } from 'react-router-dom';
import { Login } from 'src/components';
import './signin-screen.scss';

const SigninScreen = (): React.ReactElement => {
  return (
    <div className="signin-screen">
      <Login />
      <div className="signup-link-container">
        <span>No account?</span>
        <Link to="/auth/signup">Create one</Link>
      </div>
    </div>
  );
};

export default SigninScreen;
