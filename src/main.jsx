
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";


// createRoot(document.getElementById("root")).render(
//     <App />
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { router } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#f56400',
              secondary: '#fff',
            },
          },
        }}
      />
    </Provider>
);