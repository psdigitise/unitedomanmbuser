import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { Provider } from 'react-redux';
// import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'; // Assuming your store setup is in this path
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
