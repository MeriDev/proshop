import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import '../bootstrap.min.css';
import './index.css';
import App from './App.tsx';
import store from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          clientId: 'placeholder',
          currency: 'USD',
        }}
        deferLoading={true}
      >
        <Router>
          <App />
        </Router>
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
