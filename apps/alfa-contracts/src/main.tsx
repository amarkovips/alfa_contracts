import * as ReactDOM from 'react-dom/client';
import './static/index.scss';
import App from './app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const clientID = '130530496114-g11tao52s44okmbqe1krt1t0eirptm27.apps.googleusercontent.com';
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
