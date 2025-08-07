import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);
