import * as ReactDOM from 'react-dom/client';
import './static/index.scss';
import App from './app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const clientID = '885686924584-hqrj0d5o4gupbma06i33o0d34671f49a.apps.googleusercontent.com';
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
