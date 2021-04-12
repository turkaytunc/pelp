import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from 'src/App';

test('renders learn react link', () => {
  const history = createBrowserHistory();
  history.push('/pelp/');
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/Rate Restaurant/i);
  expect(linkElement).toBeInTheDocument();
});
