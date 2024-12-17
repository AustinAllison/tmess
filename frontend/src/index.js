// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';
import store from './redux/store';
import './index.css';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(''); // Replace with your actual Stripe publishable key

// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
