import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AxiosClient } from './api/apiHandler.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={AxiosClient}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
