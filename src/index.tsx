import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import NotFound from './pages/NotFound';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/item/:id',
        element: <ItemDetail />,
      },
    ],
  },
]);

const root = document.getElementById('root');
if (!root) throw new Error('Root element is not found.');

createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
