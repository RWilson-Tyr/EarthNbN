import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import * as sessionActions from './store/session'; // <-- ADD THIS LINE
import { restoreCSRF, csrfFetch } from './store/csrf';
import App from './App';
import './index.css';
import configureStore from './store';
import { Modal, ModalProvider } from './context/Modal';


const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF()

  window.csrfFetch = csrfFetch
  window.store = store
  window.sessionActions = sessionActions
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
)
