import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import AccountSettings from './pages/AccountSettings';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import MyAccount from './pages/MyAccount';
import MyOrders from './pages/MyOrders';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import SavedItems from './pages/SavedItems';
import SignIn from './pages/SignIn';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/item/:id',
        element: <ItemDetail />,
      },
      {
        path: '/products/:category',
        element: <Products />,
      },
      {
        path: '/my-account',
        element: <MyAccount />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
      {
        path: '/account-settings',
        element: <AccountSettings />,
      },
      {
        path: '/saved-items',
        element: <SavedItems />,
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
