import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { StoreProvider } from './context/Store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
