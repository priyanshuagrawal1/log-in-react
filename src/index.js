import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-opql3u3837hgjgq4.us.auth0.com"
        clientId='MyzhWpTSWyOZk3h96DNMkrMyiwBVUvvE'
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

