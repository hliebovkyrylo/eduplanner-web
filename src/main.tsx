import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from "./redux/store.ts";

import './index.scss'

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain={import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: import.meta.env.VITE_REACT_APP_AUTH0_REDIRECT_URI
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </>
)
